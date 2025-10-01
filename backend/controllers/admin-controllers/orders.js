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
