const db = require("../models/dbconnect");
const UserService = require("../services/userServices.js");
const user = db.users;

const userService = new UserService(user);

exports.createUser = (req, res) => {
  userService.createUser(req, res);
};
exports.getUser = (req, res) => {
  userService.getUser(req, res);
};
exports.getAllUser = (req, res) => {
  userService.getAllUser(req, res);
};
exports.updateUser = (req, res) => {
  userService.updateUser(req, res);
};
exports.deleteUser = (req, res) => {
  userService.deleteUser(req, res);
};
