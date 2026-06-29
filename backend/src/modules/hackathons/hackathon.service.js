const hackathonRepository = require('./hackathon.repository');
const AppError = require("../../utils/AppError");

const createHackathon = async (data, userId) => {
  const { tags, ...hackathonData } = data;

  return await hackathonRepository.createHackathon({
    ...hackathonData,
    source: "USER_CREATED",
    createdBy: userId,
    remainingTime: hackathonData.remainingTime || "Active",

    tags: tags
      ? {
          create: tags.map((name) => ({
            tag: {
              connectOrCreate: {
                where: { name },
                create: { name },
              },
            },
          })),
        }
      : undefined,
  });
};

const getAllHackathons = async () => {
  const hackathons = await hackathonRepository.findAllHackathons();

  return hackathons.map(h => ({
    ...h,
    tags: h.tags?.map(t => t.tag.name) || [],
    userCreated: h.source === "USER_CREATED"
  }));
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

const getHackathonNames = async () => {
  const hackathons = await hackathonRepository.getHackathonNames();

  return hackathons.map(hackathon => hackathon.title);
};

const getHackathonByDevpostId = async (devpostId) => {
  const hackathon = await hackathonRepository.findHackathonByDevpostId(devpostId);

  if (!hackathon) throw new AppError('Hackathon not found', 404);

  return hackathon;
};

module.exports = {
  createHackathon,
  getAllHackathons,
  getHackathonById,
  updateHackathon,
  deleteHackathon,
  getHackathonNames,
  getHackathonByDevpostId
};