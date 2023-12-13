const appartement = require("../models/appertement");

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
        res.status(400).json({ error: "An error occurred" });
    }
};
     static async getAllAppartements(req, res) {
      try{ 
        const Appartement = await appartement.find({ isDeleted: false });
      return res.status(200).json(Appartement);
    }catch(e){
      console.log(e);
      res.status(400).json({ error: "An error occurred"});
    }  
};
     static async  updateAppartement(req, res){
  try {
      const { id } = req.params;
      const updatedAppartement = await appartement.findByIdAndUpdate(
          id,
          req.body
      );
      if (!updatedAppartement) {
          return res.status(404).json({ error: "Appartement not found" });
      }
      res.status(200).json({
          success: "Appartement updated successfully",
          updatedAppartement,
      });
  } catch (e) {
      console.log(e);
      res.status(400).json({ error: "An error occurred" });
  }
};
static  async deleteAppartement(req, res){
  try {
      const { id } = req.params;
      const deletedAppartement = await appartement.findByIdAndUpdate(id,{isDeleted:true});
      if (!deletedAppartement) {
          return res.status(404).json({ error: "Appartement not found" });
      }
      res.json({
          success: "Appartement deleted successfully",
          deletedAppartement,
      });
  } catch (e) {
      console.log(e);
      res.status(400).json({ error: "An error occurred" });
  }
};
}

module.exports=Appertement;