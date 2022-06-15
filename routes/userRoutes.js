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
  .put(users.updateUser)
  .delete(users.deleteUser);

module.exports = router;
