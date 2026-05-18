import { PrizeIcon , TeamIcon , CodeIcon , StarIcon } from "../../../../assets/Icons"
function QuickStats({formData}) {

  const memberCount = formData.members?.length || 0;
  const teamSize = formData.teamSize || 4;
  const skillsCount = formData.skills?.length || 0;
  const rolesCount = formData.roles?.length || 0;

  const statItems = [
    {
      icon: <TeamIcon />,
      label: "Team Size",
      value: `${memberCount + 1}/${teamSize}`, 
    },
    {
      icon: <CodeIcon />,
      label: "Skills",
      value: skillsCount,
    },
     {
      icon: <CodeIcon />,
      label: "Roles",
      value: skillsCount,
    },
    {
      icon: <PrizeIcon />,
      label: "Completion",
      value: `${currentStep}/4`,
    },
  ];
  return (
    <div>

      
    </div>
  )
}

export default QuickStats
