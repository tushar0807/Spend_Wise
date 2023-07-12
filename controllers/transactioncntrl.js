const transactionmodel = require("../models/transactionmodel")

const getAllTransaction= async (req,res)=>{
    try {
        const {type} = req.body;
        const transactions= await transactionmodel.find({
            userid:req.body.userid,
            ...(type!=='all' && {type})
        })
        res.status(200).json(transactions)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

const editTransaction= async (req,res)=>{
    try {
        await transactionmodel.findOneAndUpdate({
            _id: req.body.transactionId},
            req.body.payload
        );
        res.status(200).send("edited successfully")
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

const deleteTransaction= async (req,res)=> {
    try {
        await transactionmodel.findOneAndDelete({
            id:req.body.trasactionId
        }
        )
        res.status(200).send("Transaction deleted successfully")
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
        
    }
}

const addTransaction = async(req,res)=>{
    try {
        const newtransaction= new transactionmodel(req.body)
        await newtransaction.save()
        res.status(201).send('Transaction Created')
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}


module.exports={getAllTransaction,addTransaction,editTransaction,deleteTransaction}

