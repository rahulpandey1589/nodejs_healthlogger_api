const TestModel = require("../models/test");

const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/asyncHandler");

exports.addTest = asyncHandler(async (req, res, next) => {
  const { title, description, price, categoryId } = req.body;

  // let data = await TestModel.validateCategoryDetails(categoryId);
  // console.log(data);
  // if (!data) {
  //   next(new ErrorResponse(`Category data not found`, 404));
  //   return;
  // }

  let testModel = await TestModel.create({
    title: title,
    description: description,
    price: price,
    categoryId: categoryId
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
    return;
  }

  res.status(200).json({
    success: true,
    message: "Data Retreived",
    data: testDetails,
  });
});

exports.findById = asyncHandler(async (req, res, next) => {
  let id = req.params.id;
  let data = await TestModel.findById(id);
  if (!data) {
    next(new ErrorResponse(`No Test Found against id ${id}`, 404));
    return;
  }

  res.status(200).json({
    success: true,
    message: "Data Fulfilled",
    data: data,
  });
});

exports.updateTest = asyncHandler(async (req, res, next) => {
  const { title, description, price, id, categoryId } = req.body;

  let testData = await TestModel.findById(id);
  if (!testData) {
    next(new ErrorResponse(`Invalid Test Id supplied`, 404));
    return;
  }

  let categoryData = await TestModel.validateCategoryDetails(categoryId);
  if (!categoryData) {
    next(new ErrorResponse(`Category data not found`, 404));
    return;
  }

  res.status(200).json({
    success: true,
    message: "Data Updated!!!",
  });
});

exports.deleteById = asyncHandler(async (req, res, next) => {
  const { id } = req.body;

  let testData = await TestModel.findById(id);
  if (!testData) {
    next(new ErrorResponse(`The Test Id ${id} doesn't exists in database.`, 404));
    return;
  }

  await TestModel.deleteOne({id:id});

  res.status(200).json({
    success: true,
    message: "Data Deleted",
  });
});
