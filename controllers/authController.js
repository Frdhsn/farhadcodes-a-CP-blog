const User = require('../models/usermodel');
const catchAsync = require('../utils/catchAsync');
const UserService = require('../services/userServices');
const AppError = require('../utils/AppError');
const bcrypt = require('bcrypt');
const { signToken } = require('../utils/generateToken');
const contentNegotiate = require('../utils/sendResponse');
//const User = db.users;
const userService = new UserService(User);

exports.signup = catchAsync(async (req, res) => {
  console.log(`signup a ashchi`);
  // password hash
  //req.body.password = await bcrypt.hash(req.body.password, 10);
  const user = await userService.createUser(req.body); // has security issue

  const token = signToken(user.id);

  // const userData = {
  //   email,
  //   token,
  // };
  // res.status(201).json({
  //   status: 'success',
  //   token,
  //   data: {
  //     user: user,
  //   },
  // });
  const userData = {
    user,
    token,
  };
  contentNegotiate.sendResponse(req, res, 200, userData, 'Sigup Successfull');
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError(`Please provide email and password!`, 400));
  }
  const user = await userService.getUserbyEmail(email);

  if (!user) {
    return next(new AppError(`Incorrect email or password!`, 401));
  }
  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return next(new AppError(`Incorrect email or password!`, 401));
  }

  const token = signToken(user.id);
  const userData = {
    user,
    token,
  };
  contentNegotiate.sendResponse(req, res, 200, userData, 'Login Successfull');
  // return res.status(200).json({
  //   status: 'success',
  //   token,
  // });
});
