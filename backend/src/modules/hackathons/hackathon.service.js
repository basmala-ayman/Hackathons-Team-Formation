const hackathonRepository = require('./hackathon.repository');
const AppError = require("../../utils/AppError");

const createHackathon = async (data, userId) => {
  return await hackathonRepository.createHackathon({
    ...data,
    source: "USER_CREATED",
    createdBy: userId,
    remainingTime: data.remainingTime || "Active" 
  });
};

const getAllHackathons = async () => {
  return await hackathonRepository.findAllHackathons();
};

const getHackathonById = async (id) => {
  const hackathon = await hackathonRepository.findHackathonById(id); 
  if (!hackathon) throw new AppError('Hackathon not found', 404);
  return hackathon;
};

const updateHackathon = async (id, data, userId) => {
  const hackathon = await hackathonRepository.findHackathonById(id); 
  if (!hackathon) throw new AppError('Hackathon not found', 404);
  if (hackathon.createdBy !== userId) throw new AppError('Unauthorized', 403);
  
  return await hackathonRepository.updateHackathon(id, data);
};

const deleteHackathon = async (id, userId) => {
  const hackathon = await hackathonRepository.findHackathonById(id);
  if (!hackathon) throw new AppError('Hackathon not found', 404);
  if (hackathon.createdBy !== userId) throw new AppError('Unauthorized', 403);
  
  return await hackathonRepository.deleteHackathon(id);
};

module.exports = {
  createHackathon,
  getAllHackathons,
  getHackathonById,
  updateHackathon,
  deleteHackathon
};