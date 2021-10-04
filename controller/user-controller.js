const asyncHandler = require("../middleware/asyncHandler");
const UserModel = require('../models/user');
const ErrorResponse = require("../utils/errorResponse");

exports.getUser = asyncHandler(async(req,res,next) =>{
   let id = req.params.id;
   let userData = await UserModel.findById(id);
   if(!userData){
       next(new ErrorResponse(`No user detail found against Id ${id}`),404);
   }

   res.status(200).json({
       success:true,
       message:'Data Found!!!',
       data: userData
   });
});