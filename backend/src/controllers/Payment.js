
const payment=require("../models/payment")
class Payment{

  static createPayment(req,res){

        const {amount, idAppertement} =req.body
      try{
      const currentDate = new Date();
      const month = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();

      const createPayment=new payment(
        {
          amount:amount,
          appartement:idAppertement,
          month:month,
          year:year
        }
      )
      if(!createPayment){
       return res.status(404).json("Payment creation not completed.")
      }
      const savePayment=createPayment.save();
      return res.status(200).json({succss:"Payment Create successfully",data:savePayment})
      }catch(e){
        console.log(e)
       return res.status(500).json("An error occurred")
      }
  }
    
}
module.exports=Payment;