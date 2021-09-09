import Express from "express";
import mongoose from "mongoose";
import cors from "cors";
import nanny from "./models/nanny.js";
import {} from "dotenv/config";
import authRouter from "./router/authRouter.js";

const app = Express();
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use("/api", authRouter);
const port = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => app.listen(port, () => console.log("server is running")))
  .catch((err) => console.log(err));
