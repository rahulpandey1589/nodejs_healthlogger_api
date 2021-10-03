const TestModel = require("../models/test");
const CategoryModel = require("../models/category");

const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/asyncHandler");

exports.addTest = asyncHandler(async (req, res, next) => {
  const { title, description, price, categoryId } = req.body;
   
 let data =  await TestModel.validateCategoryDetails(categoryId);
 if(!data){
   next(new ErrorResponse(`Category data not found`,404));
   return;
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

exports.findAll = asyncHandler(async (req, res, next) => {
  var testDetails = await TestModel.find();
  if (!testDetails) {
    next(new ErrorResponse("No Test found!!!", 404));
  }

  res.status(200).json({
    success: true,
    message: "Data Retreived",
    data: testDetails,
  });
});
