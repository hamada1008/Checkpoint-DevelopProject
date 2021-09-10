import Express from "express";
import mongoose from "mongoose";
import cors from "cors";
// import nanny from "./models/nanny.js";
// import parent from "./models/parent.js";
import {} from "dotenv/config";
import authRouter from "./router/authRouter.js";
import settingRouter from "./router/settingRouter.js";
import searchRouter from "./router/searchRouter.js";

const app = Express();
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use("/api", authRouter);
app.use("/api", settingRouter);
app.use("/api", searchRouter);
const port = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => app.listen(port, () => console.log("server is running")))
  .catch((err) => console.log(err));
