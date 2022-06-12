const db = require('../models/dbconnect');
const StoryService = require('../services/storyServices');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const globalErrorHandler = require('./errorController');

const Story = db.stories;

const storyService = new StoryService(Story); // dependency injection

exports.createStory = catchAsync(async (req, res, next) => {
    const story = await storyService.createStory(req, res);
    // can be written as a utility function
    return res.status(201).json({
        status: 'success',
        message: 'Story created successfully',
        data: story
    });
});

exports.getAllStory = catchAsync(async (req, res, next) => {
    const stories = await storyService.getAllStory(req, res);

    // can be written as a utility function
    return res.status(200).json({
        status: 'success',
        message: 'Stories fetched.',
        data: stories
    });
});

exports.getStory = catchAsync(async (req, res, next) => {
    const story = await storyService.getStory(req, res);
    if (Object.keys(story).length === 0) {
        return next(new AppError('No Story was found with that ID', 404));
    }
    return res.status(200).json({
        status: 'success',
        message: 'Story fetched',
        data: story
    });
});

exports.updateStory = catchAsync(async (req, res, next) => {
    const story = await storyService.updateStory(req, res);

    if (Object.keys(story).length === 0) {
        return next(new AppError('No Story was found with that ID', 404));
    }
    return res.status(200).json({
        status: 'success',
        message: 'Story Updated'
    });
});

exports.deleteStory = catchAsync(async (req, res, next) => {
    const story = await storyService.deleteStory(req, res);

    if (!story) {
        return next(new AppError('No Story was found with that ID', 404));
    }

    return res.status(204).json({
        status: 'success',
        message: 'Story Deleted'
    });
});
