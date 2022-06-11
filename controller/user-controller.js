const asyncHandler = require("../middleware/asyncHandler");
const UserModel = require("../models/user");
const { ErrorResponseWithData } = require("../utils/api-response");

const getUser = asyncHandler(async (req, res, next) => {
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

const updateUser = asyncHandler(async (req, res, next) => {
  const { firstname, lastname, dob, id, gender } = req.body;
  let updatedUserObj = {
    first_name: firstname,
    last_name: lastname,
    date_of_birth: dob,
    gender: gender,
  };

console.log(JSON.stringify(updatedUserObj));

  let userData = await UserModel.findByIdAndUpdate(id, updatedUserObj,);
  if (!userData) {
    let errorData = {
      msg: `No user detail found against Id ${id}`,
    };
    ErrorResponseWithData(res, "Invalid User", 404, errorData);
  }

  res.status(200).json({
    success: true,
    message: "Data Updated!!!",
    data: userData,
  });
});

module.exports = {
  getUser,
  updateUser,
};
