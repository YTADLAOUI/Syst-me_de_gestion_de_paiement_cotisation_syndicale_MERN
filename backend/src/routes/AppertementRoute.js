express= require("express");

const Appartement = require("../controllers/Appertement");
const AuthMiddle = require("../middlewares/authMiddle");
const route= express.Router();

    route.post("/AddAppartement",AuthMiddle.userLogged,Appartement.createAppartement);
    route.get("/getAllAppertement",AuthMiddle.userLogged,Appartement.getAllAppartements);
    route.put("/updateAppertement/:id",AuthMiddle.userLogged,Appartement.updateAppartement);
    route.put("/delete/:id",AuthMiddle.userLogged,Appartement.deleteAppartement );
module.exports=route