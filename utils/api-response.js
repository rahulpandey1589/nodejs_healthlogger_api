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

  let respinse = objectKeys.map((value) => {
    return { "msg": data[value] };
  });

  let errorData = {
    success: false,
    message: msg,
    errors: respinse,
  };

  return res.status(status).json(errorData);
};

module.exports = {
  success: successResponse,
  ErrorResponseWithData: errorResponseWithData,
  ErrorResponse:errorResponse
};
