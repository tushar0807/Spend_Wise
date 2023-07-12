const { logincontroller, registercontroller } = require('../controllers/usercontroller');

const express=require('express');
const router = express.Router();

//routers
//post||login
router.post('/login',logincontroller)

//post|| register user
router.post('/register',registercontroller)






module.exports = router