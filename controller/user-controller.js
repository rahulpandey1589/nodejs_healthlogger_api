const asyncHandler = require("../middleware/asyncHandler");
const UserModel = require('../models/user');

exports.createUser = asyncHandler(async (req, res, next) => {
  const bootCampResponse = await UserModel.create(req.body);

  res.status(200).json({
    success: true,
    message: "User Created!!!",
    data:bootCampResponse.id
  });
});
