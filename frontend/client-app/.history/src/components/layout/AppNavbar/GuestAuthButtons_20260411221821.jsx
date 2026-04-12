import { useNavigate } from "react-router-dom"
import CustomButton from "../../../shared/CustomButton/CustomButton"
function GuestAuthButtons() {
    const navigate=useNavigate();
  return (
    <div className="container">
    
      <CustomButton variant="secondary" onClick={()=>navigate("/login")}>Login</CustomButton></div>
 
      

    </div>
  )
}

export default GuestAuthButtons
