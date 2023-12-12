express= require("express");

const Appartement = require("../controllers/Appertement");
const route= express.Router();

    route.post("/AddAppartement",Appartement.createAppartement);








module.exports=route