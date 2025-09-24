const express = require('express');
const staffRouter = express.Router();

const {
  loginStaff,forgotPasswordStaff,resetPasswordStaff
} = require('../controllers/staffHandler');

const {logoutUser} = require('../controllers/userHandler');
const { checkAuthorization } = require('../middlewares/checkAuthorization');
const { userRouter } = require('./userRoute');

// endpoint prefix : /staff

staffRouter.post('/login',loginStaff);
staffRouter.put('/forgot-password',forgotPasswordStaff);
staffRouter.put('/reset-password',resetPasswordStaff);
staffRouter.post('/logout',checkAuthorization,logoutUser);

module.exports = {staffRouter};
