import mongoose from 'mongoose'

const deviceDataSchema = new mongoose.Schema({
    thingsboard_JWT: String,
    email: String,
    thingsboard_name: String,
    name: String,
    enityID: String,
    accessToken: String,
    status: Boolean,
    isAirConditioner: Boolean,
});

export const DeviceModel = mongoose.model('device', deviceDataSchema);