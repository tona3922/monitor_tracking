import { DeviceModel } from "../model/device_model.js";
import axios from "axios";

export default new (class DeviceController {
  testing = async (req, res) => {
    await DeviceModel.find({})
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
  };
  adding = async (req, res) => {
    try {
      // console.log(process.env.JWT_TOKEN)
      const response1 = await axios.post(
        "https://demo.thingsboard.io:443/api/v1/provision",
        {
          deviceName: `${req.body.nameDevice}`,
          provisionDeviceKey: "hkmp6pz9h7cmuhsadcgy",
          provisionDeviceSecret: "j3vjmrz0napxw158dq55",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-Authorization": process.env.JWT_TOKEN,
          },
        }
      );
      const response2 = await axios.get(
        `https://demo.thingsboard.io:443/api/tenant/devices?deviceName=${req.body.nameDevice}`,
        {
          headers: {
            Accept: "application/json",
            "X-Authorization": process.env.JWT_TOKEN,
          },
        }
      );
      console.log("Create device: ", response1.data);
      console.log("Get Device: ", response2?.data?.id?.id);

      const newDevice = await new DeviceModel(
        {
          thingsboard_JWT: `${process.env.JWT_TOKEN}`,
          name: `${req.body.nameDevice}`,
          enityID: await response2?.data?.id?.id,
          status: false
        }
      )
      //save device
      const device = await newDevice.save()
      res.status(200).json(device)
    } catch (err) {
      res.status(500).json(err)
      // console.log(err);
    }
  };
})();
