import { SensorModel } from "../model/sensor_model.js";

export default new (class SensorController {
    testing = async (req, res) => {
        await SensorModel.find({})
            .then(data => res.json(data))
            .catch(err => res.status(500).send('Error getting users'))
    }
})();