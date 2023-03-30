import mongoConnect from "./model/mongoose.js";
// import account from "./model/account_model";
import env from "dotenv";
import route from "./routes/index.js";
import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
// import AccountModel from "./model/account_model.js";
env.config();

const app = express();
const port = 8080;

app.use(cors());
app.use(bodyParser.json());

// Some decypher for POST method
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

mongoConnect(process.env.MONGO_URL);

route(app);

app.listen(port, () => {
  console.log("Hello on port", port);
});
// app.post("/users/new", async (req,res)=>{
//   try{
//       const myacconut= await.hash(req.body)
//   }
// })
// app.post("/users/new", (req, res) => {
//   var myacconut = AccountModel();
//   myacconut.email = "tommy";
//   myacconut.password = "123456";
//   myacconut.save((err, data) => {
//     if (err) {
//       console.error(err);
//     } else {
//       res.status(200).send("Ok");
//     }
//   });
// });
