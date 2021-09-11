import express from "express";
import nanny from "../models/nanny.js";
import parent from "../models/parent.js";
import passport from "passport";
import localStrategy from "passport-local";
import passportLocalMongoose from "passport-local-mongoose";
const router = express.Router();

//register

router.post("/auth/register", (req, res) => {
  const type = req.body.type === "parent" ? parent : nanny;
  type.register(
    new type({ username: req.body.username, email: req.body.email }),
    req.body.password,
    (err, user) => {
      if (err) {
        console.log(err);
        res.send("There was an error");
      } else {
        passport.authenticate("local")(req, res, () => {
          res.send(`authenticated as ${req.body.type}`);
        });
      }
    }
  );
});

//login

router.post("/auth/login", (req, res) => {
  console.log(req.body)
  const type = req.body.type === "parent" ? parent : nanny;
  req.login(
    new type({ username: req.body.username, password: req.body.password }),
    function (err) {
      if (err) {
        res.status(404).send(err.message);
      } else {
        passport.authenticate("local")(req, res, () => {
          res.send(`user ${req.body.username} authenticated`);
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
