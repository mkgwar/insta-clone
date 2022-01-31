import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import * as controller from "./controllers/index.js";
import userRoutes from "./Routes/user.js";
import env from "dotenv";

const app = express();
app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
env.config();

const DB_URL = process.env.DB_URL || process.env.LOCAL_DB_URL;

const PORT = process.env.PORT || 5000;

mongoose
  .connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`server running at port ${PORT}`))
  )
  .catch((error) => console.log(error.message));

app.post("/signup", controller.signupMiddleware, controller.signup);
app.post("/signin", controller.signin);

app.use("/user", userRoutes);
