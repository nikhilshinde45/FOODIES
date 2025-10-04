const { KOT } = require("../../models/kotModel");
const { Menu } = require("../../models/menuModel");

const getMenu = async (req, res) => {
  try {
    const privilege = req.privilege;
    if (privilege == "user") {
      const menu = await Menu.find({});
      res.json({
        status: 200,
        message: "Menu getted",
        menu,
      });
    } else {
      res.json({
        status: 404,
        message: "Error getting menu",
      });
    }
  } catch (error) {
    res.json({
      status: 500,
      message: "Internal server error",
    });
  }
};

const putOrders = async (req, res) => {
  try {
    const privilege = req.privilege;
    if (privilege === "user") {
      const { orderList, total } = req.body;
      const custId = req.id;
      const kot = await KOT.findOneAndUpdate(
        { custId, billStatus: "pending" },
        {
          $inc: { totalPrice: total },
          $push: { items: { $each: orderList } },
        },
        {new:true}
      );
      if (kot) {
        res.json({
          status: 200,
          message: "Order Added Successfully",
          totalPrice: kot.totalPrice,
        });
      } else {
        res.json({
          status: 404,
          message: "KOT not found",
        });
      }
    } else {
      res.json({
        status: 400,
        message: "Error placing orders",
      });
    }
  } catch (error) {
    console.log(error);

    res.json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  getMenu,
  putOrders,
};
