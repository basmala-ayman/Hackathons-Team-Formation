import * as userRepo from "../repositories/userRepository.js";
import { AppError } from "../utils/AppError.js";

export const createUserService = async (data) => {
  const existingUser = await userRepo.getUserByEmail(data.email);

  if (existingUser) {
    throw new AppError("User already exists", 400);
  }

  return userRepo.createUser(data);
};