import mongoConnect from './model/mongoose.js'
import env from 'dotenv'
import route from './routes/index.js'
import bodyParser from "body-parser"
import express from "express"
import cors from "cors"

env.config()

const app = express()
const port = 8080

app.use(cors())
app.use(bodyParser.json())

// Some decypher for POST method
app.use(bodyParser.urlencoded({
  extended: true
}));

mongoConnect(process.env.MONGO_URL)

route(app)

app.listen(port, () => {
  console.log('Hello on port', port);
})
