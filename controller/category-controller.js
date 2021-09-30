const CategoryModel = require("../models/category");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/asyncHandler");

exports.addCategory = asyncHandler(async (req, res, next) => {

    console.log(req.body);

    let response= await CategoryModel.create(req.body);

    res.status(200).json({
        success:true,
        message:'Category Added'
    });
});

exports.getAllCategory = asyncHandler(async (req, res, next) => {

    res.status(200).json({
        success:true,
        message:'Category Added'
    });
});

exports.getCategoryById = asyncHandler(async (req, res, next) => {

    res.status(200).json({
        success:true,
        message:'Category Added'
    });
});


exports.deleteCategoryById = asyncHandler(async (req, res, next) => {

    res.status(200).json({
        success:true,
        message:'Category Added'
    });
});
