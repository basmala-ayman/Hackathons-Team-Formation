const userRepo =require("../repositories/user.repository.js");
const AppError =require( "../utils/AppError.js");

const createUserService = async (data) => {
  const existingUser = await userRepo.getUserByEmail(data.email);

  if (existingUser) {
    throw new AppError("User already exists", 400);
  }

  return userRepo.createUser(data);
};

module.exports=createUserService;