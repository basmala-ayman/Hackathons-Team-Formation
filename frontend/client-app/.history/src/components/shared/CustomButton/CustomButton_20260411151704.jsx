import './CustomButton.module.css'

function CustomButton({text , variant}) {
  return (
    <div className={`${variant}-btn`}>
      {text}
      <p className='but'>c</p>
    </div>
  )
}

export default CustomButton
