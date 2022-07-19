//const db = require('../models/dbconnect');
const Story = require('../models/storymodel');
const StoryService = require('../services/storyServices');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const contentNegotiate = require('../utils/sendResponse');

const storyService = new StoryService(Story);

exports.createStory = catchAsync(async (req, res, next) => {
  //console.log(`create story a asi`);
  //console.log(req.body);
  const story = await storyService.createStory(req.body);

  //const data = await this.storyTable.findOne({ where: { id } });
  //console.log(`create story a asi service er por`);
  contentNegotiate.sendResponse(req, res, 201, story, 'Story Created Successfully');
});

exports.getAllStory = catchAsync(async (req, res, next) => {
  const stories = await storyService.getAllStory();

  contentNegotiate.sendResponse(req, res, 200, stories, 'Stories are fetched');
});
exports.getAllStoryByAuthorID = catchAsync(async (req, res, next) => {
  //console.log(`controller a asi`);
  //console.log(req.params);
  //console.log(req.params.id);

  //console.log(`controller a asi: before calling service`);
  const stories = await storyService.getAllStoryByAuthorID(req.params.id);

  //console.log(`controller a asi: after`);
  contentNegotiate.sendResponse(req, res, 200, stories, 'Stories are fetched');
});

exports.getStory = catchAsync(async (req, res, next) => {
  const story = await storyService.getStory(req.params.id);
  if (!story) {
    return next(new AppError('No Story was found with that ID', 404));
  }

  contentNegotiate.sendResponse(req, res, 200, story, 'Story is fetched');
});

exports.updateStory = catchAsync(async (req, res, next) => {
  const story = await storyService.updateStory(req.params.id, req.body);
  if (!story[0]) {
    return next(new AppError('No Story was found with that ID', 404));
  }
  contentNegotiate.sendResponse(req, res, 200, {}, 'Story is Updated');
});

exports.deleteStory = catchAsync(async (req, res, next) => {
  const story = await storyService.deleteStory(req.params.id);

  if (!story) {
    return next(new AppError('No Story was found with that ID', 404));
  }
  contentNegotiate.sendResponse(req, res, 204, {}, 'Story is Deleted');
  //return res.status(204).send();
});

exports.storyService = storyService;
