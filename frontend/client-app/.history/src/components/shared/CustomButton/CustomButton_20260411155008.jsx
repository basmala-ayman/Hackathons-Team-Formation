import styles from './CustomButton.module.css'

function CustomButton({text , variant}) {
  return (

    <button className={`d-flex justify-content-center align-items-center p-3 ${styles[`${variant}-btn`]}`}>
      {text}
    </button>

  )
}

export default CustomButton
