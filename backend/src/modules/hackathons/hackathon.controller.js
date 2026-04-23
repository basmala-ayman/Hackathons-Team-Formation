const service = require('./hackathon.service');


const getAllHackathons = async (req, res, next) => {
  try {
    const hackathons = await service.getAllHackathons();

    res.status(200).json({
      success: true,
      message: "Hackathons fetched successfully",
      data: hackathons
    });

  } catch (error) {
    next(error);
  }
};

const getHackathonById = async (req, res, next) => {
  try {
    const hackathon = await service.getHackathonById(req.params.id);

    res.status(200).json({
      success: true,
      message: "Hackathon fetched successfully",
      data: hackathon
    });

  } catch (error) {
    next(error);
  }
};

// const createHackathon = async (req, res, next) => {
//   try {
//     const result = await service.createHackathon(req.body, req.user.id);

//     res.status(201).json({
//       success: true,
//       message: "Hackathon created successfully",
//       data: result,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// const updateHackathon = async (req, res, next) => {
//   try {
//     const result = await service.updateHackathon(
//       req.params.id,
//       req.body,
//       req.user.id
//     );

//     res.status(200).json({
//       success: true,
//       message: "Hackathon updated successfully",
//       data: result,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// const deleteHackathon = async (req, res, next) => {
//   try {
//     await service.deleteHackathon(req.params.id, req.user.id);

//     res.status(200).json({
//       success: true,
//       message: "Hackathon deleted successfully",
//       data: null,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

module.exports = {
  getAllHackathons,
  getHackathonById,
  // createHackathon,
  // updateHackathon,
  // deleteHackathon,
};