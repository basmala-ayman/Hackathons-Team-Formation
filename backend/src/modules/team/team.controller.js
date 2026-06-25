// src/modules/team/team.controller.js
const teamService = require("./team.service");

//this will be called when the user press on create a team button on the front end side 
//here i will not need to send the team back after creation to the front again just the status code 
const createTeam = async (req, res, next) => {
  try {
    const ownerId = req.user.userId; // this will be added after the request already passed in the protect middleware 
   const result= await teamService.createTeam(ownerId, req.body);
    res.status(201).json({
      success: true,
      message: "Team created successfully",
      data: result, // and the data here is the team id which is created 
    });
  } catch (err) {
    next(err);
  }
};


const getTeam = async (req, res, next) => {
  try {
    const { id } = req.params;
    const team = await teamService.getTeamById(id);
    res.status(200).json({ success: true, data: team });
  } catch (err) {
    next(err);
  }
};

// const getTeam = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const team = await teamService.getTeamById(id);
//     res.status(200).json({
//       success: true,
//       data: team,
//     });
//   } catch (err) {
//     next(err);
//   }
// };

const respondToInvitation = async (req, res, next) => {
  try {
    const { invitationId } = req.params;
    const { action } = req.body;

    const result =
      await teamService.respondToInvitation(
        invitationId,
        req.user.userId,
        action
      );

    res.status(200).json({
      success: true,
      message: result.message,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getMyTeams = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const teams = await teamService.getMyTeams(userId);
        res.status(200).json({ success: true, data: teams });
    } catch (err) {
        next(err);
    }
};

const finalizeTeam = async (req, res, next) => {
    try {
        const founderId = req.user.userId;
        const { id } = req.params;
        const result = await teamService.finalizeTeam(id, founderId);
        res.status(200).json({ success: true, message: result.message });
    } catch (err) {
        next(err);
    }
};


module.exports = { createTeam, getTeam, respondToInvitation, getMyTeams, finalizeTeam };