const { Feedback } = require("../../models/feedbackModel");

const getFeedback = async (req, res) => {
  try {
    const privilege = req.privilege;
    if (privilege === "admin") {
      const feedback = await Feedback.find({}).Sort({ _id: -1 });
      res.json({
        status: 200,
        message: "Fetched Feedbacks Successfully",
        feedback
      });
    } else {
      res.json({
        status: 401,
        message: "Error Feching Feedbacks",
      });
    }
  } catch (error) {
    res.json({
      status: 500,
      message: "Internal server error",
    });
  }
};

const removeFeedbacks = async (req, res) => {
  try {
    const privilege = req.privilege;
    if (privilege === "admin") {
      const id = req.params.id;
      const feedbacks = await Feedback.findByIdAndDelete({ _id: id });
      if (feedbacks) {
        res.json({
          status: 200,
          message: "Feedback Removed Successfully",
        });
      } else {
        res.json({
          status: 404,
          message: "Feedback Not Found",
        });
      }
    } else {
      res.json({
        status: 401,
        message: "Error  deleting feedbacks",
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
  getFeedback,
  removeFeedbacks,
};
