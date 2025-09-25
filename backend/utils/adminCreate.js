const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const  {Admin}  = require("../models/adminModel.js");
const connectToDB = require("../configs/dbconfig.js");
require('dotenv').config({path:'../.env'}); 


async function addAdmin() {
 
  await connectToDB();

  const hashedPass = await bcrypt.hash(process.env.ADMIN_PASS, 10);

  const admin = new Admin({
    name: process.env.ADMIN_NAME,
    email: process.env.ADMIN_EMAIL,
    username: process.env.ADMIN_USERNAME,
    password: hashedPass,
    privilege: "admin",
    vfcode: "0",
  });

  await admin.save();
  console.log("Admin added successfully");

  // Disconnect after saving admin
  mongoose.disconnect();
}

addAdmin();
