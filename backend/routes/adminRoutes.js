const express = require("express");
const adminRouter = express.Router();

const { checkAuthorization } = require("../middlewares/checkAuthorization");
const {
  getDashboardData,
} = require("../controllers/admin-controllers/dashboard");
const {
  getCustomers,
  updateCustomer,
  removeCustomer,
} = require("../controllers/admin-controllers/customers");

const {
  getChefs,
  addChef,
  getKDSdata,
  removeChef,
} = require("../controllers/admin-controllers/kitchen");

const {
  getWaiterList,
  addWaiter,
  assignWaiter,
  freeAllWaiters,
  removeWaiter,
} = require("../controllers/admin-controllers/waiters");

const {
  getcurrentKOTs,
  getOrderHistory,
  approveOrder,
  rejectOrder,
  markBillPaaid,
  removeHistoryItem,
  clearHistory,
} = require("../controllers/admin-controllers/orders");

const {
  getBookingRequests,
  getCurrentBookings,
  approveRequest,
  rejectRequest,
  freeTable,
} = require("../controllers/admin-controllers/reservation");
const { getRevenueData } = require("../controllers/admin-controllers/revenue");
const {
  getMenuItem,
  addMenuItem,
  updateMenuItem,
  removeMenuItem,
} = require("../controllers/admin-controllers/menu");
const {
  getTablesData,
  addTable,
  updateTable,
  removeTable,
} = require("../controllers/admin-controllers/tables");
const {
  getFeedback,
  removeFeedbacks,
} = require("../controllers/admin-controllers/feedback");
const { getLogs } = require("../controllers/admin-controllers/logs");

//endpoint prefix : /admin

//dashboard functions

adminRouter.get("/dashboard", checkAuthorization, getDashboardData);

//customer functions
adminRouter.get("/customers", checkAuthorization, getCustomers);
adminRouter.put("/customers", checkAuthorization, updateCustomer);
adminRouter.delete("/customer/:id", checkAuthorization, removeCustomer);

//checf functions
adminRouter.get("/kitchen/chefs", checkAuthorization, getChefs);
adminRouter.post("/kitchen", checkAuthorization, addChef);
adminRouter.get("/kitchen/kds-data", checkAuthorization, getKDSdata);
adminRouter.delete("/kitchen/:id", checkAuthorization, removeChef);

//waiter functions
adminRouter.get("/waiters", checkAuthorization, getWaiterList);
adminRouter.post("/waiters", checkAuthorization, addWaiter);
adminRouter.put("/waiters/assign", checkAuthorization, assignWaiter);
adminRouter.put("/waiters/free-all", checkAuthorization, freeAllWaiters);
adminRouter.delete("/waiters/:id", checkAuthorization, removeWaiter);

//order functions
adminRouter.get("/orders/current-bills", checkAuthorization, getcurrentKOTs);
adminRouter.get("/orders/order-history", checkAuthorization, getOrderHistory);
adminRouter.put("/orders/approve", checkAuthorization, approveOrder);
adminRouter.put("/orders/reject", checkAuthorization, rejectOrder);
adminRouter.put("/orders/mark-paid", checkAuthorization, markBillPaaid);
adminRouter.delete("/orders/remove-item/:id", checkAuthorization,removeHistoryItem);
adminRouter.delete("/orders/clear-all", checkAuthorization, clearHistory);

//reservation functions
adminRouter.get("/reservation/requests",checkAuthorization,getBookingRequests);
adminRouter.get( "/reservation/current-bookings",checkAuthorization,getCurrentBookings);
adminRouter.put("/reservation/approve-request",checkAuthorization,approveRequest);
adminRouter.put("/reservation/reject-request",checkAuthorization,rejectRequest);
adminRouter.put("/reservation/free-table", checkAuthorization, freeTable);

//revenue functions
adminRouter.get("/revenue", checkAuthorization, getRevenueData);

//menu function
adminRouter.get("/menu", checkAuthorization, getMenuItem);
adminRouter.post("/menu", checkAuthorization, addMenuItem);
adminRouter.put("/menu", checkAuthorization, updateMenuItem);
adminRouter.delete("/menu/:id", checkAuthorization, removeMenuItem);

//table functions
adminRouter.get("/tables", checkAuthorization, getTablesData);
adminRouter.post("/tables", checkAuthorization, addTable);
adminRouter.put("/tables", checkAuthorization, updateTable);
adminRouter.delete("/tables/:id", checkAuthorization, removeTable);

//feedback function
adminRouter.get("/feedback", checkAuthorization, getFeedback);
adminRouter.delete("/feedback/:id", checkAuthorization, removeFeedbacks);

//logs functions
adminRouter.get("/logs", checkAuthorization, getLogs);

module.exports = {
  adminRouter,
};
