const express = require('express');
const users = require('../controllers/userController');
const authController = require('../controllers/authController');
const userMiddleware = require('../middlewares/userProtect');

const router = express.Router();

router.route('/signup').post(authController.signup);
router.route('/login').post(authController.login);

router.route('/').get(users.getAllUser);
router
  .route('/:id')
  .get(users.getUser)
  .put(userMiddleware.Protect, userMiddleware.isAuthorized, users.updateUser)
  .delete(userMiddleware.Protect, userMiddleware.isAuthorized, users.deleteUser);

module.exports = router;
