const express = require("express");
const { protect, authorize } = require("../middleware/route-guard-middleware");

const router = express.Router();

const {
  addCategory,
  deleteCategoryById,
  getAllCategory,
  getCategoryById,
  updateCategory
} = require("../controller/category-controller");

router
  .route("/")
  .get(protect, getAllCategory)
  .post(protect, authorize("admin"), addCategory)
  .put(protect,authorize('admin'),updateCategory);

router
  .route("/:id")
  .get(protect, getCategoryById)
  .delete(protect, authorize("admin"), deleteCategoryById);

module.exports = router;
