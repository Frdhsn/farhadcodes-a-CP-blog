const User = require('../models/usermodel');
const catchAsync = require('../utils/catchAsync');
const UserService = require('../services/userServices');
const AppError = require('../utils/AppError');
const bcrypt = require('bcrypt');
const { signToken } = require('../utils/generateToken');
//const User = db.users;
const userService = new UserService(User);

exports.signup = catchAsync(async (req, res) => {
  // password hash
  //req.body.password = await bcrypt.hash(req.body.password, 10);
  const newUser = await userService.createUser(req.body); // has security issue

  const token = signToken(newUser.id);
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

  const token = signToken(user.id);
  res.status(200).json({
    status: 'success',
    token,
  });
});
