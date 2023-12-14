const appertement = require("../models/appertement");
const payment=require("../models/payment")

class Payments{

  static async createPayments(req,res){
    console.log(req.body);

    try{
      const {amount, idAppartement} =req.body;
      const currentDate = new Date();
      const month = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();

      const createPayment=new payment(
        {
          amount:amount,
          appartement:idAppartement,
          month:month,
          year:year
        }
      )
      if(!createPayment || !amount || !idAppartement){
       return res.status(400).json("Payment creation not completed.")
      }
      const savePayment=await createPayment.save();
      return res.status(200).json({succss:"Payment Create successfully",data:createPayment})
      }catch(e){
        console.log(e)
       return res.status(500).json("An error occurred")
      }
  }
  static async getAppartementPaye(req,res){
    try{
      const getAllAppertements= await appertement.find({isDeleted:false});
      console.log(getAllAppertements)
      const currentDate = new Date();
      const month = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();
      const getAppertementPaye= await payment.find({
            month:month,
            year:year,
            isDeleted:false,
     }).populate("appartement");
        console.log(getAppertementPaye, "helloo");
  
        const paidAppartmentsIds = getAppertementPaye.map((payment) =>
        String(payment.appartement._id)
    );
    const unpaidAppartments = getAllAppertements.filter(
        (appertement) => !paidAppartmentsIds.includes(String(appertement._id))
    );
  console.log(unpaidAppartments)
            return res.status(200).json({paids:getAppertementPaye,unpaids:unpaidAppartments})
     }
    catch(e){
      console.log(e)
       return res.status(500).json("An error occurred")
    }
 
}
}
module.exports=Payments;