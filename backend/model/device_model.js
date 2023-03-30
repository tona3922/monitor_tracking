import mongoose from 'mongoose'

const deviceDataSchema = new mongoose.Schema({
    thingsboard_JWT: String,
    name: String,
    enityID: String,
    status: Boolean,
});

export const DeviceModel = mongoose.model('device', deviceDataSchema);