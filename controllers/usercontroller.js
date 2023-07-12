const usermodel=require('../models/usermodel')
const bcrypt = require('bcryptjs')


const logincontroller=async (req,res)=>{
    try {
        const {email,password}=req.body
        
        const user=await usermodel.findOne({email:email})
        

        if(user){
            const ismatch = await bcrypt.compare(password,user.password);
            if(!ismatch){
                return res.status(400).send('User not found')
             }
             res.status(200).json({
                 succes:true,
                 user
             });
        }
        else{
            return res.status(400).send('User not found')
        }

        
    } catch (error) {
        res.status(400).json({
            success:false,
            error
        })
    }
};

const registercontroller= async (req,res)=>{
    try {
        const newuser=new usermodel(req.body);

        await newuser.save()
        res.status(201).json({
            succes:true,
            newuser
        });
    } catch (error) {
        res.status(400).json({
            succes:false,
            error
        })
    }
};




module.exports={logincontroller,registercontroller}