const service = require('./hackathon.service');

const createHackathon = async (req, res, next) => {
  try {
    const hackathon = await service.createHackathon(req.body, req.user.userId);
    res.status(201).json({
      success: true,
      data: hackathon
    });
  } catch (error) {
    next(error);
  }
};

const getAllHackathons = async (req, res, next) => {
  try {
    const hackathons = await service.getAllHackathons();
    res.status(200).json({
      success: true,
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
      data: hackathon
    });
  } catch (error) {
    next(error);
  }
};

const updateHackathon = async (req, res, next) => {
  try {
    const hackathon = await service.updateHackathon(req.params.id, req.body, req.user.userId);
    res.status(200).json({
      success: true,
      data: hackathon
    });
  } catch (error) {
    next(error);
  }
};

const deleteHackathon = async (req, res, next) => {
  try {
    await service.deleteHackathon(req.params.id, req.user.userId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createHackathon,
  getAllHackathons,
  getHackathonById,
  updateHackathon,
  deleteHackathon
};