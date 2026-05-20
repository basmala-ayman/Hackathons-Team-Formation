import { useState, useEffect, useMemo } from "react";
import { getBasicUsers } from "../../../services/userService";
import { getHackathonNames } from "../../../services/hackathonService";
import { createTeam } from "../../../services/teamService";
import { INITIAL_FORM_DATA } from "../CreateTeam.constants";

//function to get saved user's data
const getSavedData = (key, defaultValue) => {
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : defaultValue;
};

export function useCreateTeamForm() {
  return {};
}
