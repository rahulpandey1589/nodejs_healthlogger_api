const successResponse = (res, msg, status, data) => {
  let responseData = {
    success: true,
    message: msg,
    response: data,
  };
  return res.status(status).json(responseData);
};

const errorResponse= (res,msg,status)=>{
  let errorData = {
    success: false,
    message: msg
  };
  return res.status(status).json(errorData);
}

const errorResponseWithData = (res, msg, status, data) => {
  let objectKeys = Object.keys(data);

  let errorData = objectKeys.map((value) => {
    return { "msg": data[value] };
  });

  let errorResponse = {
    success: false,
    message: msg,
    errors: errorData
  };

  return res.status(status).json(errorResponse);
};

module.exports = {
  SuccessResponse:successResponse,
  ErrorResponseWithData:errorResponseWithData,
  ErrorResponse:errorResponse
};
