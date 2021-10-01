const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: [true, "Please add FirstName"],
    maxlength: [50, "First Name should not be greater than 50"],
    trim: true,
  },
  last_name: {
    type: String,
    required: [true, "Please add LastName"],
    maxlength: [50, "Last Name should not be greater than 50"],
    trim: true,
  },
  username: {
    type: String,
    required: [true, "Please add FirstName"],
    maxlength: [250, "User Name should not be greater than 250 characters"],
    trim: true,
    unique:true
  },
  password: {
    type: String,
    required: [true, "Please enter password"],
    maxlength: [15, "Password should not be more than 15 characters"],
    minlength: [8, "Password should be atleast 8 chracters long"],
    select:false
  },
  resetPasswordToken:String,
  resetPasswordExpire:Date,
  createdAt:{
    type:Date,
    default:Date.now
  }
});

module.exports = mongoose.model("User", UserSchema);
