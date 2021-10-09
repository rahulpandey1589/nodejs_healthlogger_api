const UserModel = require("../models/user");
const {
  ErrorResponseWithData,
  SuccessResponse,
} = require("../utils/api-response");

const asyncHandler = require("../middleware/asyncHandler");
const { body, validationResult } = require("express-validator");

const authenticate = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  
  const { username, password } = req.body;

  let user = await UserModel.findOne({ username: username }).select({
    password: 1,
    role: 1,
    first_name: 1,
    last_name:1
  });

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    let errorData = {
      msg: "Invalid Username or password supplied",
    };
    console.log("Wrong Data");
    ErrorResponseWithData(res, "Invalid Credentials", 400, errorData);
  }

  if (user != null) {
    const token = user.getSignedJwtToken();
    let response = {
      token: token,
      expiresIn: 3600,
      displayName: user.fullname,
      role: user.role,
    };
    SuccessResponse(res, "User Authenticated", 200, response);
  }
});

const register = asyncHandler(async (req, res, next) => {
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

const validate = (method) => {
  switch (method) {
    case "register": {
      return [
        valideUserName(true),
        validatePassword(),
        validateConfirmPassword()
      ];
    }
    case "authenticate": {
      return [valideUserName(false)];
    }
  }
};

const valideUserName = (registerNew) => {
  return body("username")
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
        } else {
          if (user.length === 0) {
            return Promise.reject(
              `The supplied email address doesn't exists in our DB`
            );
          }
        }
      });
    });
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

const validateConfirmPassword = () =>{
  return body('confirmPassword')
  .exists()
  .withMessage('Cofirm Password is Mandatory')
  .custom(async (confirmPassword,{req}) =>{
    var password = req.body.password;
    if(password !== confirmPassword){
       throw new Error('Password and Confirm Password should be same.')
    }
  })
}

module.exports = {
  authenticate,
  register,
  validate,
};
