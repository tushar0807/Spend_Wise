const mongoose=require('mongoose')
const bcrypt = require('bcryptjs')

//schema design
const userschema= new mongoose.Schema({
    name:{
        type: String,
        required:[true,'name is required']

    },
    email:{
        type: String,
        required:[true,'email is required ans unique'],
        unique:true
    },
    password:{
        type: String,
        required: [true,'password is required']
    }
},{timestamps:true});


userschema.pre('save', async function(next) {
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,12);
    }
    next();
})

//export
const usermodel=mongoose.model('users',userschema);
module.exports=usermodel