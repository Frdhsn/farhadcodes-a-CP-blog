const users = require("../controllers/userController.js");
const express = require("express");
var router = express.Router();

// need to refactor

exports.userrouter = () => {
  router.
    route("/")
    .post(users.createUser)
    .get(users.getAllUser);
  router
    .route("/:id")
    .get(users.getUser)
    .put(users.updateUser)
    .delete(users.deleteUser);
};
