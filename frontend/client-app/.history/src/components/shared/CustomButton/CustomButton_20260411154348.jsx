import styles from './CustomButton.module.css'

function CustomButton({text , variant}) {
  return (

    <div className={styles[`${variant}-btn`] d-flex}>
      {text}
    </div>

  )
}

export default CustomButton
