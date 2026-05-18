import { PrizeIcon , TeamIcon , CodeIcon , StarIcon } from "../../../../assets/Icons"
function QuickStats({formData , currentStep}) {

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
      value: rolesCount,
    },
    {
      icon: <StarIcon />,
      label: "Completion",
      value: `${currentStep}/4`,
    },
  ];
  return (
  <div className={`p-4 ${styles.statsCard}`}>
      <div className="d-flex align-items-center gap-3 mb-4">
        <div className={styles.iconCircle}>
          <PrizeIcon size={20} />
        </div>
        <h5 className="mb-0 fw-bold text-white">Quick Stats</h5>
      </div>

      {/* Stat Rows */}
      <div className="d-flex flex-column gap-3">
        {statItems.map((item, index) => (
          <div 
            key={index} 
            className={`d-flex align-items-center justify-content-between p-3 ${styles.statRow}`}
          >
            <div className="d-flex align-items-center gap-3 text-white">
              <span className="fs-5 d-flex">{item.icon}</span>
              <span className={styles.statLabel}>{item.label}</span>
            </div>
            <span className="fw-bold text-white">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default QuickStats
