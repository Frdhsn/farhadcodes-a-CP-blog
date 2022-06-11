const db = require('../models/dbconnect');
const StoryService = require('../services/storyServices');

const Story = db.stories;

const storyService = new StoryService(Story); // dependency injection

exports.createStory = async (req, res, next) => {
    try {
        const story = await storyService.createStory(req, res);
        // can be written as a utility function
        return res.status(201).json({
            status: 'success',
            message: 'Story created successfully',
            data: story
        });
    } catch (err) {
        next(err);
    }
};

exports.getAllStory = async (req, res, next) => {
    try {
        const stories = await storyService.getAllStory(req, res);
        // can be written as a utility function
        return res.status(200).json({
            status: 'success',
            message: 'Stories fetched.',
            data: stories
        });
    } catch (err) {
        next(err);
    }
};

exports.getStory = async (req, res, next) => {
    try {
        const story = await storyService.getStory(req, res);
        // can be written as a utility function
        return res.status(200).json({
            status: 'success',
            message: 'Story fetched',
            data: story
        });
    } catch (err) {
        next(err);
    }
};

exports.updateStory = async (req, res, next) => {
    try {
        await storyService.updateStory(req, res);
        // can be written as a utility function
        return res.status(200).json({
            status: 'success',
            message: 'Story Updated'
        });
    } catch (err) {
        next(err);
    }
};

exports.deleteStory = async (req, res, next) => {
    try {
        await storyService.deleteStory(req, res);
        // can be written as a utility function
        return res.status(204).json({
            status: 'success',
            message: 'Story Deleted'
        });
    } catch (err) {
        next(err);
    }
};
