const express= require("express");
const Payment = require("../controllers/Payments")
const rout= express.Router();

rout.post('/create',Payment.createPayments);
rout.get('/payments',Payment.getAppartementPaye);
rout.post('/generate',Payment.generateFacturePaie);

module.exports=rout;