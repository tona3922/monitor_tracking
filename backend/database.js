import mongoose from 'mongoose'

await mongoose.connect('mongodb://localhost/testdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected'))
  .catch((err) => console.log('Error connecting to database: ${err}'));

// mongoose.connection.on('connected', () => {
// })


// mongoose.connection.on('error', (err) => {
//   console.error(`Error connecting to database: ${err}`);
// });

const sensorDataSchema = new mongoose.Schema({
  data: String,
  lastTime: Date,
});

export const sensorData = mongoose.model('sensor', sensorDataSchema);