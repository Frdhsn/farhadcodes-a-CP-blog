// const db = require('../models/dbconnect');
// const StoryService = require('../services/storyServices');

// const Story = db.stories;

// const storyService = new StoryService(Story); // dependency injection

// exports.createStory = async (req, res, next) => {
//     // is it needed?
//     if (!req.body) {
//         res.status(400).send({
//             message: 'Content can not be empty!'
//         });
//         return;
//     }

//     try {
//         const story = await storyService.createStory(req, res);
//         // can be written as a utility function
//         return res.status(201).json({
//             status: 'success',
//             message: 'Story created successfully',
//             data: story
//         });
//     } catch (err) {
//         next(err);
//     }
// };

// exports.getAllStory = async (req, res, next) => {
//     try {
//         const stories = await storyService.getAllStory(req, res);
//         // can be written as a utility function
//         return res.status(200).json({
//             status: 'success',
//             message: 'Stories fetched.',
//             data: stories
//         });
//     } catch (err) {
//         next(err);
//     }
// };

// exports.getStory = async (req, res, next) => {
//     try {
//         const story = await storyService.getStory(req, res);
//         // can be written as a utility function
//         return res.status(200).json({
//             status: 'success',
//             message: 'Story fetched',
//             data: story
//         });
//     } catch (err) {
//         next(err);
//     }
// };

// exports.updateStory = (req, res) => {
//     storyService.updateStory(req, res);
// };

// exports.deleteStory = (req, res) => {
//     storyService.deleteStory(req, res);
// };
