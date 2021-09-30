const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
    category_name:{
        type:String,
        required:[true,'Category Name is required.'],
        minlength:[5,'Category Name should be atleast five characters long'],
        maxlength:[15,'Category Name should be maximum of 15 characters long'],
        unique:true
    },
    description:{
        type:String,
        required:[true,'Description is required.'],
        minlength:[5,'Description should be atleast five characters long'],
        maxlength:[50,'Description should be maximum of 15 characters long']
    },
    isactive:Boolean
})

module.exports= mongoose.model("Category",CategorySchema);