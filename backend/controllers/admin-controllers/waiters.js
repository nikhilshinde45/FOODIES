const { Waiter } = require("../../models/waiterModel");
const { bcrypt } = require("bcryptjs");

const getWaiterList = async (req, res) => {
  try {
    const privilege = req.privilege;
    if (privilege === "admin") {
      const data = await Waiter.find({ priviliege: "waiter" });
      res.json({
        status: 200,
        message: "Here are all waiters",
        data,
      });
    } else {
      res.json({
        status: 401,
        message: "Error getting waiters data",
      });
    }
  } catch (error) {
    res.json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

const addWaiter = async (req, res) => {
  try {
    const privilege = req.privilege;
    if (privilege === "admin") {
      const { name, email, password, age, username } = req.body;
      const user = await Waiter.findOne({ username });
      if (!user) {
        const hashedpass = await bcrypt.hash(password, 10);
        const waiter = new Waiter({
          name,
          email,
          username,
          password: hashedpass,
          age,
        });
        await waiter.save();
        res.json({
          status: 200,
          message: "Waiter added successfully",
        });
      } else {
        res.json({
          status: 400,
          message: "Waiter with username already exist",
        });
      }
    } else {
      res.json({
        status: 401,
        message: "Error adding waiter",
      });
    }
  } catch (error) {
    res.json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

const removeWaiter = async (req, res) => {
  try {
    const privilege = req.privilege;
    if (privilege === "admin") {
      const id = req.params.id;
      const waiter = await Waiter.findByIdAndDelete({
        _id: id,
      });
      if (waiter) {
        res.json({
          status: 200,
          message: "Waiter Removed Successfully",
        });
      } else {
        res.json({
          status: 404,
          message: "Waiter not found",
        });
      }
    } else {
      res.json({
        status: 401,
        message: "Error in deleting Waiter",
      });
    }
  } catch (error) {
    res.json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

const assignWaiter = async (req, res) => {
  try {
    const privilege = req.privilege;
    if (privilege === "admin") {
      const { id, tableNo } = req.body;
      const waiter = await Waiter.findByIdAndUpdate(
        { _id: id },
        {
          $push: {
            servingTable: tableNo,
          },
        }
      );
      if (waiter) {
        res.json({
          status: 200,
          message: "Waiter assigned successfully",
        });
      } else {
        res.json({
          status: 400,
          message: "Waiter not found",
        });
      }
    } else {
      res.json({
        status: 401,
        message: "Error assigning waiter",
      });
    }
  } catch (error) {
    res.json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

const freeAllWaiters = async (req, res) => {
  try {
    const privilege = req.privilege;
    if (privilege === "admin") {
      const waiters = await Waiter.updateMany(
        { priviliege: "waiter" },
        { $set: { servingTable: [] } }
      );
      if (waiters) {
        res.json({
          status: 200,
          message: "All Waiters freed successfully",
        });
      } else {
        res.json({
          status: 404,
          message: "No waiters found",
        });
      }
    } else {
      res.json({
        status: 401,
        message: "Error freeing up waiters",
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
  getWaiterList,
  addWaiter,
  assignWaiter,
  freeAllWaiters,
  removeWaiter,
};
