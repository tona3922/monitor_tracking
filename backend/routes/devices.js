import DeviceController from "../controller/deviceController.js"
import express from "express"

var deviceRouter = express.Router()

deviceRouter.route('/').get(DeviceController.testing)
deviceRouter.route('/add').post(DeviceController.adding)

export default deviceRouter