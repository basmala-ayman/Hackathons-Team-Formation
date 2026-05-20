import { TeamMeetIcon, AddMemberIcon, CodeIcon, CheckIcon } from "../../";

export const CREATE_STEPS = [
  { id: 1, title: "Team Basics", icon: <TeamMeetIcon /> },
  { id: 2, title: "Build Your Team", icon: <AddMemberIcon /> },
  { id: 3, title: "Required Skills", icon: <CodeIcon color="var(--color-primary-dark)" /> },
  { id: 4, title: "Final Details", icon: <CheckIcon color="var(--color-primary-dark)" /> },
];

export const INITIAL_FORM_DATA = {
  teamName: "",
  hackathonName: "",
  description: "",
  teamSize: 4,
  members: [],
  skills: [],
  roles: [],
  hasIdea: false,
};