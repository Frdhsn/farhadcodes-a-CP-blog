const router = require('express').Router();
const stories = require('../controllers/storyController');
const authController = require('../controllers/authController');

router
  .route('/')
  .post(authController.protect, stories.createStory)
  .get(stories.getAllStory); // middleware

router
  .route('/:id')
  .get(stories.getStory)
  .put(authController.protect, stories.updateStory)
  .delete(authController.protect, stories.deleteStory);

module.exports = router;
