import { DeviceModel } from "../model/device_model.js";
import axios from "axios";

export default new (class DeviceController {
  testing = async (req, res) => {
    await DeviceModel.find({})
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
  };
  adding = async (req, res) => {
    if (req.body.nameDevice) {
       try {
        const response1 = await axios
          .post(
            "https://demo.thingsboard.io:443/api/v1/provision",
            {
              deviceName: req.body.nameDevice,
              provisionDeviceKey: "hkmp6pz9h7cmuhsadcgy",
              provisionDeviceSecret: "j3vjmrz0napxw158dq55",
            },
            {
              headers: {
                "Content-Type": "application/json",
                "X-Authorization": process.env.JWT_TOKEN,
              },
            }
          )
          // .then((data) => res.status(200).json(data))
          // .catch((err) => res.json(data));
        const response2 = await axios
          .get(
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
        const response3 = await axios.post(
          `https://demo.thingsboard.io:443/api/customer/public/device/${response2?.data?.id?.id}`,
          "",
          {
            headers: {
              Accept: "application/json",
              "X-Authorization": process.env.JWT_TOKEN,
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        console.log("Make Public: ", response3.data);

        const newDevice = await new DeviceModel({
          thingsboard_JWT: process.env.JWT_TOKEN,
          name: await req.body.nameDevice,
          enityID: await response2?.data?.id?.id,
          status: false,
        });
        //save device
        const device = await newDevice.save();
        res.status(200).json("Success");
      } catch (err) {
        res.status(500).json(err);
      }
    }else{
      res.status(500).json("You have not type device name")  
    }

  };
})();
