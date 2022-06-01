const users = require("../controllers/userController.js");
const express = require("express");
var router = express.Router();

// need to refactor

module.exports = (app) => {
  router.
    route("/")
    .post(users.createUser)
    .get(users.getAllUser);
  router
    .route("/:id")
    .get(users.getUser)
    .put(users.updateUser)
    .delete(users.deleteUser);
  app.use("/api/v1/users", router);
};
