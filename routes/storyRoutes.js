const router = require('express').Router();
const stories = require('../controllers/storyController');
const storyMiddleware = require('../middlewares/storyProtect');
const userMiddleware = require('../middlewares/userProtect');
// story protection
router.route('/').post(userMiddleware.Protect, storyMiddleware.Protect, stories.createStory).get(stories.getAllStory);

router
  .route('/:id')
  .get(stories.getStory)
  .put(userMiddleware.Protect, storyMiddleware.Protect, stories.updateStory)
  .delete(userMiddleware.Protect, storyMiddleware.Protect, stories.deleteStory);

module.exports = router;
