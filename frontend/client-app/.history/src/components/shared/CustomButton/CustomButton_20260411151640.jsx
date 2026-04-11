import './CustomButton.module.css'

function CustomButton({text , variant}) {
  return (
    <div className={`${variant}-btn`}>
      {text}
    </div>
  )
}

export default CustomButton
