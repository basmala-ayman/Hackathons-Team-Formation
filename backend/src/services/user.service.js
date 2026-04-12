const userRepository = require("../repositories/user.repository");

exports.getAllUsers = async () => {
  return await userRepository.getAll();
};

exports.createUser = async (data) => {
  return await userRepository.create(data);
};