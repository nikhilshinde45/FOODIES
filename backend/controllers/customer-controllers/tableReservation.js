const { Table } = require("../../models/tableModel");
const { User } = require("../../models/userModel");
const { getCurrentDate } = require("../../utils/helperFunction");

const getAllTablesData = async (req, res) => {
  try {
    const privilege = req.privilege;

    if (privilege === "user") {
      const tables = await Table.find({});
      res.json({
        status: 200,
        message: "All tables are fetched",
        tables,
      });
    } else {
      res.json({
        status: 401,
        message: "Error fetching tables",
      });
    }
  } catch (error) {
    res.json({
      status: 500,
      message: "Internal server error",
    });
  }
};

const requestBooking = async (req, res) => {
  try {
    const privilege = req.privilege;
    if (privilege === "user") {
      const { id } = req.body; //table id
      const custId = req.id;

      //removes the previous booking if user have
      await User.findByIdAndUpdate(
        { _id: custId },
        {
          $set: { bookingId: "" },
        }
      );

      const request = {
        custId: req.id,
        name: req.name,
        username: req.username,
        reqStatus: "pending",
        reqTime: getCurrentDate(5),
      };
      const table = await Table.findByIdAndUpdate(
        { _id: id },
        {
          $push: { waitlist: request },
        }
      );

      if (table) {
        res.json({
          status: 200,
          message: "Reservation request added",
        });
      } else {
        res.json({
          status: 400,
          message: "Table Not Found",
        });
      }
    } else {
      res.json({
        status: 400,
        message: "Error in  Booking Table",
      });
    }
  } catch (error) {
    res.json({
      status: 500,
      message: "Internal server error",
    });
  }
};

module.exports = {
  getAllTablesData,
  requestBooking,
};
