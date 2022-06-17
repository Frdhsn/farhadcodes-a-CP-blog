const db = require('../models/dbconnect');
const catchAsync = require('../utils/catchAsync');
const UserService = require('../services/userServices');
const AppError = require('../utils/AppError');

const User = db.users;
const userService = new UserService(User);

exports.isAuthorized = catchAsync(async (req, res, next) => {
  const user = await userService.getUser(req.params.id);
  if (!user) {
    return next(new AppError('No user was found with that ID', 404));
  }
  if (user.name !== req.user.name) {
    return next(new AppError(`You don't have the permission`, 403));
  }
  next();
});
