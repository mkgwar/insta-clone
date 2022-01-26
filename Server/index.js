import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import * as controller from "./controllers/index.js";

const app = express();
app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

const DB_URL =
  "mongodb+srv://admin:admin2106@cluster0.aosd2.mongodb.net/instaDB?retryWrites=true&w=majority";

const PORT = 5000;

mongoose
  .connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`server running at port ${PORT}`))
  )
  .catch((error) => console.log(error.message));

app.post("/signup", controller.signupMiddleware, controller.signup);
