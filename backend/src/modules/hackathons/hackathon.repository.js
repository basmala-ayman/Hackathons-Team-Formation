const prisma = require("../../config/prisma");

const createHackathon = (data) => {
  return prisma.hackathon.create({ data });
};

const findAllHackathons = async () => {
  await prisma.hackathon.updateMany({
    where: {
      source: "USER_CREATED",
      status: { in: ["UPCOMING", "ONGOING"] },
      endDate: {
        lt: new Date()
      }
    },
    data: {
      status: "ENDED"
    }
  });

  return prisma.hackathon.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      tags: {
        include: {
          tag: true // This fetches the actual Tag details
        }
      }
    }
  });
};

const findHackathonById = async (id) => {
   await prisma.hackathon.updateMany({
    where: {
      id,
      status: { in: ["UPCOMING", "ONGOING"] },
      endDate: {
        lt: new Date()
      }
    },
    data: {
      status: "ENDED"
    }
  });

  return prisma.hackathon.findUnique({ where: { id } });
};

const updateHackathon = (id, data) => {
  return prisma.hackathon.update({ where: { id }, data });
};

const deleteHackathon = (id) => {
  return prisma.hackathon.delete({ where: { id } });
};

const getHackathonNames = async () => {
  return prisma.hackathon.findMany({
    select: {
      title: true
    }
  });
};

const findHackathonByTitle = async (title) => {
  return prisma.hackathon.findFirst({
    where: {
      title: {
        equals: title,
        mode: "insensitive"
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });
};

const findHackathonByDevpostId = async (devpostId) => {
  return prisma.hackathon.findUnique({
    where: { devpostId }
  });
};

module.exports = {
  createHackathon,
  findAllHackathons,
  findHackathonById,
  updateHackathon,
  deleteHackathon,
  getHackathonNames,
  findHackathonByTitle,
  findHackathonByDevpostId
};