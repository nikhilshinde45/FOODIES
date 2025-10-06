const express = require("express");
const cors = require("cors");
const connecToDB = require("./configs/dbconfig.js");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const { userRouter } = require("./routes/userRoute.js");
const { staffRouter } = require("./routes/staffRoutes.js");
const { adminRouter } = require("./routes/adminRoutes.js");
const { customerRouter } = require("./routes/customerRoutes.js");
const { chefRouter } = require("./routes/chefRoutes.js");
const { waiterRouter } = require("./routes/waiterRoutes.js");

dotenv.config();
const app = express();
//middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: `https://foodies-hotel.onrender.com`,
  credentials: true,
};
app.use(cors(corsOptions));


app.use("/user", userRouter); //user authentication routes
app.use("/staff", staffRouter); //staff authentication routes
app.use("/admin", adminRouter); //router for all admin functions
app.use("/customer", customerRouter); //router for all user functions
app.use("/chef", chefRouter); //router for all chef functions
app.use("/waiter", waiterRouter); //router for all waiter functions

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  connecToDB();
  console.log(`Server is runnig at http://localhost:${PORT}`);
});
