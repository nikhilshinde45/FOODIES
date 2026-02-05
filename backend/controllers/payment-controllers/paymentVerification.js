const crypto = require("crypto");
const dotenv =require("dotenv");
dotenv.config();

const verifyPayment = async(req,res)=>{
   try{

     const {razorpay_order_id,razorpay_payment_id,razorpay_signature} = req.body;

     const body = razorpay_order_id + "|" + razorpay_payment_id;

     const expectedSignature = crypto
                               .createHmac("sha256",process.env.RAZORPAY_KEY_SECRET)
                               .update(body)
                               .digest("hex");

        if(expectedSignature===razorpay_signature){
             res.json({
               status:200,
               message:"Payment Verification Successfull"
             })
        }else{
            res.json({
               status:400,
               message:"Error In Payment Verification"
            });
        }



   }catch(error){
     res.json({
       status:500,
       message:"Payment Verification Failed"
     });
   }
}

module.exports = {verifyPayment};