import { useMemo } from "react";
import rolesData from "../Data/roles.json";
import skillsData from "../Data/skills.json";

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
  };
}
