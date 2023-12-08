const express= require("express");
const Authentification = require("../controllers/Authentification");
const route= express.Router();

    route.post("/login",Authentification.login);








module.exports=route