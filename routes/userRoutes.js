const express = require('express');

const users = require('../controllers/userController');

const router = express.Router();

// need to refactor

router.route('/').post(users.createUser).get(users.getAllUser);
router
    .route('/:id')
    .get(users.getUser)
    .put(users.updateUser)
    .delete(users.deleteUser);

module.exports = router;
