import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import * as controller from "./controllers/index.js";
import userRoutes from "./Routes/user.js";

const app = express();
app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

const DB_URL =
  process.env.DB_URL ||
  "mongodb+srv://admin:admin2106@cluster0.aosd2.mongodb.net/instaDB?retryWrites=true&w=majority";

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
