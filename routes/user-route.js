const express = require("express");

const router = express.Router();

const { getUser,updateUser } = require("../controller/user-controller");

router.route("/find").get(getUser);

router.route("/update").put(updateUser)

module.exports = router;
