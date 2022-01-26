import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: {
    required: true,
    type: String,
  },

  password: {
    required: true,
    type: String,
  },
});

export const user = mongoose.model("User", userSchema);
