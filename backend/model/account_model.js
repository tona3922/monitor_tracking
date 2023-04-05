import mongoose from "mongoose";

const accountDataSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
  gender: String,
  username: String,
  phone: String,
});

export const AccountModel = mongoose.model("account", accountDataSchema);
