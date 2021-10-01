const express = require("express");

const router = express.Router();

const { createUser } = require("../controller/user-controller");

router.route("/register").post(createUser);


module.exports = router;