import express from "express";
import nanny from "../models/nanny.js";
import order from "../models/order.js";
const router = express.Router();

router.post("/order/:id", (req, res) => {
  const parent_id = req.params.id;
  const nannyUsername = req.body.username;
  let nanny_id;
  nanny.findOne({ username: nannyUsername }, (err, foundNanny) => {
    if (err) {
      console.log(err);
    } else {
      if (foundNanny) {
        console.log(foundNanny.id);
        nanny_id = foundNanny.id;
      } else {
        console.log("foundNany error");
      }
    }
    order.create({ ...req.body, nanny_id, parent_id }, (err, data) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).send(data);
      }
    });
  });
});

export default router;
