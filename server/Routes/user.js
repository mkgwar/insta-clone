import express from "express";
import jwt from "jsonwebtoken";
import * as model from "../Models/index.js";

const router = express.Router();

const authenticateUser = (req, res, next) => {
  const token = req.headers["authorization"];
  if (token != "") {
    const result = jwt.verify(token, "topsecretcode");
    req.authUsername = result.username;
  } else {
    req.authUsername = "";
  }
  next();
};

router.use(authenticateUser);

router.get("/:username", async (req, res) => {
  const { username } = req.params;
  if (username === req.authUsername) req.isEditable = true;
  else req.isEditable = false;

  const data = await model.user.findOne({ username });

  if (data === null) res.json({ status: "Error", message: "User not found" });
  else {
    res.json({
      ...data,
      isEditable: req.isEditable,
      status: "OK",
      message: "User found",
    });
  }
});

export default router;
