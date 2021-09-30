/*
 @description : This file contains all the endpoints that 
                are responsible for authenticate user
*/

exports.authenticateUser = (req, res, next) => {
  console.log(req.body);

  res.status(200).json({
    success: true,
    message: "User Authenticated!!!",
  });
};
