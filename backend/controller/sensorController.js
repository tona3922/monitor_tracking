import { SensorModel } from "../model/sensor_model.js";
import axios from "axios"

export default new (class SensorController {
    testing = async (req, res) => {
        SensorModel.find({}, (err, users) => {
            if (err) {
                res.status(500).send('Error getting users');
            } else {
                res.json(users);
            }
        });
        // const timeStart = new Date('2023-03-20T00:00:00Z').getTime().toString()
        // const timeEnd = new Date('2023-03-20T18:00:00Z').getTime().toString()
        // const API_URL = `http://demo.thingsboard.io/api/plugins/telemetry/DEVICE/2c687400-c489-11ed-9b15-dd2dac50548f/values/timeseries?keys=TEMPERATURE,HUMIDITY&startTs=${timeStart}&endTs=${timeEnd}&interval=60000&limit=100`
        // // const DHT20 = "KA7eQnwq2bK84MItGVWK"

        // await axios
        //     .get(API_URL, {
        //         headers: {
        //             'X-Authorization': process.env.JWT_TOKEN,
        //             'Content-Type': 'application/json',
        //         },
        //     })
        //     .then((response) => {
        //         console.log(response.data)
        //         res.status(200).json("ok")
        //     })
        //     .catch((err) => {
        //         console.log(err)
        //         res.status(401).json("Unconnected")
        //     })
        await SensorModel.find({})
            .then(data => res.json(data))
            .catch(err => res.status(500).send('Error getting users'))
    }
})();