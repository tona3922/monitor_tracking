import SensorController from "../controller/sensorController.js"
import express from "express"

var sensorRouter = express.Router()

sensorRouter
    .route('/').get(SensorController.tf)

export default sensorRouter