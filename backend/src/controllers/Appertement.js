const appartement = require("../models/appertement");
// const Appartement=require("../models/appertement");

class Appertement{
  static async createAppartement(req, res){
    try {
        const newAppertement= await new appartement(
          req.body
        )
        const Appartement = await newAppertement.save();
        res.json({ success: "Appartement created successfully", Appartement });
    } catch (e) {
        console.log(e);
        res.status(400).json({ error: "Something went wrong" });
    }
};
}

module.exports=Appertement;