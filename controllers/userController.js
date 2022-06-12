const db = require('../models/dbconnect');
const UserService = require('../services/userServices');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const globalErrorHandler = require('./errorController');

const User = db.users;

const userService = new UserService(User);

exports.createUser = catchAsync(async (req, res, next) => {
    const userData = await userService.createUser(req, res);
    return res.status(201).json({
        status: 'success',
        message: 'User created successfully',
        data: userData
    });
});
exports.getUser = catchAsync(async (req, res, next) => {
    const userData = await userService.getUser(req, res);
    if (Object.keys(userData).length === 0) {
        return next(new AppError('No user was found with that ID', 404));
    }
    return res.status(200).json({
        status: 'success',
        message: 'User fetched successfully',
        data: userData
    });
});
exports.getAllUser = catchAsync(async (req, res, next) => {
    const usersData = await userService.getAllUser(req, res);
    return res.status(200).json({
        status: 'success',
        message: 'Users fetched',
        data: usersData
    });
});
exports.updateUser = catchAsync(async (req, res, next) => {
    const userData = await userService.updateUser(req, res);

    if (!userData) {
        return next(new AppError('No user was found with that ID', 404));
    }
    return res.status(200).json({
        status: 'success',
        message: 'User is updated',
        data: userData
    });
});
exports.deleteUser = catchAsync(async (req, res, next) => {
    const userData = await userService.deleteUser(req, res);
    if (!userData) {
        return next(new AppError('No user was found with that ID', 404));
    }
    return res.status(204).json({
        status: 'success',
        message: 'User is deleted',
        data: userData
    });
});
