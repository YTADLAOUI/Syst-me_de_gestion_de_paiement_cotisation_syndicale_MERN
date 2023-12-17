const appertement = require("../models/appertement");
const payment=require("../models/payment")

class Payments{

  static async createPayments(req,res){

    try{
      const { id } = req.body;
      console.log(id)
      const currentDate = new Date();
      const month = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();

      const createPayment=new payment(
        {
          appartement:id,
          month:month,
          year:year
        }
      )
      if(!createPayment || !id){
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
      // console.log(getAllAppertements)
      const currentDate = new Date();
      const month = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();
      const getAppertementPaye= await payment.find({
            month:month,
            year:year,
            isDeleted:false,
     }).populate("appartement");
        const paidAppartmentsIds = getAppertementPaye.map((payment) =>
        String(payment.appartement._id)
    );
    const paidsAppertement=getAllAppertements.filter((appertement)=>paidAppartmentsIds.includes(String(appertement._id)))
    const unpaidAppartments = getAllAppertements.filter(
        (appertement) => !paidAppartmentsIds.includes(String(appertement._id))
    );
            return res.status(200).json({paids:getAppertementPaye,unpaids:unpaidAppartments})
     }
    catch(e){
      console.log(e)
       return res.status(500).json("An error occurred")
    }
}
      static async generateFacturePaie(req,res){
                try {
                  const {id}=req.body
                  const OneAppartement= await appertement.find({_id:id})
                    
                } catch (error) {
                  console.log(error)
                  return res.status(500).json("An error occurred")
                }
      }
}
module.exports=Payments;