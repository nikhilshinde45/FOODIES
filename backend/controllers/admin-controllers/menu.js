const { Menu } = require("../../models/menuModel");

const getMenuItem = async (req, res) => {
  try {
    const privilege = req.privilege;
    if (privilege === "admin") {
      const data = await Menu.find({});
      res.json({
        statu: 200,
        message: "Here is all menu items",
        data,
      });
    } else {
      res.json({
        status: 401,
        message: "Error fetching menu items",
      });
    }
  } catch (error) {
    res.json({
      status: 500,
      message: "Internal server error",
    });
  }
};
const addMenuItem = async (req, res) => {
  try {
    const privilege = req.privilege;
    if (privilege === "admin") {
      const { name, price, category, type } = req.body;
      const menu = new Menu({
        itemName: name,
        price,
        category,
        type,
      });
      await menu.save();
      res.json({
        status: 200,
        message: "Item added successfully",
      });
    } else {
      res.json({
        status: 401,
        message: "Error adding menu item",
      });
    }
  } catch (error) {
    res.json({
      status: 500,
      message: "Internal sever error",
    });
  }
};

const updateMenuItem = async (req, res) => {
  try {
    const privilege = req.privilege;
    if (privilege === "admin") {
      const { id, name, price, category, type } = req.body;

      const menu = await Menu.findByIdAndUpdate(
        { _id: id },
        {
          itemName: name,
          price,
          category,
          type,
        }
      );

      if (menu) {
        res.json({
          status: 200,
          message: "Menu item updated successfully",
        });
      } else {
        res.json({
          status: 404,
          message: "Menu item not found",
        });
      }
    } else {
      res.json({
        status: 401,
        message: "Error updating menu item",
      });
    }
  } catch (error) {
    res.json({
      status: 500,
      message: "Internal server error",
    });
  }
};

const removeMenuItem = async (req, res) => {
  try {
    const privilege = req.privilege;
    if (privilege === "admin") {
      const id = req.params.id;
      const menu = await Menu.findByIdAndDelete({ _id: id });
      if (menu) {
        res.json({
          status: 200,
          message: "Menu item removed successfully",
        });
      } else {
        res.json({
          status: 404,
          message: "Menu item not found",
        });
      }
    } else {
      res.json({
        status: 401,
        message: "Error removing menu item ",
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
  getMenuItem,
  updateMenuItem,
  addMenuItem,
  removeMenuItem,
};
