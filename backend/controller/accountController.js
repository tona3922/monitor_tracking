import { AccountModel } from "../model/account_model.js";

export default new (class AccountController {
  login = async (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    AccountModel.findOne({
      email: email,
      password: password,
    })
      .then((data) => {
        data ? res.status(201).send(data) : res.status(300).send("Failed");
      })
      .catch((err) => res.status(500).json("Server crashed!"));
  };

  register = async (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    var gender = req.body.gender ? req.body.gender : "M";
    var name = req.body.fullname;
    var username = req.body.username;
    var phone = req.body.phone;

    AccountModel.findOne({
      email: email,
      password: password,
      username: username,
    }).then((data) => {
      if (data) {
        res.status(300).send("Failed");
      } else {
        AccountModel.create({
          email: email,
          password: password,
          gender: gender,
          name: name,
          phone: phone,
          username: username,
        })
          .then((data) => {
            res.status(201).send(data);
          })
          .catch((err) => res.status(500).json("Server crashed!"));
      }
    });
  };
})();
