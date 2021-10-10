const asyncHandler = require("../middleware/asyncHandler");
const UserModel = require("../models/user");
const { ErrorResponseWithData } = require("../utils/api-response");

exports.getUser = asyncHandler(async (req, res, next) => {
  let userId = req.query.id;

  let userData = await UserModel.findById(userId);
  if (!userData) {
    let errorData = {
      msg: `No user detail found against Id ${id}`,
    };
    ErrorResponseWithData(res, "Invalid User", 404, errorData);
  }

  res.status(200).json({
    success: true,
    message: "Data Found!!!",
    data: userData,
  });
});
