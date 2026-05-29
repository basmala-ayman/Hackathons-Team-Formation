import api from "./axiosInstance";
export const getRecommendations = async (tab = "all") => {
  try {
    const response = await api.get(
      `/recommendations?tab=${tab}`
    );

    return response.data.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Failed to fetch recommendations",
      }
    );
  }
};

export const acceptRecommendation = async (teamId) => {
  return await api.patch(
    `/recommendations/${teamId}/accept`
  );
};

export const rejectRecommendation = async (teamId) => {
  return await api.patch(
    `/recommendations/${teamId}/reject`
  );
};

export const respondToInvitation = async (
  teamId,
  action
) => {
  return await api.patch(
    `/recommendations/invitations/${teamId}/respond`,
    {
      action,
    }
  );
};
Then In Component

You already have:

const isOwner = team.ownerId === user?.id;

So:

Accept Logic
const handleAccept = async (team) => {
  try {
    if (team.ownerId === user?.id) {
      await acceptRecommendation(team.teamId);
    } else {
      await respondToInvitation(
        team.teamId,
        "ACCEPT"
      );
    }

    console.log("Accepted successfully");
  } catch (error) {
    console.error(error);
  }
};
Reject Logic
const handleDecline = async (team) => {
  try {
    if (team.ownerId === user?.id) {
      await rejectRecommendation(team.teamId);
    } else {
      await respondToInvitation(
        team.teamId,
        "REJECT"
      );
    }

    console.log("Rejected successfully");
  } catch (error) {
    console.error(error);
  }
};
Then Pass Team Object

Instead of:

onAccept={() => handleAcceptTeam(isOwner)}

do:

onAccept={() => handleAccept(team)}
onDecline={() => handleDecline(team)}
Why This Structure Is Better

Because:

no duplicated logic
scalable
easy to maintain
backend differences hidden inside handlers
One Important Thing

Your member endpoint says:

/recommendations/invitations/{invitationId}/respond

BUT backend told you to use teamId.

So internally they are probably resolving invitation by:

current user
current team

That is unconventional naming, but acceptable if backend guarantees it.

So follow backend contract exactly.