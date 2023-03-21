const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/testdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to database');
});

mongoose.connection.on('error', (err) => {
  console.error(`Error connecting to database: ${err}`);
});

const sensorDataSchema = new mongoose.Schema({
    data: String,
    lastTime: Date,
  });

export const sensorData = mongoose.model('sensor', sensorDataSchema);