express= require("express");

const Appartement = require("../controllers/Appertement");
const route= express.Router();

    route.post("/AddAppartement",Appartement.createAppartement);
    route.get("/getAllAppertement",Appartement.getAllAppartements);


module.exports=route