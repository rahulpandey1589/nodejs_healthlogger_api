const UserModel = require("../models/user");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/asyncHandler");
const { body, validationResult } = require("express-validator");

exports.authenticate = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { username, password } = req.body;

  let user = await UserModel.findOne({ username }).select("password");
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return next(new ErrorResponse("Invalid Credentials", 404));
  }

  if (user != null) {
    const token = user.getSignedJwtToken();
    res.status(200).json({
      success: true,
      message: "User Authenticated!!!",
      token: token,
      expiresIn: 3600,
    });
  }
});

exports.register = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const user = await UserModel.create(req.body);
  res.status(200).json({
    success: true,
    message: "User Created!!!",
    token: user,
  });
});

exports.validate = (method) => {
  switch (method) {
    case "register": {
      return [
        valideUserName(true),
        validateFirstName(),
        validateLastName(),
        validatePassword(),
      ];
    }
    case "authenticate": {
      return [
        valideUserName(false)
      ]
    }
  }
};

const valideUserName = (registerNew) => {
  return body("username")
    .exists()
    .withMessage("UserName is mandatory")
    .isEmail()
    .withMessage(`Username must have a valid email address.`)
    .custom((value) => {
      return UserModel.find({ username: value }).then(function (user) {
        if (registerNew) {
          console.log(user);
          if (user.length > 0) {
            return Promise.reject(
              "The provided email address is already in use."
            );
          }
        }
        else{
          if (user.length === 0) {
            return Promise.reject(
              `The supplied email address doesn't exists in our DB`
            );
          }
        }
      });
    });
};

const validateFirstName = () => {
  return body("first_name")
    .exists()
    .withMessage("First Name is mandatory")
    .isLength({ min: 1, max: 50 })
    .withMessage("First Name should be between 1 to 50 characters.");
};

const validateLastName = () => {
  return body("last_name")
    .exists()
    .withMessage("Last Name is mandatory")
    .isLength({ min: 1, max: 50 })
    .withMessage("Last Name should be between 1 to 50 characters.");
};

const validatePassword = () => {
  return body("password")
    .exists()
    .withMessage("Password is mandatory")
    .isStrongPassword({
      minLength: 5,
      minLowercase: 1,
      minUppercase: 1,
      minSymbols: 1,
    })
    .withMessage(
      `Password should be of min five chracters and should contain atleast one lower case, one upper case,one special chracter and one symbol`
    );
};
