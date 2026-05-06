const userRepository = require("./user.repository");
const AppError = require("../../utils/AppError");

const getProfile = async (id) => {
  const user = await userRepository.findUserProfile(id);

 // sure if user exist
  if (!user || user.deletedAt) {
    throw new AppError("User not found or account deactivated", 404);
  }

 // skills
  const skills = user.skills?.map((s) => s.skill.name) || [];

  // teams
  const teams = [
    ...(user.ownedTeams?.map((t) => ({
      id: t.id,
      name: t.name,
      status: t.status,
      userRole: "OWNER",
      hackathon: t.hackathon?.title,
    })) || []),
    ...(user.teamMemberships?.map((m) => ({
      id: m.team.id,
      name: m.team.name,
      status: m.team.status,
      userRole: "MEMBER",
      hackathon: m.team.hackathon?.title,
    })) || []),
  ];

  // invitations
  const invitations = {
    sent: (user.sentInvitations || [])
      .sort((a, b) => b.createdAt - a.createdAt)
      .map((i) => ({
        id: i.id,
        teamName: i.team.name,
        receiverName: i.receiver.name,
        status: i.status,
        deadline: i.deadline,
      })),
    received: (user.receivedInvitations || [])
      .sort((a, b) => b.createdAt - a.createdAt)
      .map((i) => ({
        id: i.id,
        teamName: i.team.name,
        senderName: i.sender.name,
        status: i.status,
        deadline: i.deadline,
      })),
  };

  return {
    id: user.id,
    profile: {
      name: user.name,
      email: user.email,
      bio: user.bio,
      profilePicture: user.profilePicture,
      githubUrl: user.githubUrl,
      linkedinUrl: user.linkedinUrl,
      resumeUrl: user.resumeUrl,
    },
    stats: {
      isVerified: user.isVerified,
      joinedAt: user.createdAt,
    },
    skills,
    teams,
    invitations,
    matchingHistory: user.matchingRequests?.map(m => ({
      hackathon: m.hackathon.title,
      status: m.status,
      date: m.createdAt
    })) || []
  };
};

const updateProfile = async (id, data) => {

  const forbiddenFields = ['id', 'role', 'password', 'isVerified', 'email'];
  forbiddenFields.forEach(field => delete data[field]);

  const updatedUser = await userRepository.updateUser(id, data);
  
  if (!updatedUser) {
    throw new AppError("Update failed: User not found", 404);
  }

  return updatedUser;
};

module.exports = {
  getProfile,
  updateProfile,
};

