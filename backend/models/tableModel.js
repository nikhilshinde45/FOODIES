const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema({
  tableNo: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: "free",
  },
  currentBooking: {
    type: Object,
    default: {},
  }, //Details of the customer who have currently booked the table
  bookingTime: {
    type: String,
    default: "",
  },
  waitlist: {
    type: Array,
    default: [],
  },
});
const Table = mongoose.model("tables", tableSchema, "tables");

module.exports = { Table };
/*
for currentBooking and waitlist,the object definition is
{
      custId,
      name,
      username,
      reqTime,
      reqStatus
}

*/
