const express= require("express");
const Authentification = require("../controllers/Authentification");
const route= express.Router();

    route.post("/login",Authentification.login);

    route.post("/logout",Authentification.logout);






module.exports=route