import DeviceController from "../controller/deviceController.js"
import express from "express"

var deviceRouter = express.Router()

deviceRouter.route('/add').post(DeviceController.adding)
deviceRouter.route('/airconditioners').get(DeviceController.airconditioners)
deviceRouter.route('/humidifiers').get(DeviceController.humidifiers)

export default deviceRouter