// src/modules/team/team.service.js
const teamRepository = require("./team.repository");
const hackathonRepository = require("../hackathons/hackathon.repository");
const notificationRepository = require("../notifications/notification.repository");
const interestRepository = require("../interests/interest.repository");
const AppError = require("../../utils/AppError");
const { syncHackathonEntity } = require("../ai/aiCandidate.service");
const prisma = require("../../config/prisma");


const createTeam = async (ownerId, data) => {

    //first thing making destructring for the user data to can use them easily
    const {
        teamName,
        hackathonName,
        description,
        teamSize,
        skills,
        roles,
        members,
        // projectTitle,
        // projectDescription,
        userCreated,
        hasIdea,
    } = data;


    const safeSkills = skills || [];
    const safeRoles = roles || [];
    const safeMembers = members || [];


    //and then check if the user apply for hackathon already existed or new one
    let hackathon;

    //if not existed so we will create now one and put it as user created to not appear it in the explore hackathons page 
    //now if the user who create the hackathon and the hackathon not existed so we will create to it new hackathon record in the database
    if (userCreated) {
        //now we will need here to make noe new hackathon for the user 
        //but what about if the new hackathon name is the same as existed one?
        const existing = await hackathonRepository.findHackathonByTitle(hackathonName.trim());
        if (existing) {
            throw new AppError(
                `A hackathon with the title "${hackathonName.trim()}" already exists. Please use the existing one or choose a different name.`,
                409
            );
        }

        //otherwise we will normally create it 
        hackathon = await hackathonRepository.createHackathon({
            title: hackathonName.trim(),
            source: "USER_CREATED",
            status: "UPCOMING",
        });
    } else {
        //now what about if the usercreated = false so that means it is choose one hackathon to create team for it
        //we will just catch it and put it in the hackathon object that we already made it 
        hackathon = await hackathonRepository.findHackathonByTitle(hackathonName.trim());

        //what about if this hackathong name that coming from the front not existed 
        //so just throw an error
        if (!hackathon) {
            throw new AppError(
                `Hackathon with the title "${hackathonName.trim()}" not found. Please check the name and try again.`,
                404
            );
        }
    }

    //then we need to check what if the hackathon already ended? 
    if (hackathon.status === "ENDED") {
        throw new AppError(
            "Cannot create a team for an ended hackathon",
            400
        );
    }

    //check if the user already create team for this hackathon before or no
    const existingTeam = await teamRepository.findUserTeamForHackathon(ownerId, hackathon.id);
    if (existingTeam) {
        throw new AppError(
            "You already have a team for this hackathon.",
            400
        );
    }

    //now the user who try to create this team cannot create this team if he is already interested in this
    //so we just need to check
    const alreadyInterested = await interestRepository.findHackathonInterestByUser(
        ownerId,
        hackathon.id
    );

    if (alreadyInterested) {
        throw new AppError(
            "You already marked interest in this hackathon. You cannot also create a team.",
            400
        );
    }



    //now the getted skills the front will send them to me i need to save them in the skills table to can making the joining and the relation of the teams with skills 
    //so this will just check if the skills already existed we do not make anything if not we add it
    const skillRecords = await Promise.all(
        safeSkills.map((skillName) =>
            teamRepository.upsertSkill(skillName.trim().toLowerCase())
        )
    );

    //now we need to create the team with all this coming data we have 
    //so here first thing i make the team and that will be the real team and will have the accepted team members 
    //and here we put the owner id to put the information of the owner id attribute in the schema 
    const team = await teamRepository.createTeam({
        name: teamName.trim(),
        hackathonId: hackathon.id,
        ownerId,
        description: description?.trim() || null,
        size: teamSize,
        roles: safeRoles,
        status: "FORMING",
    });

    //and here we add it again but as team member for this created team we make 
    await teamRepository.addTeamMember({ teamId: team.id, userId: ownerId });

    //now we need to fill the m:m table of the team and the skills so we add the team id with each skill id we get from front
    if (skillRecords.length > 0) {
        await teamRepository.addTeamSkills(
            skillRecords.map((skill) => ({ teamId: team.id, skillId: skill.id }))
        );
    }



    // //now here what about if the user is choose that he create this team for new project idea he enter its name 
    // //so we will need to store this project and make record for it to be showed in the explore projects page
    // if (projectTitle) {
    //     await teamRepository.createProject({
    //         title: projectTitle.trim(),
    //         description: projectDescription?.trim() || "",
    //         ownerId,
    //         teamId: team.id,
    //     });
    // }

    if (hasIdea === true) {
        await teamRepository.createProject({
            title: teamName.trim(),                // project title = team name
            description: description?.trim() || "", // project description = team description
            ownerId,
            teamId: team.id,
        });
    }


    //now for the members we get from the front we need to send for each one of them an invitation 
    if (safeMembers.length > 0) {
        const deadline = new Date();
        //we will make the invitation valid for 1 day only
        //the deadlign for the invited persons to accept or reject the invitations will be 1 days for making updates before sending to the model
        deadline.setDate(deadline.getDate() + 1);

        const invitations = await teamRepository.createInvitations(
            safeMembers.map((receiverId) => ({
                teamId: team.id,
                senderId: ownerId,
                receiverId,
                deadline,
            }))
        );

        await notificationRepository.createNotifications(
            invitations.map((invitation) => ({
                userId: invitation.receiverId,
                type: "TEAM_INVITE",
                title: "New Team Invitation",
                message: `You have been invited to join team "${team.name}" for ${hackathon.title}`,
                metadata: {
                    teamId: team.id,
                    hackathonId: hackathon.id,
                    invitationId: invitation.id,
                },
            }))
        );
    }


    syncHackathonEntity(hackathon.id).catch((err) =>
        console.error("Failed to sync hackathon to AI:", err.message)
    );


    return {
        teamId: team.id,
    };

};

const getTeamById = async (teamId) => {
    const team = await prisma.team.findUnique({
        where: { id: teamId },
        include: {
            hackathon: true,
            owner: { select: { id: true, name: true, profilePicture: true } },
            members: {
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            profilePicture: true,
                            techRoles: true,
                            skills: { include: { skill: { select: { name: true } } } },
                        },
                    },
                },
            },
            skills: { include: { skill: true } },
            invitations: {
                where: { status: "PENDING" },
                include: {
                    receiver: {
                        select: {
                            id: true,
                            name: true,
                            profilePicture: true,
                            techRoles: true,
                            skills: { include: { skill: { select: { name: true } } } },
                        },
                    },
                },
            },
        },
    });
    if (!team) throw new AppError("Team not found", 404);

    const memberMap = new Map();

    // Add accepted members
    team.members.forEach((m) => {
        memberMap.set(m.user.id, {
            userId: m.user.id,
            name: m.user.name,
            profilePicture: m.user.profilePicture,
            role: m.user.techRoles?.[0] || "",
            skills: m.user.skills?.map((s) => s.skill.name) || [],
            status: "ACCEPTED",
        });
    });

    // Add pending invitations (only if not already in map)
    team.invitations.forEach((inv) => {
        if (!memberMap.has(inv.receiver.id)) {
            memberMap.set(inv.receiver.id, {
                userId: inv.receiver.id,
                name: inv.receiver.name,
                profilePicture: inv.receiver.profilePicture,
                role: inv.receiver.techRoles?.[0] || "",
                skills: inv.receiver.skills?.map((s) => s.skill.name) || [],
                invitationId: inv.id,
                status: "PENDING",
            });
        }
    });

    const allMembers = Array.from(memberMap.values());

    return {
        recommendationId: team.id,
        status: team.status,
        expiresAt: null,
        targetTeam: {
            id: team.id,
            teamName: team.name,
            hackathon: team.hackathon,
            description: team.description || "",
            maxMembers: team.size,
            ownerId: team.ownerId,
            requiredSkills: team.skills.map((s) => s.skill.name),
        },
        recommendedMembers: allMembers,
    };
};

const respondToInvitation = async (
    invitationId,
    userId,
    action
) => {
    if (!["ACCEPT", "REJECT"].includes(action)) {
        throw new AppError(
            "Action must be ACCEPT or REJECT",
            400
        );
    }

    const invitation =
        await teamRepository.findInvitationById(
            invitationId
        );

    if (!invitation) {
        throw new AppError(
            "Invitation not found",
            404
        );
    }

    if (invitation.receiverId !== userId) {
        throw new AppError(
            "This invitation is not for you",
            403
        );
    }

    if (invitation.status !== "PENDING") {
        throw new AppError(
            "Invitation already responded to",
            400
        );
    }

    if (invitation.deadline < new Date()) {
        throw new AppError(
            "Invitation has expired",
            400
        );
    }

    // ACCEPT
    if (action === "ACCEPT") {
        await teamRepository.updateInvitationStatus(
            invitationId,
            "ACCEPTED"
        );

        await teamRepository.addTeamMember({
            teamId: invitation.teamId,
            userId,
        });

        const team =
            await prisma.team.findUnique({
                where: {
                    id: invitation.teamId,
                },
                include: {
                    members: true,
                },
            });

        const teamComplete =
            team.members.length >= team.size;

        if (teamComplete) {
            await prisma.team.update({
                where: {
                    id: team.id,
                },
                data: {
                    status: "COMPLETE",
                },
            });
        }

        const user =
            await prisma.user.findUnique({
                where: {
                    id: userId,
                },
                select: {
                    name: true,
                },
            });

        await notificationRepository.createNotifications([
            {
                userId: team.ownerId,
                type: "INVITE_ACCEPTED",
                title: "Invitation Accepted",
                message: `${user.name} accepted your invitation to join "${team.name}".`,
                metadata: {
                    teamId: team.id,
                    invitedUserId: userId,
                    teamComplete,
                },
            },
        ]);

        return {
            message:
                "Invitation accepted successfully",
            teamComplete,
        };
    }

    // REJECT
    await teamRepository.updateInvitationStatus(
        invitationId,
        "REJECTED"
    );

    const user =
        await prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                name: true,
            },
        });

    await notificationRepository.createNotifications([
        {
            userId: invitation.team.ownerId,
            type: "INVITE_REJECTED",
            title: "Invitation Rejected",
            message: `${user.name} rejected your invitation to join "${invitation.team.name}".`,
            metadata: {
                teamId: invitation.teamId,
                invitedUserId: userId,
            },
        },
    ]);

    return {
        message:
            "Invitation rejected successfully",
    };
};

const getMyTeams = async (userId) => {
    const teams = await teamRepository.findMyTeamsWithMembers(userId);

    return teams.map((team) => {
        const memberMap = new Map();

        const isOwner = team.ownerId === userId;

        // 1. Add owner only if the current user is NOT the owner
        if (!isOwner && team.owner) {
            memberMap.set(team.owner.id, {
                userId: team.owner.id,
                name: team.owner.name,
                email: team.owner.email,
                profilePicture: team.owner.profilePicture,
                techRoles: team.owner.techRoles || [],
                skills: team.owner.skills?.map((s) => s.skill.name) || [],
                githubUrl: team.owner.githubUrl || null,
                linkedinUrl: team.owner.linkedinUrl || null,
                status: "ACCEPTED",
                isOwner: true,
                invitationId: null,
            });
        }

        team.members.forEach((m) => {
            if (m.user.id === team.ownerId) return; // skip owner
            if (!memberMap.has(m.user.id)) {
                memberMap.set(m.user.id, {
                    userId: m.user.id,
                    name: m.user.name,
                    email: m.user.email,
                    profilePicture: m.user.profilePicture,
                    techRoles: m.user.techRoles || [],
                    skills: m.user.skills?.map((s) => s.skill.name) || [],
                    githubUrl: m.user.githubUrl || null,
                    linkedinUrl: m.user.linkedinUrl || null,
                    status: "ACCEPTED",
                    isOwner: false,
                    invitationId: null,
                });
            }
        });

        team.invitations.forEach((inv) => {
            if (!memberMap.has(inv.receiver.id)) {
                memberMap.set(inv.receiver.id, {
                    userId: inv.receiver.id,
                    name: inv.receiver.name,
                    email: inv.receiver.email,
                    profilePicture: inv.receiver.profilePicture,
                    techRoles: inv.receiver.techRoles || [],
                    skills: inv.receiver.skills?.map((s) => s.skill.name) || [],
                    githubUrl: inv.receiver.githubUrl || null,
                    linkedinUrl: inv.receiver.linkedinUrl || null,
                    status: inv.status,
                    isOwner: false,
                    invitationId: inv.id,
                });
            }
        });

        return {
            teamId: team.id,
            teamName: team.name,
            description: team.description || "",
            status: team.status,
            maxMembers: team.size,
            ownerId: team.ownerId,
            hackathon: team.hackathon.title,
            project: team.project || null,
            requiredSkills: team.skills.map((s) => s.skill.name),
            members: Array.from(memberMap.values()),
            buttonDisplayed: isOwner,
        };
    });
};

// "Get Enough"
const finalizeTeam = async (teamId, founderId) => {
    const team = await prisma.team.findUnique({
        where: { id: teamId },
        include: {
            members: true,
            invitations: { where: { status: "PENDING" } },
        },
    });

    if (!team) throw new AppError("Team not found", 404);
    if (team.ownerId !== founderId) throw new AppError("Only the team owner can finalize the team", 403);
    if (team.status === "COMPLETE") throw new AppError("Team is already complete", 400);

    // Cancel all pending invitations
    const pendingInvitationIds = team.invitations.map((inv) => inv.id);
    if (pendingInvitationIds.length > 0) {
        await prisma.teamInvitation.updateMany({
            where: { id: { in: pendingInvitationIds } },
            data: { status: "CANCELLED" },
        });

        // Notify pending members that the team is now closed
        await notificationRepository.createNotifications(
            team.invitations.map((inv) => ({
                userId: inv.receiverId,
                type: "TEAM_INVITE",
                title: "Team is now complete",
                message: `The team you were invited to has been finalized without you. Better luck next time!`,
                metadata: { teamId },
            }))
        );
    }

    // Mark team as COMPLETE
    await prisma.team.update({
        where: { id: teamId },
        data: { status: "COMPLETE" },
    });

    const completedTeam = await teamRepository.getTeamWithDetails(teamId);

    const members = completedTeam.members.map((member) => ({
        userId: member.user.id,
        name: member.user.name,
        email: member.user.email,
        profilePicture: member.user.profilePicture,
        techRoles: member.user.techRoles || [],
        skills: member.user.skills?.map((s) => s.skill.name) || [],
        githubUrl: member.user.githubUrl || null,
        linkedinUrl: member.user.linkedinUrl || null,
        status: "ACCEPTED",
        isOwner: member.user.id === completedTeam.ownerId,
        invitationId: null,
    }));

    return {
        teamId: completedTeam.id,
        teamName: completedTeam.name,
        description: completedTeam.description || "",
        status: completedTeam.status,
        maxMembers: completedTeam.size,
        ownerId: completedTeam.ownerId,
        hackathon: completedTeam.hackathon.title,
        project: completedTeam.project || null,
        requiredSkills: completedTeam.skills.map((s) => s.skill.name),
        members,
        buttonDisplayed: false,
    };

};




module.exports = {
    createTeam,
    getTeamById,
    respondToInvitation,
    getMyTeams,
    finalizeTeam,
}