const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TestDetailSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:[5,'Name should be atleast of 5 chracters'],
        maxlength:[5,'Name should be atleast of 50 chracters'],
    },
    unit:{
        type:String
    },
    approved_limits:{
        type:String
    },
    isHeader:{
        type:Boolean,
        default:false
    },
    testMasterId:{type: Schema.Types.ObjectId, ref: 'TestMaster'}
})

module.exports = mongoose.model("TestDetails",TestDetailSchema);