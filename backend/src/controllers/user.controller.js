// const userService = require("../services/user.service");

// exports.getUsers = async (req, res) => {
//   try {
//     const users = await userService.getAllUsers();
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// exports.createUser = async (req, res) => {
//   try {
//     const user = await userService.createUser(req.body);
//     res.status(201).json(user);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

import * as userService from "../services/userService.js";

export const createUserController = async (req, res, next) => {
  try {
    const user = await userService.createUserService(req.body);

    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};