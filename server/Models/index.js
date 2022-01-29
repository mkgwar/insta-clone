import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema({
  username: {
    required: true,
    type: String,
  },

  password: {
    required: true,
    type: String,
  },

  desc: { type: String, default: "" },
  profilePic: { type: String, default: "" },
});

const uploadSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  desc: String,
});

userSchema.methods.saveData = async function () {
  this.password = await bcrypt.hash(this.password, 10);
  await this.save();
};

userSchema.methods.validateUser = async function (userPassword) {
  const result = await bcrypt.compare(userPassword, this.password);

  return result;
};

export const user = mongoose.model("users", userSchema);
export const upload = mongoose.model("uploads", uploadSchema);
