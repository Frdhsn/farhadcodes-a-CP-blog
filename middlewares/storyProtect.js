const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const Story = require('../models/storymodel');
const catchAsync = require('../utils/catchAsync');
const StoryService = require('../services/storyServices');
const AppError = require('../utils/AppError');

//const Story = db.stories;
const storyService = new StoryService(Story);

exports.Protect = catchAsync(async (req, res, next) => {
  //console.log(`story protect a asi`);
  //console.log(req.body);
  let token;
  //1) getting token and check of its there
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  //2) Verification

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET); // not have a clear idea how it works

  // for create a story
  if (req.body.authorID && decoded.id !== req.body.authorID) {
    return next(new AppError(`You don't have the permission`, 403));
  }
  if (req.params.id) {
    // for update and delete
    const storyData = await storyService.getAuthorIdByStoryId(req.params.id);
    if (!storyData) {
      return next(new AppError(`The story doesn't exist`, 401));
    }

    if (storyData.authorID != decoded.id) {
      return next(new AppError(`You don't have the permission`, 403));
    }
  }
  next();
});
