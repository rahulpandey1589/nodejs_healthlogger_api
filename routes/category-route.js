const express = require("express");

const router = express.Router();

const {
  addCategory,
  deleteCategoryById,
  getAllCategory,
  getCategoryById,
} = require("../controller/category-controller");

router.route("/").get(getAllCategory).post(addCategory);

router.route("/:id").get(getCategoryById).delete(deleteCategoryById);


module.exports = router;