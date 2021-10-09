const TestMasterModel = require("../models/test-master");

const {
  ErrorResponseWithData,
  SuccessResponse,
} = require("../utils/api-response");

const asyncHandler = require("../middleware/asyncHandler");

const addTest = asyncHandler(async (req, res, next) => {
  let testDetails = await TestMasterModel.create(req.body);
  SuccessResponse(res, "Test Master Created", 201, testDetails.id);
});

const findAll = asyncHandler(async (req, res, next) => {
  var testDetails = await TestMasterModel.find();
  if (!testDetails) {
    ErrorResponseWithData(res, "No Test found!!!", 404, "No Data Found");
    return;
  }
  SuccessResponse(res, "Data Retreived", 200, testDetails);
});

const findById = asyncHandler(async (req, res, next) => {
  let id = req.params.id;
  let data = await TestMasterModel.findById(id);
  if (!data) {
    let errorData = {
      msg: `No data found against id ${id}`,
    };
    ErrorResponseWithData(res, "No Test found!!!", 404, errorData);
    return;
  }
  SuccessResponse(res, "Data Fulfilled", 200, data);
});

const updateTest = asyncHandler(async (req, res, next) => {
  const { title, description, price, id, categoryId } = req.body;

  let testData = await TestMasterModel.findById(id);
  if (!testData) {
    // next(new ErrorResponse(`Invalid Test Id supplied`, 404));
    return;
  }

  let categoryData = await TestMasterModel.validateCategoryDetails(categoryId);
  if (!categoryData) {
    //next(new ErrorResponse(`Category data not found`, 404));
    return;
  }
  SuccessResponse(res, "Data Updated", 200);
});

const deleteById = asyncHandler(async (req, res, next) => {
  const { id } = req.body;

  let testData = await TestMasterModel.findById(id);
  if (!testData) {
    //next(
    //new ErrorResponse(`The Test Id ${id} doesn't exists in database.`, 404)
    ///);
    return;
  }

  await TestMasterModel.deleteOne({ id: id });
  SuccessResponse(res, "Data Deleted", 200);
});

module.exports = {
  deleteById,
  updateTest,
  findById,
  findAll,
  addTest
};
