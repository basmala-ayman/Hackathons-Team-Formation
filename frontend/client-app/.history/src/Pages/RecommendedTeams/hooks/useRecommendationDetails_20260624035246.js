// import { useEffect , useState } from "react";
// import {getRecommendationDetails} from '../../../services/recommendationService'

// function useRecommendationDetails(id) {
//     const [teamData, setTeamData]=useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState("");

//     useEffect(() => {
//     const fetchDetails = async () => {
//       try {
//         setLoading(true);

//         const data =
//           await getRecommendationDetails(id);

//         setTeamData(data);
//       } catch (err) {
//         setError(
//           err.message ||
//             "Failed to load team"
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) {
//       fetchDetails();
//     }
//   }, [id]);

//   return {
//     teamData,
//     loading,
//     error,

//   }
// }

// export default useRecommendationDetails;