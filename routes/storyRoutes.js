const stories = require("../controllers/storyController.js");
var router = require("express").Router();

// need to refactor
module.exports = app => {
  router
  .route("/")
  .post(stories.createStory)
  .get(stories.getAllStory);
  
  router
  .route("/:id")
  .get(stories.getStory)
  .put(stories.updateStory)
  .delete(stories.deleteStory);
  
  app.use("/api/v1/stories", router);
};
