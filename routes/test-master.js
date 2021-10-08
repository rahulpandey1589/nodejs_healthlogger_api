const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middleware/route-guard-middleware");

const {
  addTest,
  findAll,
  findById,
  updateTest,
  deleteById,
} = require("../controller/testmaster-controller");

router
  .route("/")
  .post(protect, addTest)
  .get(protect, findAll)
  .put(protect, updateTest)
  .delete(protect, authorize('admin'), deleteById);

router.route("/:id").get(protect, findById);

module.exports = router;
