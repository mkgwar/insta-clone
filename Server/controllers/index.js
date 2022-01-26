import * as model from "../Models/index.js";

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
    await newUser.save();
    res.json({ status: "OK", message: "Username registered successfully." });
  } catch (error) {
    res.json({ status: "Error", messsage: error.message });
  }
};
