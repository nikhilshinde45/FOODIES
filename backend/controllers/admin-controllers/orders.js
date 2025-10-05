const { KOT } = require("../../models/kotModel");
const { KDS } = require("../../models/kdsModel");
const { User } = require("../../models/userModel");

const getcurrentKOTs = async (req, res) => {
  try {
    const privilege = req.privilege;
    if (privilege === "admin") {
      const data = await KOT.find({ billStatus: "pending" });
      res.json({
        status: 200,
        message: "Here are current KOTs",
        data,
      });
    } else {
      res.json({
        status: 401,
        message: "Error getting current KOTs",
      });
    }
  } catch (error) {
    res.json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

const approveOrder = async (req, res) => {
  try {
    const privilege = req.privilege;
    if (privilege === "admin") {
      const { id, ind } = req.body;
      const kot = await KOT.findByIdAndUpdate(
        { _id: id },
        { $set: { [`items.${ind}.status`]: "preparing" } },
        {
          new: true,
        }
      );
      if (kot) {
        const currorder = kot.items[ind];
        const kds = await KDS.findOneAndUpdate(
          { tableNo: kot.tableNo, kotId: id },
          { $push: { items: currorder } },
          { upsert: true }
        );
        res.json({
          status: 200,
          message: "Order sent to kitchen",
        });
      } else {
        res.json({
          status: 404,
          message: "KOT not found",
        });
      }
    } else {
      res.json({
        status: 401,
        message: "Error in approving order",
      });
    }
  } catch (error) {
    res.json({
      status: 500,
      message: "INternal Server Error",
    });
  }
};

const rejectOrder = async (req, res) => {
  try {
    const privilege = req.privilege;
    if (privilege === "admin") {
      const { id, ind, price, qty } = req.body;
      await KOT.findByIdAndUpdate(
        { _id: id },
        //setting null to that item
        {
          $unset: { [`items.${ind}`]: 1 },
          //removing price of that item from totalprice
          $inc: { totalPrice: -1 * price * qty },
        }
      );
      const kot = await KOT.findByIdAndUpdate(
        { _id: id },
        { $pull: { items: null } },
        { new: true }
      );
      if (kot) {
        res.json({
          status: 200,
          message: "Order rejected successfully",
        });
      } else {
        res.json({
          status: 404,
          message: "KOT not found",
        });
      }
    } else {
      res.json({
        status: 401,
        message: "Error in rejecting order",
      });
    }
  } catch (error) {
    res.json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

//mark the bill as paid only after placinf the all order cuz kot is freed here
const markBillPaid = async (req, res) => {
  try {
    const privilege = req.privilege;
    if (privilege === "admin") {
      const { id } = req.body; //KOT ID
      const bill = await KOT.findByIdAndUpdate(
        { _id: id },
        { billStatus: "paid" },
        { new: true }
      );
      if (bill) {
        await User.findByIdAndUpdate(
          { _id: bill.custId },
          { $set: { bookingId: "" } }
        );
        res.json({
          status: 200,
          message: "Bill marked as paid",
        });
      } else {
        res.json({
          status: 404,
          message: "Bill not found",
        });
      }
    } else {
      res.json({
        status: 401,
        message: "Error in marking bill paid",
      });
    }
  } catch (error) {
    res.json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

const getOrderHistory = async (req, res) => {
  try {
    const privilege = req.privilege;
    if (privilege === "admin") {
      const data = await KOT.find({ billStatus: "paid" }).sort({ _id: -1 });
      res.json({
        status: 200,
        message: "Here are order history",
        data,
      });
    } else {
      res.json({
        status: 401,
        message: "Error fetching order history",
      });
    }
  } catch (error) {
    res.json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

const removeHistoryItem = async (req, res) => {
  try {
    const privilege = req.privilege;
    if (privilege === "admin") {
      const  id  = req.params.id;
      const data = await KOT.findByIdAndDelete(id);
      if (data) {
        res.json({
          status: 200,
          message: "Item removed successfully",
        });
      } else {
        res.json({
          status: 400,
          message: "Item not found",
        });
      }
    } else {
      res.json({
        status: 401,
        message: "Error removing history item",
      });
    }
  } catch (error) {}
};

const clearHistory = async (req, res) => {
  try {
    const privilege = req.privilege;
    if (privilege === "admin") {
      const history = await KOT.deleteMany({ billStatus: "paid" });
      if (history) {
        res.json({
          status: 200,
          message: "Bills history cleared",
        });
      } else {
        res.json({
          status: 404,
          message: "No bill history to clear",
        });
      }
    } else {
      res.json({
        status: 401,
        message: "Error clearing history",
      });
    }
  } catch (error) {
    res.json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  getcurrentKOTs,
  approveOrder,
  rejectOrder,
  markBillPaid,
  getOrderHistory,
  removeHistoryItem,
  clearHistory,
};
