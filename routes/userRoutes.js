const express = require('express');
const users = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/signup').post(authController.signup);
router.route('/login').post(authController.login);

router.route('/').post(users.createUser).get(users.getAllUser);
router
  .route('/:id')
  .get(users.getUser)
  .put(authController.protect, authController.isAuthorized, users.updateUser)
  .delete(authController.protect, authController.isAuthorized, users.deleteUser);

module.exports = router;
