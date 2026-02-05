const dotenv = require("dotenv");
dotenv.config();
const Razorpay = require("razorpay");


const razorpay = new Razorpay({
  key_id:process.env.RAZORPAY_KEY_ID,
  key_secret:process.env.RAZORPAY_KEY_SECRET
});


//CREATE PAYMENT ORDER
const createOrder = async(req,res)=>{
  try{
   const {amount} = req.body;

   const order = await razorpay.orders.create({
    amount:amount*100,
    currency:'INR',
    receipt:'foodies_receipt'
   });

   res.json({
     status :200,
     order,
     message:"Payment Order Created Successfully"
   });

  }catch(error){
    res.json({
       status:500,
       message:"Internal Server Error"
    });
  }
}

module.exports = {createOrder};