const TestModel = require("../models/test");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/asyncHandler");

exports.addTest = asyncHandler(async (req, res, next) => {
  const { title, description, price } = req.body;

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
