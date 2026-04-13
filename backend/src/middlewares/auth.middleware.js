// just a placeholder for now - will be implemented in issue #17
const AppError = require("../utils/AppError");

const protect = (req, res, next) => {
  // TODO: implement JWT verification in issue #17
  next();
};

module.exports = { protect };