const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  category_name: {
    type: String,
    required: [true, "Category Name is required."],
    minlength: [5, "Category Name should be atleast five characters long"],
    maxlength: [50, "Category Name should be maximum of 50 characters long"],
    unique: true,
  },
  description: {
    type: String,
    required: [true, "Description is required."],
    minlength: [5, "Description should be atleast five characters long"],
    maxlength: [250, "Description should be maximum of 250 characters long"],
  },
  isactive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Category", CategorySchema);
