import express from "express";
import jwt from "jsonwebtoken";
import * as model from "../Models/index.js";
import multer from "multer";

const router = express.Router();

const SECRET = process.env.SECRET || process.env.LOCAL_SECRET;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },

  filename: function (req, file, cb) {
    cb(null, new Date().getSeconds().toString() + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/getusers", async (req, res) => {
  const users = await model.user.find();
  res.json(users);
});

const authenticateUser = (req, res, next) => {
  const token = req.headers["authorization"];
  if (token != "NO_TOKEN_FOUND") {
    const result = jwt.verify(token, SECRET);
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
  upload.single("profilepic"),
  async (req, res) => {
    const { username } = req.params;
    if (req.file) {
      const path = `https://insta-clone-mkgwar.herokuapp.com/${req.file.path}`;
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
  const { updatedDesc } = req.body;

  await model.user.updateOne({ username }, { desc: updatedDesc });

  res.json({ status: "OK", message: "Description updated successfully." });
});

router.post(
  "/:username/upload",
  upload.single("picupload"),
  async (req, res) => {
    const { username } = req.params;
    const { desc } = req.body;

    if (req.file) {
      const path = `https://insta-clone-mkgwar.herokuapp.com/${req.file.path}`;
      const data = { username: username, image: path, desc: desc };

      const newUpload = await new model.upload(data);
      const newSave = await newUpload.save();

      res.json({
        status: "OK",
        message: "pic uploaded successfully",
        ...newSave,
      });
    } else {
      res.json({
        status: "Error",
        message: "pic upload failed",
      });
    }
  }
);

router.get("/:username/getupload", async (req, res) => {
  const { username } = req.params;

  const data = await model.upload.find({ username });
  res.json(data);
});

export default router;
