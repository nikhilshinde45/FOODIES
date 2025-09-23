const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
  id: {
    type: String,
    default: "",
  },
  username: {
    type: String,
    default: "",
  },
  privilege: {
    type: String,
    default: "",
  },
  timeStamp: {
    type: String,
    default: "",
  },
});

const Logs = mongoose.model("logs", logSchema, "logs");

module.exports = { Logs };

/*
Keep track of who did what and when.
  userid,
  username,
  privilege:admin,customer,chef,waiter
  timestamp:when action was performed

*/
