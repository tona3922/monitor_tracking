import { sensorData } from './database.js'

import route from './routes/index.js'
import bodyParser from "body-parser"
import express from "express"
// import route from "./routes/"
// import connectDB from "./models/database.js";
import cors from "cors"
const app = express()
const port = 8080

app.use(cors());
app.use(bodyParser.json())

// app.get('/sensor', (req, res) => {
//     sensorData.find({}, (err, users) => {
//       if (err) {
//         res.status(500).send('Error getting users');
//       } else {
//         res.json(users);
//       }
//     });
//   });
route(app)

app.listen(port, () => {
  console.log('Hello on port', port);
})