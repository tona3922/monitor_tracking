import { AccountModel } from "../model/account_model.js";

export default new (class AccountController {
    login = async (req, res) => {
        var email = req.body.email
        var password = req.body.password

        AccountModel.findOne(
            {
                email: email,
                password: password
            }
        )
            .then(data => data ? res.status(201).send('Success') : res.status(300).send('Failed'))
            .catch(err => res.status(500).json('Server crashed!'))
    }

    register = async (req, res) => {
        var email = req.body.email
        var password = req.body.password

        AccountModel.create(
            {
                email: email,
                password: password,
                thingsboard_JWT: ""
            }
        )
            .then(data => res.status(201).send('Success'))
            .catch(err => res.status(500).json('Server crashed!'))

    }
})();