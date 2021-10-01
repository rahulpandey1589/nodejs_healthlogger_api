const express = require("express");

const router = express.Router();

const { authenticate, register } = require("../controller/auth-controller");

router.route("/authenticate").post(authenticate);

router.route("/register").post(register);

module.exports = router;
