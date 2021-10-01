const express = require("express");
const {protect} = require('../middleware/guard-middleware');

const router = express.Router();

const {
  addCategory,
  deleteCategoryById,
  getAllCategory,
  getCategoryById,
} = require("../controller/category-controller");

router.route("/").get(protect,getAllCategory).post(protect,addCategory);

router.route("/:id").get(protect,getCategoryById).delete(protect,deleteCategoryById);


module.exports = router;