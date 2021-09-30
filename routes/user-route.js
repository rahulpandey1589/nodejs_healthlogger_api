const express = require("express");

const router = express.Router();

const { authenticateUser } = require("../controller/login-controller");

router.route("/").post(authenticateUser);


module.exports = router;