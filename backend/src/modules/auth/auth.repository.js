//this layer is just to call the database and making instances on it and dealing with it only 

const prisma = require("../../config/prisma");

// 1. Find user by email
const findByEmail = async (email) => {

    return prisma.user.findUnique({
        where: { email },
    });
};

// 2. Create new user
const createUser = async (data) => {

    return prisma.user.create({
        data,
    });
};

// 3. Update user by id
//here i will need to update the user to make it verified
const updateUser = async (id, data) => {

    return prisma.user.update({
        where: { id },
        data,
    });
};

// 4. Find user by verification token
const findByVerificationToken = async (token) => {

    return prisma.user.findFirst({
        where: { verificationToken: token },
    });
};


// #18 create refresh token 
const createRefreshToken = (data) => {
    return prisma.refreshToken.create({ data });
}

// #18 find refresh token for checking
const findRefreshToken = (token) => {
    return prisma.refreshToken.findUnique({
        where: { token },
    });
};

// #18 faind refresh token for checking
const deleteRefreshToken = (id) => {
    return prisma.refreshToken.delete({
        where: { id },
    });
};

const findById = (id) => {
    return prisma.user.findUnique({
        where: { id },
    });
};

module.exports = {
    findByEmail,
    createUser,
    updateUser,
    findByVerificationToken,
    createRefreshToken,
    findRefreshToken,
    deleteRefreshToken,
    findById,
};