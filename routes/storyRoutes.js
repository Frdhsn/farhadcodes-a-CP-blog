const router = require('express').Router();
const stories = require('../controllers/storyController');

router.route('/').post(stories.createStory).get(stories.getAllStory);

router
    .route('/:id')
    .get(stories.getStory)
    .put(stories.updateStory)
    .delete(stories.deleteStory);

module.exports = router;
