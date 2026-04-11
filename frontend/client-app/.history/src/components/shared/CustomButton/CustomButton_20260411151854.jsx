import './CustomButton.module.css'

function CustomButton({text , variant}) {
  return (
    <div className={`${variant}-btn`}>
      {text}
      <p className="text-primary">c</p>
    
    </div>
  )
}

export default CustomButton
