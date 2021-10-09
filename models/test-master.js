const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CategorySchema = require("./category-master");
const asyncHandler = require("../middleware/asyncHandler");

const TestMasterSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: [5, "Title should be of minimum of 5 characters"],
    maxlength: [30, "Title should be of minimum of 30 characters"],
    unique: true,
  },
  description: {
    type: String,
    required: true,
    minlength: [5, "Description should be of minimum of 5 characters"],
    maxlength: [200, "Description should be of minimum of 200 characters"],
  },
  price: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  categoryId: { type: Schema.Types.ObjectId, ref: 'CategoryMaster' }
});

TestMasterSchema.statics.validateCategoryDetails = asyncHandler(async function (categoryId) {
  return await CategorySchema.find({_id:categoryId});
});

module.exports = mongoose.model("TestMaster", TestMasterSchema);
