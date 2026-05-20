import { useMemo } from "react";
import rolesData from "../Data/roles.json";
import skillsData from "../Data/skills.json";

export function useStaticData() {
  // Map JSON to { label, value } for dropdowns
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

  // Reverse mapping for looking up keys by value
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