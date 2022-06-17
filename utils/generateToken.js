const jwt = require('jsonwebtoken');

// exports.signToken = (email) => {
//   return jwt.sign({ email }, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRES_IN,
//   });
// };
exports.signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
