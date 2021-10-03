const TestModel = require("../models/test");
const CategoryModel = require("../models/category");

const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/asyncHandler");

exports.addTest = asyncHandler(async (req, res, next) => {
  const { title, description, price,categoryId } = req.body;

  let categoryDetails = await CategoryModel.findById(categoryId);
  if(!categoryDetails){
    next(new ErrorResponse(`No category found with Category Id as ${categoryId}`,404));
  }

  let testModel = await TestModel.create({
    title: title,
    description: description,
    price: price,
  });

  res.status(200).json({
    success: true,
    message: "Test Master Created!!!",
    id: testModel.id,
  });
});
