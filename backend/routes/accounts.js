import AccountController from "../controller/accountController.js";
import express from "express";

var accountRouter = express.Router();

accountRouter.route("/login").post(AccountController.login);
accountRouter.route("/register").post(AccountController.register);
accountRouter.route("/profile").post(AccountController.update);

export default accountRouter;
