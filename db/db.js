const mongoose = require('mongoose');

const db = async ()=>{
    try{
        mongoose.set('strictQuery',false);
        await mongoose.connect(process.env.mongo_url);
        console.log('database connected');
    }
    catch(error){
        console.log(error);
    }
}

module.exports={db}; 