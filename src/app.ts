import express = require("express");
import { Request, Response, NextFunction } from "express";
import cors = require("cors");
import passport = require("passport");
import morgan = require("morgan");
import helmet = require("helmet");
import dotenv = require("dotenv");
//import xss from "xss";
import ratelimit = require("express-rate-limit");
import mongoose = require("mongoose");
import { globalErrorController } from "./controllers/globalError";
import { AppError } from "./utils/AppError";

dotenv.config();
const app = express();
const limit = ratelimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: "Too Many request, you are blocked for 1 hour",
});

app.use(express.urlencoded({ extended: false, limit: "10mb" }));
app.use(express.json({ limit: "10mb" }));
app.use(express.json());
app.use("*", limit);

app.use(helmet());
//app.use(xss());

app.use(cors());
app.use(passport.initialize());
app.use(morgan(process.env.LOGGER));
app.use(globalErrorController);

//Routes
import userRouter from './routes/user'
app.use(userRouter)
app.all("*", (_req: Request, _res: Response, next: NextFunction) => {
  return next(new AppError("This route is not yet defined!", 404));
});

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database Connected");
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
  } catch (err) {
    console.log("Error", err);
    process.exit(1);
  }
})();

["unhandledRejection", "uncaughtException"].forEach((processEvent) => {
  process.on(processEvent, (error) => {
    console.log(error);
    process.exit(1);
  });
});

module.exports = app;
