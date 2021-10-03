const express = require("express");

const router = express.Router();

const { addTest } = require("../controller/testmaster-controller");
const { protect } = require("../middleware/route-guard-middleware");

router.route("/").post(protect, addTest);

module.exports = router;
