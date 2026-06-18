import { useEffect , useState } from "react";
import {getRecommendationDetails} from '../../../services/recommendationService'

function useRecommendationDetails(id) {
    const [teamData, setTeamData]=useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

  return (
    <div>
      
    </div>
  )
}

export default useRecommendationDetails;
