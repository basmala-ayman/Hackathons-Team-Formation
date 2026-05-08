import { PrizeIcon , TeamIcon , CodeIcon , StarIcon } from "../../../../assets/Icons"
function QuickStats({formData}) {

  const memberCount = formData.members?.length || 0;
  const teamSize = formData.teamSize || 4;
  const skillsCount = formData.skills?.length || 0;
  const rollssCount = formData.roles?.length || 0;

  
  return (
    <div>

      
    </div>
  )
}

export default QuickStats
