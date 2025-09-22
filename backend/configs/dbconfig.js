const mongoose=require("mongoose");
const dotenv=require('dotenv');
dotenv.config();

const connectToDB=async()=>{
  try{
    await mongoose.connect(process.env.MONGO_URI);
    console.log("======MongoDB Connected======");

  }catch(error){
    console.log(error);
  }
}
module.exports=connectToDB;