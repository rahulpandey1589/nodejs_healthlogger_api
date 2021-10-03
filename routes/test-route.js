const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/route-guard-middleware");

const { 
addTest, 
findAll 
} = require("../controller/testmaster-controller");

router.route("/")
.post(protect, addTest)
.get(protect, findAll);

module.exports = router;
