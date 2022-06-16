const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const db = require('../models/dbconnect');
const catchAsync = require('../utils/catchAsync');
const UserService = require('../services/userServices');
const AppError = require('../utils/AppError');
const bcrypt = require('bcrypt');
const { decode } = require('punycode');

const User = db.users;
const userService = new UserService(User);

const signToken = (email) => {
  return jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
exports.signup = catchAsync(async (req, res, next) => {
  // password hash
  req.body.password = await bcrypt.hash(req.body.password, 10);

  const newUser = await userService.createUser(req.body); // has security issue

  const token = signToken(newUser.email);
  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
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
  const token = signToken(req.body.email);
  res.status(200).json({
    status: 'success',
    token,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  //1) getting token and check of its there
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError(`You're not logged in! Please log in to get access.`, 401));
  }

  //2) Verification

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET); // not have a clear idea how it works

  //3) user still exists
  const freshUser = await userService.getUserbyEmail(decoded.email); // or

  console.log('freshUser = ' + freshUser);
  if (!freshUser) {
    return next(new AppError(`The user belonging to this token does no longer exist`, 401));
  }

  //4) check if user changed password after jwt was issued\
  req.user = freshUser;
  next();
});
