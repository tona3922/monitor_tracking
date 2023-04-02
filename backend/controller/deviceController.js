import { DeviceModel } from "../model/device_model.js";
import axios from "axios";

export default new (class DeviceController {
  airconditioners = async (req, res) => {
    await DeviceModel.find({ isAirConditioner: true })
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
  }

  humidifiers = async (req, res) => {
    await DeviceModel.find({ isAirConditioner: false })
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
  };

  adding = async (req, res) => {
    // console.log(req.body)
    // res.json("OK")
    if (req.body.nameDevice && req.body.email) {
      var numberOfDev = 0
      await DeviceModel.count({ email: req.body.email })
        .then(data => { numberOfDev = data })
        .catch(err => res.status(500))
      console.log(numberOfDev)
    }
    var deviceName = req.body.email + `_${numberOfDev}`
    var accessToken = ""
    var deviceID = ""

    try {
      // Create thingsboard device with an automatic name created by system
      const response1 = await axios
        .post(
          "https://demo.thingsboard.io:443/api/v1/provision",
          {
            deviceName: deviceName,
            provisionDeviceKey: process.env.CUS_PROVISION_DEV_KEY,
            provisionDeviceSecret: process.env.CUS_PROVISION_DEV_SECRET,
          },
          {
            headers: {
              "Content-Type": "application/json",
              "X-Authorization": process.env.JWT_TOKEN,
            },
          }
        )
        .then((data) => {
          data.data['status'] == 'SUCCESS' ? accessToken = data.data['credentialsValue'] : res.status(500).json('Failure')
          console.log("Device Created with name", deviceName, "and", accessToken)
        })
        .catch((err) => res.json(data))


      await axios
        .get(
          `https://demo.thingsboard.io:443/api/tenant/devices?deviceName=${deviceName}`,
          {
            headers: {
              "accept": "application/json",
              "X-Authorization": process.env.JWT_TOKEN,
            },
          }
        )
        .then(data => {
          console.log('Finding deviceID...')
          if (data['status'] && data['status'] == 404) res.status(404).json('Device Not Found after created - Max')
          else deviceID = data.data.id.id
          console.log('Device ID: ', deviceID)
        })
        .catch(err => console.log(err))

      // console.log("Create device: ", response1.data);
      // console.log("Get Device: ", response2?.data?.id?.id);
      await axios
        .post(
          `https://demo.thingsboard.io:443/api/customer/public/device/${deviceID}`,
          "",
          {
            headers: {
              Accept: "application/json",
              "X-Authorization": process.env.JWT_TOKEN,
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )
        .then(data => console.log('Device Published!'))

      DeviceModel.create({
        thingsboard_JWT: process.env.JWT_TOKEN,
        email: req.body.email,
        thingsboard_name: deviceName,
        name: req.body.nameDevice,
        enityID: deviceID,
        accessToken: accessToken,
        status: false,
        isAirConditioner: req.body.isAC,
      })
        .then((data) => {
          res.status(201).send(data)
        })
        .catch((err) => res.status(500).json("Server crashed!"))
    }
    catch (err) {
      return
    }
  };
})();
