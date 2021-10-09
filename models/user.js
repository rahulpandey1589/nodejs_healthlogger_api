const mongoose = require("mongoose");
const bcyrpt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter password"],
    maxlength: [15, "Password should not be more than 15 characters"],
    minlength: [8, "Password should be atleast 8 chracters long"],
    select: false,
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//Encrypt password

UserSchema.pre("save", async function (next) {
  const salt = await bcyrpt.genSalt(10);
  this.password = await bcyrpt.hash(this.password, salt);
});

// sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcyrpt.compare(enteredPassword, this.password);
};

UserSchema.statics.findUser = async function (emailId) {
   return this.find({username:emailId}).select({
       username:1,
       first_name:1,
       last_name:1,
       role:1
   });
};

UserSchema.virtual('fullname').get(function(){
  return `${this.first_name} ${this.last_name}`;
});



module.exports = mongoose.model("User", UserSchema);
