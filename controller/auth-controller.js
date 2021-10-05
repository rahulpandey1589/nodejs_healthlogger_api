const UserModel = require("../models/user");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/asyncHandler");


exports.authenticate = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;

  if (username !== undefined && password !== undefined) {
    let user = await UserModel.findOne({username}).select('password');

    if(!user){
      return next(new ErrorResponse('Invalid Credentials',404));
    }
    const isMatch = await user.matchPassword(password);
    if(!isMatch){
      return next(new ErrorResponse('Invalid Credentials',404));
    }

    if (user != null) {
      const token = user.getSignedJwtToken();
      res.status(200).json({
        success: true,
        message: "User Authenticated!!!",
        token:token,
        expiresIn: 3600
      });
    }
  }
});


exports.register = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  const user = await UserModel.create(req.body);
  res.status(200).json({
    success: true,
    message: "User Created!!!",
    token:user
  });
});
