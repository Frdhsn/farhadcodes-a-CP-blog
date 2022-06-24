const db = require('../models/dbconnect');
const StoryService = require('../services/storyServices');
const catchAsync = require('../utils/catchAsync');
<<<<<<< HEAD
const AppError = require('../utils/appError');
=======
const AppError = require('../utils/AppError');
const contentNegotiate = require('../utils/sendResponse');
>>>>>>> dev

const Story = db.stories;

const storyService = new StoryService(Story);

exports.createStory = catchAsync(async (req, res, next) => {
  const story = await storyService.createStory(req.body);
<<<<<<< HEAD
  // can be written as a utility function
  return res.status(201).json({
    status: 'success',
    message: 'Story created successfully',
    data: story,
  });
=======

  contentNegotiate.sendResponse(req, res, 201, story, 'Story Created Successfully');
>>>>>>> dev
});

exports.getAllStory = catchAsync(async (req, res, next) => {
  const stories = await storyService.getAllStory();

<<<<<<< HEAD
  // can be written as a utility function
  return res.status(200).json({
    status: 'success',
    message: 'Stories fetched.',
    data: stories,
  });
=======
  contentNegotiate.sendResponse(req, res, 200, stories, 'Stories are fetched');
>>>>>>> dev
});

exports.getStory = catchAsync(async (req, res, next) => {
  const story = await storyService.getStory(req.params.id);
  if (!story) {
    return next(new AppError('No Story was found with that ID', 404));
  }
<<<<<<< HEAD
  return res.status(200).json({
    status: 'success',
    message: 'Story fetched',
    data: story,
  });
=======

  contentNegotiate.sendResponse(req, res, 200, story, 'Story is fetched');
>>>>>>> dev
});

exports.updateStory = catchAsync(async (req, res, next) => {
  const story = await storyService.updateStory(req.params.id, req.body);
<<<<<<< HEAD

  // if (Object.keys(story).length === 0) {
  //     return next(new AppError('No Story was found with that ID', 404));
  // }

  if (!story[0]) {
    return next(new AppError('No Story was found with that ID', 404));
  }
  return res.status(200).json({
    status: 'success',
    message: 'Story is Updated',
  });
=======
  if (!story[0]) {
    return next(new AppError('No Story was found with that ID', 404));
  }
  contentNegotiate.sendResponse(req, res, 200, {}, 'Story is Updated');
>>>>>>> dev
});

exports.deleteStory = catchAsync(async (req, res, next) => {
  const story = await storyService.deleteStory(req.params.id);

  if (!story) {
    return next(new AppError('No Story was found with that ID', 404));
  }
<<<<<<< HEAD

  return res.status(204).json({
    status: 'success',
    message: 'Story Deleted',
  });
=======
  return res.status(204).send();
>>>>>>> dev
});
