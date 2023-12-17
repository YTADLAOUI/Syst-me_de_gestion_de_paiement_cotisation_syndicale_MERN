const appertement = require("../models/appertement");
const payment=require("../models/payment")
const PDFDocument = require('pdfkit');
const fs = require('fs');

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
                  const {id}=req.params
                  console.log(id)
                  const OneAppartement= await appertement.find({_id:id})
                  const doc = new PDFDocument();
                          console.log(OneAppartement[0]._id)
                          // Set response headers
                          res.setHeader('Content-Type', 'application/pdf');
                          res.setHeader(
                            'Content-Disposition',
                            `attachment; filename=facture_${OneAppartement[0]._id}.pdf`
                          );

                          // Pipe the PDF to the response
                          doc.pipe(res, { end: true });

                          Payments.generateHeader(doc);
                          Payments.generateApartmentDetails(doc, OneAppartement);
                          Payments.generateTable(doc, OneAppartement);
                          doc.end();
                } catch (error) {
                  console.log(error)
                  return res.status(500).json("An error occurred")
                }
      }
     static generateHeader(doc){
        doc
          // .image('logo.png', 50, 45, { width: 50 })
          .fillColor('#444444')
          .fontSize(20)
          .text('SANDIC ', 110, 57)
          .fontSize(10)
          .text('YouCode', 200, 65, { align: 'right' })
          .text('YOUSSOFIA, Morocco', 200, 80, { align: 'right' })
          .moveDown();
      }
      
     static  generateApartmentDetails(doc, OneAppartement) {
        const today = new Date();
      
        doc
          .text(`Apartment Number: ${OneAppartement[0]._id}`, 50, 200)
          .text(`Apartment Building: ${OneAppartement[0].building}`, 50, 215)
          .text(`Date: ${today.toLocaleDateString()}`, 50, 230)
          .fontSize(15)
          .font('Helvetica-Bold')
          .text(`Owner: ${OneAppartement[0].owner}`, 300, 200)
          .text(`Floor: ${OneAppartement[0].floor}`, 300, 250)
          .text(`Address: ${OneAppartement[0].address}`, 300, 275)
          .text(`Owner Phone Number: ${OneAppartement[0].ownerPhoneNumber}`, 300, 300);
      
        doc.moveDown();
      }
      
        static generateTable(doc, OneAppartement) {
        const tableTop = 350;
      
        doc.font('Helvetica-Bold');
        doc.fontSize(12).text('Amount Paid', 50, tableTop);
        doc.text('Total', 300, tableTop);
      
        const payment = {
          amount: 100, 
        };
      
        doc.font('Helvetica');
        doc.fontSize(12).text(`${payment.amount}`, 50, tableTop + 25);
        doc.text('0', 200, tableTop + 25);
        doc.text(`${payment.amount}`, 300, tableTop + 25);
      }
      
}
module.exports=Payments;