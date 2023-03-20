import { SensorModel } from "../model/sensor_model.js";

export default new (class SensorController {
    testing = async (req, res) => {
        SensorModel.find({}, (err, users) => {
            if (err) {
                res.status(500).send('Error getting users');
            } else {
                res.json(users);
            }
        });
    }
})();
