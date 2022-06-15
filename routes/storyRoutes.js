const router = require('express').Router();
const stories = require('../controllers/storyController');
const authController = require('../controllers/authController');

router.route('/').post(stories.createStory).get(stories.getAllStory); // middleware

router
  .route('/:id')
  .get(stories.getStory)
  .put(stories.updateStory)
  .delete(stories.deleteStory);

module.exports = router;
