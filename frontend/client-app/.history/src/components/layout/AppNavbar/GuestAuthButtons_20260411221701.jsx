import CustomButton from "../../../shared/CustomButton/CustomButton"
function GuestAuthButtons() {
    nav
  return (
    <div className="container">
      <div className="row">
        <div className="col"><CustomButton variant="secondary" onClick={()=>navigate("/login")}>Login</CustomButton></div>
        <CustomButton 
  variant="primary" 
  className="w-100 mt-4" 
  onClick={() => navigate("/login")}
>
  Back to Login
</CustomButton>
        <div className="col"></div>

      </div>
    </div>
  )
}

export default GuestAuthButtons
