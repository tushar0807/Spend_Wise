const express = require('express');
const cors = require('cors');
const {db} = require('./db/db');
const {readdirSync}=require('fs');
const app=express();
const path =require('path');

require('dotenv').config();
db();

const PORT = process.env.PORT;

//middlewares
app.use(express.json())
app.use(cors())

//routes
// readdirSync('./routes').map((route)=>app.use('/api/v1',require('./routes/'+ route)))

//user routes
app.use('/api/v1/users', require('./routes/userRoutes'))
//transaction routes
app.use('/api/v1/transactions',require('./routes/transaction'))

app.use(express.static(path.join(__dirname, './client/build')))



const server=()=>{
    
    app.listen(PORT,()=>{
        console.log(`listening to port ${PORT}`)
    })
}


server()