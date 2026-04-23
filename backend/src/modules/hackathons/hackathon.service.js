const hackathonRepository = require('./hackathon.repository');
const AppError = require("../../utils/AppError");

const getAllHackathons = async () => {
  return await hackathonRepository.findAllHackathons();
};

const getHackathonById = async (id) => {
  const hackathon = await hackathonRepository.findHackathonById(id);

  if (!hackathon) {
    throw new AppError("Hackathon not found", 404);
  }

  return hackathon;
};


// const createHackathon = async (data, userId) => {
//   const { tags, ...rest } = data;

//   const hackathon = await hackathonRepository.createHackathon({
//     ...rest,
//     createdBy: userId,
//   });

//   // handle tags
//   if (tags && tags.length > 0) {
//     await hackathonRepository.addTagsToHackathon(hackathon.id, tags);
//   }

//   return hackathon;
// };


// const updateHackathon = async (id, data, userId) => {
//   const hackathon = await hackathonRepository.findHackathonById(id);

//   if (!hackathon) {
//     throw new AppError("Hackathon not found", 404);
//   }

//   if (hackathon.createdBy !== userId) {
//     throw new AppError("Unauthorized", 403);
//   }

//   const { tags, ...rest } = data;

//   const updated = await hackathonRepository.updateHackathon(id, rest);

//   if (tags) {
//     await hackathonRepository.replaceTags(id, tags);
//   }

//   return updated;
// };

// const deleteHackathon = async (id, userId) => {
//   const hackathon = await hackathonRepository.findHackathonById(id);

//   if (!hackathon) {
//     throw new AppError("Hackathon not found", 404);
//   }

//   if (hackathon.createdBy !== userId) {
//     throw new AppError("Unauthorized", 403);
//   }

//   await hackathonRepository.deleteHackathon(id);

//   return;
// };

module.exports = {
  getAllHackathons,
  getHackathonById,
  // createHackathon,
  // updateHackathon,
  // deleteHackathon,
};