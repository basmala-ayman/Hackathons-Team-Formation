const User = require("../models/user.model");

exports.getAll = async () => {
  return await User.findAll();
};

exports.create = async (data) => {
  return await User.create(data);
};