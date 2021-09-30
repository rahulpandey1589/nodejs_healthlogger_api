const express = require("express");

const router = express.Router();

const {
  authenticateUser,
  createUser,
} = require("../controller/user-controller");

router.route("/")
.post(createUser)


module.exports = router;
