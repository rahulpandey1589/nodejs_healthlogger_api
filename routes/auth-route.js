const express = require("express");

const router = express.Router();

const { authenticate, register,validate } = require("../controller/auth-controller");

router.route("/authenticate").post(validate('authenticate'),authenticate);

router.route("/register").post(validate('register'),register);

module.exports = router;
