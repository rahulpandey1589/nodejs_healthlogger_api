const UserModel = require("../models/user");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/asyncHandler");


exports.authenticate = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;

  if (username !== undefined && password !== undefined) {
    let userData = await UserModel.findOne({
      username: username,
      password: password,
    });

    if (userData != null) {
      res.status(200).json({
        success: true,
        message: "User Authenticated!!!",
        data: userData,
      });
    } else {
      next(new ErrorResponse("Incorrect UserName or Password", 404));
    }
  }
});


exports.register = asyncHandler(async (req, res, next) => {
  const bootCampResponse = await UserModel.create(req.body);

  res.status(200).json({
    success: true,
    message: "User Created!!!",
    data:bootCampResponse.id
  });
});

