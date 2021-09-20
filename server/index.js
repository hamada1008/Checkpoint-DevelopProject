import Express from "express";
import mongoose from "mongoose";
import cors from "cors";
import googleUser from "./models/googleUser.js";
import { } from "dotenv/config";
import bcrypt from "bcrypt";
import authRouter from "./router/authRouter.js";
import settingRouter from "./router/settingRouter.js";
import searchRouter from "./router/searchRouter.js";
import orderRouter from "./router/orderRouter.js";
import session from "express-session";
import passport from "passport";
import Strategy from "passport-local";
import passportLocalMongoose from "passport-local-mongoose";
import nanny from "./models/nanny.js";
import parent from "./models/parent.js";
import gStrategy from "passport-google-oauth20";
const GoogleStrategy = gStrategy.Strategy;
const LocalStrategy = Strategy.Strategy;
import findOrCreate from "mongoose-findorcreate";
import order from "./models/order.js";
const app = Express();
app.use(Express.json({ extended: true, limit: "30mb" }));
app.use(Express.urlencoded({ extended: true, limit: "30mb" }));
app.use(passport.initialize());
app.use(passport.session());

app.use(
  session({
    secret: "Our little secret.",
    resave: true,
    saveUninitialized: false,
  })
);

const port = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => app.listen(port, () => console.log("server is running")))
  .catch((err) => console.log(err));

app.use(cors());
// passport.use((parent && nanny).createStrategy());
// passport.use(nanny.createStrategy());

passport.use("parentStrategy", new LocalStrategy(parent.authenticate()));
passport.use("nannyStrategy", new LocalStrategy(nanny.authenticate()));

// if (bcrypt.compare(password, user.password))
// passport.use(
//   new LocalStrategy(function (username, password, done) {
//     parent.findOne({ username: username }, function (err, user) {
//       if (err) {
//         return done(err);
//       }
//       if (!user) {
//         return done(null, false, { message: "Incorrect username." });
//       }
//       if (
//         bcrypt.compare(password, user.password, (err, result) =>
//           console.log(err, result)
//         )
//       ) {
//         return done(null, false, { message: "Incorrect password." });
//       }
//       return done(null, user);
//     });
//   })
// );

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

app.use(cors());

app.use("/api", authRouter);
app.use("/api", settingRouter);
app.use("/api", searchRouter);
app.use("/api", orderRouter);
