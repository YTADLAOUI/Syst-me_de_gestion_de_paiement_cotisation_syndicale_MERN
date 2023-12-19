const express= require("express");
const Payment = require("../controllers/Payments");
const AuthMiddle = require("../middlewares/AuthMiddless");
const rout= express.Router();

rout.post('/create',AuthMiddle.userLogged,Payment.createPayments);
rout.get('/payments',AuthMiddle.userLogged,Payment.getAppartementPaye);
rout.post('/generate',AuthMiddle.userLogged,Payment.generateFacturePaie);

module.exports=rout;