import './CustomButton.module.css'

function CustomButton({text , variant}) {
  return (
    <div className={`${variant}-btn d`}>
      {text}
    </div>
  )
}

export default CustomButton
