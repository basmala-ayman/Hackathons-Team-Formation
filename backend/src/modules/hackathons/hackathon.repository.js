const prisma = require("../../config/prisma");



const findAllHackathons = () => {
  return prisma.hackathon.findMany({
    include: {
      tags: {
        include: {
          tag: true,
        },
      },
    },
  });
};

const findHackathonById = (id) => {
  return prisma.hackathon.findUnique({
    where: { id },
    include: {
      tags: {
        include: {
          tag: true,
        },
      },
    },
  });
};


// // Create
// const createHackathon = (data) => {
//   return prisma.hackathon.create({
//     data,
//   });
// };



// // Update
// const updateHackathon = (id, data) => {
//   return prisma.hackathon.update({
//     where: { id },
//     data,
//   });
// };

// // Delete
// const deleteHackathon = (id) => {
//   return prisma.hackathon.delete({
//     where: { id },
//   });
// };

// // Add Tags
// const addTagsToHackathon = async (hackathonId, tagIds) => {
//   const data = tagIds.map(tagId => ({
//     hackathonId,
//     tagId,
//   }));

//   return prisma.hackathonTag.createMany({ data });
// };

// // Replace Tags
// const replaceTags = async (hackathonId, tagIds) => {
//   await prisma.hackathonTag.deleteMany({
//     where: { hackathonId },
//   });

//   const data = tagIds.map(tagId => ({
//     hackathonId,
//     tagId,
//   }));

//   return prisma.hackathonTag.createMany({ data });
// };

module.exports = {
  findAllHackathons,
  findHackathonById,
  // createHackathon,
  // updateHackathon,
  // deleteHackathon,
  // addTagsToHackathon,
  // replaceTags,
};