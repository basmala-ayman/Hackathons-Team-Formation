import styles from './CustomButton.module.css'

function CustomButton({text , variant}) {
  return (

    <div className={`d-flex justify-content-center ${styles[`${variant}-btn`]}`}>
      {text}
    </div>

  )
}

export default CustomButton
