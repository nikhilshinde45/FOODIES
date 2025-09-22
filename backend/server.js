const express=require("express");
const cors=require("cors");
const connecToDB=require("./configs/dbconfig.js");
const dotenv=require("dotenv");
const cookieParser=require("cookie-parser")

dotenv.config();
const app =express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const corsOptions={
  origin:`http://localhost:5173`,
  credentials:true,
}
app.use(cors(corsOptions));
app.get("/",(req,res)=>{
  return res.status(200).json({
    message:"I am coming from backend",
    success:true,
  });
});
const PORT=process.env.PORT||3000;

app.listen(PORT,()=>{
 connecToDB();
  console.log(`Server is runnig at http://localhost:${PORT}`);
});
