import { useMemo } from "react";
import rolesData from "../Data/roles.json";
import skillsData from "../Data/skills.json";
import { HACKATHON_TAGS } from "../Data/hackathonTags";
import { HACKATHON_INTERESTS } from "../Data/hackathonInterests";

export function useStaticData() {
  //get SKills and roles data
  const roleOptions = useMemo(() => {
    return Object.entries(rolesData).map(([key, value]) => ({
      label: key,
      value: value,
    }));
  }, []);

  const skillsOptions = useMemo(() => {
    return Object.entries(skillsData).map(([key, value]) => ({
      label: key,
      value: value,
    }));
  }, []);

  const hackathonOptions = useMemo(() => {
    return HACKATHON_TAGS.map((tag) => ({
      label: tag,
      value: tag.toLowerCase().replace(/[\s/]+/g, "_"),
    }));
  }, []);

  const hackathonInterests = useMemo(() => {
    return HACKATHON_INTERESTS;
  }, []);

  //to display the key not the value of roles and skills data when needed
  const reverseRolesMap = useMemo(() => {
    const map = {};
    Object.entries(rolesData).forEach(([key, value]) => {
      map[value] = key;
    });
    return map;
  }, []);
  const reverseSkillsMap = useMemo(() => {
    const map = {};
    Object.entries(skillsData).forEach(([key, value]) => {
      map[value] = key;
    });
    return map;
  }, []);

  return {
    roleOptions,
    skillsOptions,
    reverseRolesMap,
    reverseSkillsMap,
    hackathonOptions,
    hackathonInterests
  };
}
