import express from "express";
import nanny from "../models/nanny.js";
import parent from "../models/parent.js";
const router = express.Router();

//register

router.post("/auth/register", (req, res) => {
  const { email, password, username } = req.body;

  req.body.type === "parent"
    ? parent.create({ username, password, email }, (err, data) =>
        err
          ? res.status(400).send("failed to register to parents")
          : res.status(200).send(data)
      )
    : nanny.create({ username, password, email }, (err, data) =>
        err
          ? res.status(400).send("failed to register to nannies")
          : res.status(200).send(data)
      );
});

//login

router.post("/auth/login", (req, res) => {
  const { email, password } = req.body;

  if (req.body.type === "parent") {
    parent.findOne({ email }, (err, fetchedData) => {
      if (fetchedData) {
        if (fetchedData.password === password) {
          res.status(200).send("logged as parent");
        } else {
          res.status(400).send("verify your password as parent");
        }
      } else {
        res.status(400).send("invalid email");
      }
    });
  } else {
    nanny.findOne({ email }, (err, fetchedData) => {
      if (fetchedData) {
        if (fetchedData.password === password) {
          res.status(200).send(data);
        } else {
          res.status(400).send("verify your password as nanny");
        }
      } else {
        res.status(400).send("verify your email as nanny");
      }
    });
  }
});

export default router;
