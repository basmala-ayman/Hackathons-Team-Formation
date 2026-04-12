import { useNavigate } from "react-router-dom"
import CustomButton from "../../../shared/CustomButton/CustomButton"
function GuestAuthButtons() {
    const navigate=useNavigate();
  return (
    <div className="d-flex flex-column flex-xl-row gap-3 my-sm-5">
    
      <CustomButton variant="secondary"  size="sm"onClick={()=>navigate("/login")}>Login</CustomButton>
      <CustomButton variant="primary" size="sm" onClick={()=>navigate("/register")}>Register</CustomButton>
      

    </div>
  )
}

export default GuestAuthButtons
