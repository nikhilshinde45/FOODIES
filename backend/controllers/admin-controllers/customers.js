const { User } = require("../../models/userModel");

const getCustomers = async (req, res) => {
  try {
    const privilege = req.privilege;
    if (privilege === "admin") {
      //latest customer comes first
      const users = await User.find({}).sort({ _id: -1 });
      res.json({
        status: 200,
        message: "Got all customers",
        users,
      });
    } else {
      res.json({
        status: 401,
        message: "Error fetching customers",
      });
    }
  } catch (error) {
    res.json({
      status: 500,
      message: "Internal server error",
    });
  }
};

const updateCustomer = async (req, res) => {
  try {
    const privilege = req.privilege;
    if (privilege === "admin") {
      const { id, name, email, username } = req.body;
      const data = await User.findByIdAndUpdate(
        { _id: id },
        { name, email, username }
      );
      if (data) {
        res.json({
          status: 200,
          message: "Customer updated successfully",
        });
      } else {
        res.json({
          status: 404,
          message: "Customer not found",
        });
      }
    } else {
      res.json({
        status: 401,
        message: "Error updating customer",
      });
    }
  } catch (error) {
    res.json({
      status: 500,
      message: "Internal server error",
    });
  }
};

const removeCustomer = async (req, res) => {
  try {
    const privilege = req.privilege;
    if (privilege === "admin") {
      const id = req.params.id;
      const user = await User.findByIdAndDelete({ _id: id });
      if (user) {
        res.json({
          status: 200,
          message: "Customer removed succesfully",
        });
      } else {
        res.json({
          status: 404,
          message: "Customer not found",
        });
      }
    } else {
      res.json({
        status: 401,
        message: "Error removing customer",
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
  getCustomers,
  updateCustomer,
  removeCustomer,
};
