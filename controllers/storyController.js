const db = require('../models/dbconnect');
const StoryService = require('../services/storyServices');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const Story = db.stories;

const storyService = new StoryService(Story);

exports.createStory = catchAsync(async (req, res, next) => {
  const story = await storyService.createStory(req.body);
  // can be written as a utility function
  return res.status(201).json({
    status: 'success',
    message: 'Story created successfully',
    data: story,
  });
});

exports.getAllStory = catchAsync(async (req, res, next) => {
  const stories = await storyService.getAllStory();

  // can be written as a utility function
  return res.status(200).json({
    status: 'success',
    message: 'Stories fetched.',
    data: stories,
  });
});

exports.getStory = catchAsync(async (req, res, next) => {
  const story = await storyService.getStory(req.params.id);
  if (!story) {
    return next(new AppError('No Story was found with that ID', 404));
  }
  return res.status(200).json({
    status: 'success',
    message: 'Story fetched',
    data: story,
  });
});

exports.updateStory = catchAsync(async (req, res, next) => {
  const story = await storyService.updateStory(req.params.id, req.body);

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
});

exports.deleteStory = catchAsync(async (req, res, next) => {
  const story = await storyService.deleteStory(req.params.id);

  if (!story) {
    return next(new AppError('No Story was found with that ID', 404));
  }

  return res.status(204).json({
    status: 'success',
    message: 'Story Deleted',
  });
});
