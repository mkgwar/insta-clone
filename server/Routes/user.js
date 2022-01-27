import express from "express";

const router = express.Router();

const authenticateUser = (req, res, next) => {
  const auth = req.headers["authorization"];
  console.log("here");
  next();
};

router.use(authenticateUser);

router.get("/:username", (req, res) => {
  res.send("yo");
});

export default router;
