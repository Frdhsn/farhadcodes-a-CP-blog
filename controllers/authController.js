const db = require("../models/dbconnect");

const User = db.users;

exports.signup = async (req, res, next) => {
  const newUser = await User.createUser(req.body);
  res.status(201).json({
    status: "succes",
    data: {
      user: newUser,
    },
  });
};
