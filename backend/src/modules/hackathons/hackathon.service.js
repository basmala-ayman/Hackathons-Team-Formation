const hachathonRepository = require('./hackathon.repository');
const AppError = require("../../utils/AppError");


const createHackathon = async (data , userId) => {
  hachathonRepository.createHackathon({
    ...data,
    createdBy: userId
  });

};

const getAllHackathons = async () => {
  return hachathonRepository.findAllHackathons();
}

const getHackathonById = async (id) => {
  const hackathon = await hachathonRepository.findHackathonById(id); 
  if (!hackathon) {
    throw new AppError('Hackathon not found', 404);
  }
  return hackathon;
}

const updateHackathon = async (id, data ,userId) => {
  const hackathon = await hachathonRepository.findHackathonById(id); 
  if (!hackathon) {
    throw new AppError('Hackathon not found', 404);
  }
  if (hackathon.createdBy !== userId) {
    throw new AppError('Unauthorized', 403);
  }
  return hachathonRepository.updateHackathon(id, data);
}


const deleteHackathon = async (id ,userId) => {
  const hackathon = await hachathonRepository.findHackathonById(id);
  if (!hackathon) {
    throw new AppError('Hackathon not found', 404);
  }
  if (hackathon.createdBy !== userId) {
    throw new AppError('Unauthorized', 403);
  }
  return hachathonRepository.deleteHackathon(id);
}

module.exports = {
  createHackathon,
  getAllHackathons,
  getHackathonById,
  updateHackathon,
  deleteHackathon
};   