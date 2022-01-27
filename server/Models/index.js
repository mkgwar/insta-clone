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
