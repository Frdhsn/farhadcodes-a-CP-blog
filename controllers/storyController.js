const db = require("../models/dbconnect.js");
const StoryService = require("../services/storyServices.js");
const Story = db.stories;

const storyService = new StoryService(Story); // dependency injection

exports.createStory = (req, res) => {
  storyService.createStory(req, res);
};

exports.getAllStory = (req, res) => {
  storyService.getAllStory(req, res);
};

exports.getStory = (req, res) => {
  storyService.getStory(req, res);
};

exports.updateStory = (req, res) => {
  storyService.updateStory(req, res);
};

exports.deleteStory = (req, res) => {
  storyService.deleteStory(req, res);
};
