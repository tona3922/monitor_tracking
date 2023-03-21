import {sensorData} from './database'
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.get('/sensor', (req, res) => {
    sensorData.find({}, (err, users) => {
      if (err) {
        res.status(500).send('Error getting users');
      } else {
        res.json(users);
      }
    });
  });

app.listen(3000, () => {
  console.log('Server started on port 3000');
});