//const ErrorResponse = require("../utils/errorResponse");
const { ErrorResponse } = require("../utils/api-response");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  console.log(error);

  // Mongoose Duplicate Key Error
  if (err.code === 11000) {
    const feildName = Object.keys(err.keyValue);
    const message = `${feildName.toString().toUpperCase()} already exists!!`;
    ErrorResponse(res, "Duplicate keys added!!!", 400, message);
  }
  

  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    ErrorResponse(res, "Validation Error!!!", 400, message);
  }
  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "Server Error!!!",
  });
};

module.exports = errorHandler;
