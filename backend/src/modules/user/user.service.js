const userRepository = require("./user.repository");
const AppError = require("../../utils/AppError");
const prisma = require("../../config/prisma");

const resolveInternalUserId = async (id) => {
  const user = await userRepository.findUserProfile(id);
  if (!user) throw new AppError("User not found", 404);
  return user.id;
};

const getProfile = async (id) => {
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      skills: { include: { skill: true } },
      hackathonInterests: { include: { hackathon: true } },
      ownedProjects: {
        include: {
          team: {
            include: {
              members: true
            }
          },
          interests: true
        }
      }
    }
  });

  if (!user || user.deletedAt) {
    throw new AppError("User not found", 404);
  }

  const skills = user.skills?.map((s) => s.skill.name) || [];

  const hackathonInterests =
    user.hackathonInterests?.map((hi) => ({
      id: hi.hackathon?.id,
      title: hi.hackathon?.title,
      location: hi.hackathon?.location,
      status: hi.hackathon?.status
    })) || [];

  const ownedProjects =
    user.ownedProjects?.map((p) => ({
      id: p.id,
      title: p.title,
      description: p.description,
      createdAt: p.createdAt,
      creatorName: user.name,
      creatorPicture: user.profilePicture,
      teamId: p.teamId,
      teamName: p.team?.name || null,
      teamStatus: p.team?.status || null,
      requiredSkillsOrRoles: p.team?.roles || [],
      totalTeamMembersCount: p.team?.members?.length || 0,
      totalInterestsCount: p.interests?.length || 0
    })) || [];

  const step1 = !!user.bio && skills.length > 0;
  const step2 = hackathonInterests.length > 0 || user.techRoles?.length > 0;
  const step3 = ownedProjects.length > 0;
  const step4 = !!user.resumeUrl && !!user.githubUrl && !!user.linkedinUrl;

  let percentage = 0;
  if (step1) percentage += 25;
  if (step2) percentage += 25;
  if (step3) percentage += 25;
  if (step4) percentage += 25;

  return {
    id: user.id,
    profileCompletionPercentage: percentage,
    profile: {
      name: user.name,
      email: user.email,
      bio: user.bio,
      githubUrl: user.githubUrl,
      linkedinUrl: user.linkedinUrl,
      profilePicture: user.profilePicture,
      resumeUrl: user.resumeUrl
    },
    techRoles: user.techRoles || [],
    skills,
    hackathonInterests,
    interests: user.interests || user.intrestes || [],
    ownedProjects
  };
};

const updateProfile = async (id, data) => {
  const targetUserId = await resolveInternalUserId(id);

  const { skills, interests, intrestes, hackathonInterests, ...flatProfileData } = data;
  const targetInterests = interests || intrestes;

  const forbidden = ["id", "email", "password", "role", "createdAt", "updatedAt"];
  forbidden.forEach((f) => delete flatProfileData[f]);

  Object.keys(flatProfileData).forEach((k) => {
    if (flatProfileData[k] === undefined) delete flatProfileData[k];
  });

  
  if (skills) {
    await userRepository.clearUserSkills(targetUserId);
    const skillsList = Array.isArray(skills) ? skills : [skills];

    for (const s of skillsList) {
      if (!s?.trim()) continue;
      const skill = await userRepository.upsertSkillByName(s.trim());
      await userRepository.createUserSkillRelation(targetUserId, skill.id);
    }
  }

  const dbTitles = [].concat(hackathonInterests || []).filter(Boolean);
  const enumList = [].concat(targetInterests || []).filter(Boolean);

  await prisma.$transaction(async (tx) => {
    await tx.hackathonInterest.deleteMany({
      where: { userId: targetUserId }
    });

    if (dbTitles.length > 0) {
      const matchedHackathons = await tx.hackathon.findMany({
        where: {
          OR: dbTitles.map((title) => ({
            title: { contains: title.trim(), mode: "insensitive" }
          }))
        }
      });

      if (matchedHackathons.length > 0) {
        const uniqueMap = new Map();
        matchedHackathons.forEach((h) => {
          const lowerTitle = h.title.toLowerCase().trim();
          if (!uniqueMap.has(lowerTitle)) uniqueMap.set(lowerTitle, h);
        });

        await tx.hackathonInterest.createMany({
          data: Array.from(uniqueMap.values()).map((h) => ({
            userId: targetUserId,
            hackathonId: h.id,
            name: h.title 
          }))
        });
      }
    }

    const updatePayload = { ...flatProfileData };
    if (enumList.length > 0) {
      if ('intrestes' in prisma.user.fields) {
        updatePayload.intrestes = enumList;
      } else {
        updatePayload.interests = enumList;
      }
    }

    await tx.user.update({
      where: { id: targetUserId },
      data: updatePayload
    });
  });

  return getProfile(targetUserId);
};

module.exports = {
  getProfile,
  updateProfile
};