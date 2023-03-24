import mongoose from 'mongoose'

const sensorDataSchema = new mongoose.Schema({
    data: String,
    lastTime: Date,
});

export const SensorModel = mongoose.model('sensor', sensorDataSchema);