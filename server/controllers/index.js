import * as model from "../Models/index.js";
import jwt from "jsonwebtoken";

export const signupMiddleware = async (req, res, next) => {
  const { username } = req.body;

  try {
    const result = await model.user.findOne({ username });

    if (result === null) next();
    else
      res.json({
        status: "Error",
        message: "Username already exists",
      });
  } catch (error) {
    res.json({ status: "Error", messsage: error.message });
  }
};

export const signup = async (req, res) => {
  try {
    const userData = req.body;
    const newUser = new model.user(userData);
    await newUser.saveData();
    res.json({ status: "OK", message: "Username registered successfully." });
  } catch (error) {
    res.json({ status: "Error", messsage: error.message });
  }
};

export const signin = async (req, res) => {
  const { username, password } = req.body;
  const foundUser = await model.user.findOne({ username });

  if (!foundUser) {
    res.json({ status: "Error", message: "Username does not exist." });
  } else {
    const result = await foundUser.validateUser(password);

    if (!result) {
      res.json({ status: "Error", message: "Username or password incorrect." });
    } else {
      const payload = { username: username };
      const token = jwt.sign(payload, "topsecretcode", {
        expiresIn: "30m",
      });
      res.json({
        status: "OK",
        message: "Login successful",
        token: token,
        username: username,
      });
    }
  }
};
