const mongoose = require('mongoose');



const transactionSchema=new mongoose.Schema({
   userid:{
    type: String,
    required: true
   },
    amount:{
        type: Number,
        required:true,
        maxLength: 20,
        trim: true
    },
    type:{
        type: String,
        required: true
    },
    refrence:{
        type: String
    },
    date:{
        type: Date,
        required: true,
        trim: true
    },
    category:{
        type: String,
        required:true,
    },
    description:{
        type: String,
        required:true,
    }

},{timestamps:true})

const transactionmodel=mongoose.model('transations',transactionSchema)
module.exports=transactionmodel