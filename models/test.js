const mongoose = require("mongoose");

const TestSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        minlength:[5,'Title should be of minimum of 5 characters'],
        maxlength:[30,'Title should be of minimum of 15 characters'],
        unique:true
    },
    description:{
        type:String,
        required:true,
        minlength:[5,'Title should be of minimum of 5 characters'],
        maxlength:[200,'Title should be of minimum of 15 characters'],
    },
    price:{
        type:Number,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    categoryId:String
});

module.exports = mongoose.model("Test", TestSchema);
