import express from "express";
import nanny from "../models/nanny.js";
import parent from "../models/parent.js";
const router = express.Router();

//Parent settings

router.patch("/profile/parent/:id", (req, res) => {
  parent.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, data) =>
    err
      ? res.status(400).send("failed to Update settings")
      : res.status(200).send(data)
  );
});

//Nanny Settings

router.patch("/profile/nanny/:id", (req, res) => {
  nanny.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, data) =>
    err
      ? res.status(400).send("failed to Update settings")
      : res.status(200).send(data)
  );
});

router.patch("/profile/nanny/status/:id", (req, res) => {
  nanny.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, data) =>
    err
      ? res.status(400).send("failed to Update status")
      : res.status(200).send(data)
  );
});
export default router;
