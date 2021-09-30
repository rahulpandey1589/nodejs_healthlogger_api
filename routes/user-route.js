const express = require("express");

const router = express.Router();

const {
  authenticateUser,
  createUser,
} = require("../controller/user-controller");


router.route("/create")
.post(createUser)


router.route("/authenticate")
.post(authenticateUser)


module.exports = router;
