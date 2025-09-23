const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  custId : String,//who wrote the review
  review :String,//what content he/she wrote
  name : String,//name of cust whi wrote 
  dateTime :{
    type:String,
    default:''
  }
});

const Feedback = mongoose.model('feedback',feedbackSchema,'feedback');

module.exports = {Feedback};