const CategoryModel = require("../models/category");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/asyncHandler");

exports.addCategory = asyncHandler(async (req, res, next) => {
  let response = await CategoryModel.create(req.body);
  res.status(200).json({
    success: true,
    message: "Category Added!!!",
    data: response.id,
  });
});

exports.getAllCategory = asyncHandler(async (req, res, next) => {
  let response = await CategoryModel.find();
  if (response !== undefined) {
    res.status(200).json({
      success: true,
      message: "Categories retrieved",
      data: response,
    });
  }
});

exports.getCategoryById = asyncHandler(async (req, res, next) => {
  let categoryId = req.params.id;

  if (categoryId !== undefined) {
    let response = await CategoryModel.findById(categoryId);
    if (response !== undefined) {
      res.status(200).json({
        success: true,
        message: "Category Retreived",
        data: response,
      });
    }
  }
});

exports.deleteCategoryById = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "Category Added",
  });
});
