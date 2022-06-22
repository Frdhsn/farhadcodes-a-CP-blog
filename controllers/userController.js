const db = require('../models/dbconnect');
const UserService = require('../services/userServices');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const contentNegotiate = require('../utils/sendResponse');

const User = db.users;

const userService = new UserService(User);

exports.getUser = catchAsync(async (req, res, next) => {
  const userData = await userService.getUser(req.params.id);
  if (!userData) {
    return next(new AppError('No user was found with that ID', 404));
  }
  contentNegotiate.sendResponse(req, res, 200, userData, 'User Fetched Successfully!');
});
exports.getAllUser = catchAsync(async (req, res, next) => {
  const usersData = await userService.getAllUser();
  contentNegotiate.sendResponse(req, res, 200, usersData, 'Users Fetched Successfully!');
});
exports.updateUser = catchAsync(async (req, res, next) => {
  const userData = await userService.updateUser(req.params.id, req.body);

  if (!userData[0]) {
    return next(new AppError('No user was found with that ID', 404));
  }
  contentNegotiate.sendResponse(req, res, 200, {}, 'User is Updated!');
});
exports.deleteUser = catchAsync(async (req, res, next) => {
  const userData = await userService.deleteUser(req.params.id);
  if (!userData) {
    return next(new AppError('No user was found with that ID', 404));
  }
  return res.status(204).send();
});
