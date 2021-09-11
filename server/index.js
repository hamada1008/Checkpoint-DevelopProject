import Express from "express";
import mongoose from "mongoose";
import cors from "cors";
import googleUser from "./models/googleUser.js";
import { } from "dotenv/config";
import authRouter from "./router/authRouter.js";
import settingRouter from "./router/settingRouter.js";
import searchRouter from "./router/searchRouter.js";
import orderRouter from "./router/orderRouter.js";
import session from "express-session";
import passport from "passport";
import localStrategy from "passport-local";
import passportLocalMongoose from "passport-local-mongoose";
import nanny from "./models/nanny.js";
import parent from "./models/parent.js";
import gStrategy from "passport-google-oauth20";
const GoogleStrategy = gStrategy.Strategy;
const strategy = localStrategy.Strategy;
import findOrCreate from "mongoose-findorcreate";

const app = Express();
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(
  session({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized: false,
  })
);

const port = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => app.listen(port, () => console.log("server is running")))
  .catch((err) => console.log(err));

app.use(cors());
passport.use(nanny.createStrategy());
passport.use(parent.createStrategy());
passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:5000/api/auth/google/mybestnanny",
    },
    function (accessToken, refreshToken, profile, cb) {
      googleUser.findOrCreate({ googleId: profile.id }, function (err, user) {
        return cb(err, user);
      });
    }
  )
);
app.use(cors())

app.use("/api", authRouter);
app.use("/api", settingRouter);
app.use("/api", searchRouter);
app.use("/api", orderRouter);
