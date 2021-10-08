const asyncHandler = require("../middleware/asyncHandler");
const UserModel = require('../models/user');
const ErrorResponse = require("../utils/errorResponse");

exports.getUser = asyncHandler(async(req,res,next) =>{
   let email = req.query.username;

   let userData = await UserModel.findUser(email);
   if(!userData){
       next(new ErrorResponse(`No user detail found against Id ${id}`),404);
   }
q
   res.status(200).json({
       success:true,
       message:'Data Found!!!',
       data: userData
   });
});