const db = require('../models/dbconnect');
const UserService = require('../services/userServices');

const User = db.users;

const userService = new UserService(User);

exports.createUser = async (req, res, next) => {
    try {
        const userData = await userService.createUser(req, res);
        return res.status(201).json({
            status: 'success',
            message: 'User created successfully',
            data: userData
        });
    } catch (err) {
        next(err);
    }
};
exports.getUser = async (req, res, next) => {
    try {
        const userData = await userService.getUser(req, res);
        return res.status(200).json({
            status: 'success',
            message: 'User fetched successfully',
            data: userData
        });
    } catch (err) {
        next(err);
    }
};
exports.getAllUser = async (req, res, next) => {
    try {
        const usersData = await userService.getAllUser(req, res);
        return res.status(200).json({
            status: 'success',
            message: 'Users fetched',
            data: usersData
        });
    } catch (err) {
        next(err);
    }
};
exports.updateUser = async (req, res, next) => {
    try {
        const userData = await userService.updateUser(req, res);
        return res.status(200).json({
            status: 'success',
            message: 'User is updated',
            data: userData
        });
    } catch (err) {
        next(err);
    }
};
exports.deleteUser = async (req, res, next) => {
    try {
        const userData = await userService.deleteUser(req, res);
        return res.status(204).json({
            status: 'success',
            message: 'User is delete',
            data: userData
        });
    } catch (err) {
        next(err);
    }
};
