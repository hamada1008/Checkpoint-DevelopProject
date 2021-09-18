import express from "express";
import order from "../models/order.js";
import parent from "../models/parent.js";
import nanny from "../models/nanny.js";
const router = express.Router();

router.post("/order/create", (req, res) => {
  order.create({ ...req.body }, (err, data) => {
    err
      ? res.status(400).send(err.message)
      : res.status(200).send("order Created");
  });
});

// router.post("/order/fetch", (req, res) => {
//   if (req.body.type === "parent") {
//     var nannyData;
//     nanny.findById(req.body.targetId, { fullName: 1, city: 1 }, (err, data) => {
//       if (err) {
//         res.send("error finding nanny");
//       } else {
//         nannyData = data;
//       }
//     });
//     order.find({ parent_id: req.body.id }, (err, data) => {
//       err
//         ? res.status(404).send(err)
//         : res.status(200).send({ ...data, nannyData });
//     });
//   } else {
//     var parentData;
//     parent.findById(
//       req.body.targetId,
//       { fullName: 1, city: 1 },
//       (err, data) => {
//         if (err) {
//           res.send("error finding parent");
//         } else {
//           parentData = data;
//         }
//       }
//     );
//     order.find({ nanny_id: req.body.id }, (err, data) => {
//       err
//         ? res.status(404).send(err)
//         : res.status(200).send({ ...data, parentData });
//     });
//   }
// });

const findInPost = (type, el) => {
  type.findById(el.nanny_id, { fullName: 1, city: 1 }, (err, docs) => {
    if (err) {
      res.send("error finding nanny");
    } else {
      return docs;
    }
  });
};
// router.post("/order/fetch", (req, res) => {
//   if (req.body.type === "parent") {
//     var allData = [];

//     order.find({ parent_id: req.body.id }, (err, data) => {
//       if (err) {
//         res.status(404).send(err);
//       } else {
//         console.log(data);
//         allData = data.map((el, index) => {
//           // const foundData = findInPost(nanny, el);
//           // console.log(foundData);
//           nanny
//             .findById(el.nanny_id, { fullName: 1, city: 1 })
//             .then((data) => {
//               var nannyData = data;
//               console.log(nannyData);
//             })

//             .catch((err) => console.log(err));
//         });
//         console.log(nannyData);
//         // const nannyFullName = nannyData.fullName;
//         // const nannyCity = nannyData.city;
//         // // el["nannyFullName"] = nannyFullName;
//         // data[index].nannyCity = nannyCity;

//         console.log(allData);
//         res.status(200).send(allData);
//       }
//     });
//   }
// });

// } else {
//   var parentData;
//   parent.findById(
//     req.body.targetId,
//     { fullName: 1, city: 1 },
//     (err, data) => {
//       if (err) {
//         res.send("error finding parent");
//       } else {
//         parentData = data;
//       }
//     }
//   );
//   order.find({ nanny_id: req.body.id }, (err, data) => {
//     err
//       ? res.status(404).send(err)
//       : res.status(200).send({ ...data, parentData });
//   });

router.post("/order/delete", (req, res) => {
  order.findByIdAndDelete({ _id: req.body._id }, (err, data) => {
    err ? res.status(404).send(err) : res.status(200).send("order deleted");
  });
});

export default router;
