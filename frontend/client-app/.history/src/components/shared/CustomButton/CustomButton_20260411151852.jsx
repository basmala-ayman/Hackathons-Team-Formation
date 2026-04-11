import './CustomButton.module.css'

function CustomButton({text , variant}) {
  return (
    <div className={`${variant}-btn`}>
      {text}
      <p className="text-primary">c</p>
      kkkk
    </div>
  )
}

export default CustomButton
