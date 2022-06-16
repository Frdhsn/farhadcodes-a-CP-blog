const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const db = require('../models/dbconnect');
const catchAsync = require('../utils/catchAsync');
const UserService = require('../services/userServices');
const AppError = require('../utils/AppError');

const User = db.users;
const userService = new UserService(User);

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await userService.createUser(req.body); // has security issue
  // console.log(newUser);
  // console.log(newUser.body);
  // console.log(newUser.body.id);

  const token = signToken(req.body.id);
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
  // console.log(user);

  if (!user || password !== user.password) {
    // improvised
    return next(new AppError(`Incorrect email or password!`, 401));
  }
  const token = signToken(req.body.id);
  res.status(200).json({
    status: 'success',
    token,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  console.log(req);
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  console.log(token);

  if (!token) {
    return next(
      new AppError(`You're not logged in! Please log in to get access.`, 401)
    );
  }
  //verification step
  //console.log(process.env.JWT_SECRET);

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET); // not have a clear idea how it works
  console.log('decoded: ' + decoded);
  console.log('decoded user: ' + decoded.user);
  console.log('id: ' + decoded.id);
  console.log('iat: ' + decoded.iat);

  //Check if user still exists
  const freshUser = await userService.getUser(decoded.id); // or

  console.log('freshUser = ' + freshUser);
  if (!freshUser) {
    return next(
      new AppError(`The user belonging to this token does no longer exist`, 401)
    );
  }
  next();
});
