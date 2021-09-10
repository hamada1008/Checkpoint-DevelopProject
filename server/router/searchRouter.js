import express from "express";
import nanny from "../models/nanny.js";
import parent from "../models/parent.js";
const router = express.Router();

//auto complete the search frields based on parent preferences

router.get("/search_fields/:id", (req, res) => {
  parent.findById(req.params.id, (err, data) =>
    err
      ? res.status(400).send("failed to Update settings")
      : res.status(200).send(data.defaultSearchSettings)
  );
});

//Searching nannies
router.post("/search", (req, res) => {
  const { region, city, rating, pricing, age } = req.body;

  nanny.find(
    {
      $and: [
        { $and: [{ region: region }, { $ne: null || undefined }] },
        city ? { city: city } : {},
        { rating: { $gte: rating } },
        pricing[0] === 0 && pricing[1] === 0
          ? {}
          : pricing[1] === 0
          ? { pricing: { $gte: pricing[0] } }
          : {
              $and: [
                { pricing: { $gte: pricing[0] } },
                { pricing: { $lte: pricing[1] } },
              ],
            },
        age === 0 ? {} : { age: { $gte: age } },
        { availability: true },
      ],
    },
    (err, data) =>
      err ? res.status(400).send(err.message) : res.status(200).send(data)
  );
});

export default router;
