import mongoose from "mongoose";

const accountDataSchema = new mongoose.Schema({
  email: String,
  password: String,
  thingsboard_JWT: String,
});

export const AccountModel = mongoose.model("account", accountDataSchema);
