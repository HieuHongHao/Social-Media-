const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");


router.route("/signUp").post(authController.signUp);
router.route("/login").post(authController.logIn);
router.route("/updatePassword").post(authController.checkCredentials,authController.updatePassword);

module.exports =  router;