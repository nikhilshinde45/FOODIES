const express = require("express");
const { checkAuthorization } = require("../middlewares/checkAuthorization");
const waiterRouter = express.Router();
const {
  getServingTables,
} = require("../controllers/waiter-controllers/waiter");

//prefix endpoints : /waiter
//waiter functions

waiterRouter.get("/get-data", checkAuthorization, getServingTables);

module.exports = { waiterRouter };
