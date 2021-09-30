const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  console.log(error);

  // Mongoose Duplicate Key Error
  if (err.code === 11000) {
      const feildName = Object.keys(err.keyValue);
    const message = `${feildName.toString().toUpperCase()} already exists!!`;
    error = new ErrorResponse(message, 400);
  }

  if(err.name === "ValidationError"){
      const message = Object.values(err.errors).map(val => val.message);
      error=new ErrorResponse(message,400);
  }
  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "Server Error!!!",
  });
};

module.exports = errorHandler;
