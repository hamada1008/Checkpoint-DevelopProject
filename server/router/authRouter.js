import express from "express";
import nanny from "../models/nanny.js";
import parent from "../models/parent.js";
import passport from "passport";
import localStrategy from "passport-local";
import passportLocalMongoose from "passport-local-mongoose";
import jwt from "jsonwebtoken";
import {} from "dotenv/config";
const router = express.Router();

//register

router.post("/auth/register", (req, res) => {
  const type = req.body.type === "parent" ? parent : nanny;
  const globalType = req.body.type;
  type.register(
    new type({
      username: req.body.username,
      email: req.body.email,
      fullName: req.body.fullName,
    }),
    req.body.password,
    (err) => {
      if (err) {
        console.log(err.message);
        res.send("There was an error");
      } else {
        passport.authenticate("local")(req, res, () => {
          type.findOne(
            { username: req.body.username, fullName: req.body.fullName },
            { password: 0 },
            (err, foundItem) => {
              const userDataWithType = {
                _id: foundItem._id,
                email: foundItem.email,
                username: foundItem.username,
                type: globalType,
              };
              const token = jwt.sign(
                userDataWithType,
                process.env.ENCRYPTION_KEY
              );
              res.send(token);
            }
          );
        });
      }
    }
  );
});

//login

router.post("/auth/login", (req, res) => {
  const globalType = req.body.type;
  const type = req.body.type === "parent" ? parent : nanny;
  req.login(
    new type({ email: req.body.email, password: req.body.password }),
    function (err) {
      if (err) {
        res.status(404).send(err.message);
      } else {
        passport.authenticate("local")(req, res, () => {
          const userData = req.session.passport.user;
          const userDataWithType = {
            _id: userData._id,
            email: userData.email,
            username: userData.username,
            type: globalType,
          };
          userData.type = globalType;
          const token = jwt.sign(userDataWithType, process.env.ENCRYPTION_KEY);
          res.send(token);
        });
      }
    }
  );
});

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

router.get(
  "/auth/google/mybestnanny",
  passport.authenticate("google", { failureRedirect: "/api/auth/login" }),
  function (req, res) {
    res.send("authentitaced with google");
  }
);

router.get("/auth/logout", function (req, res) {
  req.logout();
  res.send("logged out");
});
export default router;
