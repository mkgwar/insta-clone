import express from "express";
import jwt from "jsonwebtoken";
import * as model from "../Models/index.js";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },

  filename: function (req, file, cb) {
    cb(null, new Date().getSeconds().toString() + file.originalname);
  },
});

const profilepic = multer({ storage: storage });

const authenticateUser = (req, res, next) => {
  const token = req.headers["authorization"];
  if (token != "NO_TOKEN_FOUND") {
    const result = jwt.verify(token, "topsecretcode");
    req.authUsername = result.username;
  } else {
    req.authUsername = "";
  }
  next();
};

router.get("/:username", authenticateUser, async (req, res) => {
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

router.post(
  "/:username/profilepic",
  profilepic.single("profilepic"),
  async (req, res) => {
    const { username } = req.params;

    if (req.file) {
      const path = `http://localhost:5000/${req.file.path}`;
      await model.user.updateOne({ username }, { profilePic: path });
      res.json({
        status: "OK",
        message: "pic uploaded successfully",
        profilePic: path,
      });
    } else {
      res.json({
        status: "Error",
        message: "pic upload failed",
      });
    }
  }
);

router.post("/:username/updatedesc", async (req, res) => {
  const { username } = req.params;
  console.log(req.body);
  const { updatedDesc } = req.body;

  await model.user.updateOne({ username }, { desc: updatedDesc });

  res.json({ status: "OK", message: "Description updated successfully." });
});

export default router;
