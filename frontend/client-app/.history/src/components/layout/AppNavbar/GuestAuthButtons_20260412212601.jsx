import { useNavigate } from "react-router-dom"
import CustomButton from "../../../shared/CustomButton/CustomButton"
function GuestAuthButtons() {
    const navigate=useNavigate();
  return (
    <div className="d-flex align-items-center gap-3">
    
      <CustomButton variant="secondary"  size="md"onClick={()=>navigate("/login")}>Login</CustomButton>
      <CustomButton variant="primary" size="sm" onClick={()=>navigate("/register")}>Register</CustomButton>
      

    </div>
  )
}

export default GuestAuthButtons
