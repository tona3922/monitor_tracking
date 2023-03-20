import mongoose from 'mongoose'

const accountDataSchema = new mongoose.Schema({
    email: String,
    password: Date,
    thingsboard_JWT: String
});

export const AccountModel = mongoose.model('account', accountDataSchema);