const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  console.log(error);

  // Mongoose Duplicate Key Error
  if (err.code === 11000) {
    const message = "Duplicate feild value entered";
    error = new ErrorResponse(message, 400);
  }
  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "Server Error!!!",
  });
};

module.exports = errorHandler;
