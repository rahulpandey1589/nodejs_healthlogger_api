const express = require("express");

const router = express.Router();

const {
  authenticateUser
} = require("../controller/auth-controller");




router.route("/")
.post(authenticateUser)


module.exports = router;
