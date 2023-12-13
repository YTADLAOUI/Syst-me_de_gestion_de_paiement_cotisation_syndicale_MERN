const express= require("express");
const Payment = require("../controllers/payment");
const route= express.Router();


route.post('/createPayment',Payment.createPayment);


module.exports=route;