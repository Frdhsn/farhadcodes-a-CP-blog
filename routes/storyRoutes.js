const stories = require("../controllers/storyController.js");
var router = require("express").Router();

// need to refactor
exports.storyrouter = () => {
  router
  .route("/")
  .post(stories.createStory)
  .get(stories.getAllStory);
  
  router
  .route("/:id")
  .get(stories.getStory)
  .put(stories.updateStory)
  .delete(stories.deleteStory);
};
