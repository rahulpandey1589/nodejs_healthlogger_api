const TestMasterModel = require("../models/test-master");
const TestDetailModel = require("../models/test-details");

const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/asyncHandler");

exports.addTest = asyncHandler(async (req, res, next) => {
  const { title, description, price, categoryId } = req.body;

  // let data = await TestMasterModel.validateCategoryDetails(categoryId);
  // console.log(data);
  // if (!data) {
  //   next(new ErrorResponse(`Category data not found`, 404));
  //   return;
  // }

  let testDetails = await TestMasterModel.create({
    title: title,
    description: description,
    price: price,
    categoryId: categoryId,
  });

  res.status(200).json({
    success: true,
    message: "Test Master Created!!!",
    id: testDetails.id,
  });
});

exports.findAll = asyncHandler(async (req, res, next) => {
  var testDetails = await TestMasterModel.find();
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
  let data = await TestMasterModel.findById(id);
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

  let testData = await TestMasterModel.findById(id);
  if (!testData) {
    next(new ErrorResponse(`Invalid Test Id supplied`, 404));
    return;
  }

  let categoryData = await TestMasterModel.validateCategoryDetails(categoryId);
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

  let testData = await TestMasterModel.findById(id);
  if (!testData) {
    next(
      new ErrorResponse(`The Test Id ${id} doesn't exists in database.`, 404)
    );
    return;
  }

  await TestMasterModel.deleteOne({ id: id });

  res.status(200).json({
    success: true,
    message: "Data Deleted",
  });
});
