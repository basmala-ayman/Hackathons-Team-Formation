const prisma = require("../../config/prisma");

// CREATE
const createHackathon = (data) => {
  return prisma.hackathon.create({ data });
};

// GET ALL
const findAllHackathons = () => {
  return prisma.hackathon.findMany({
    where: {
      source: "SCRAPED",
    },
  });
};

// GET ONE by id
const findHackathonById = (id) => {
  // if (!id) throw new Error("Invalid id");
  // console.log("DEBUG ID:", id);

  return prisma.hackathon.findUnique({
    where: { id },
  });
};

//get hackathon knowing only its title
const findHackathonByTitle = (title) => {
  return prisma.hackathon.findUnique({
    where: { title },
  });
};

// UPDATE
const updateHackathon = (id, data) => {
  return prisma.hackathon.update({
    where: { id },
    data,
  });
};

// DELETE
const deleteHackathon = (id) => {
  return prisma.hackathon.delete({
    where: { id },
  });
};

module.exports = {
  createHackathon,
  findAllHackathons,
  findHackathonById,
  updateHackathon,
  deleteHackathon,
  findHackathonByTitle,
};