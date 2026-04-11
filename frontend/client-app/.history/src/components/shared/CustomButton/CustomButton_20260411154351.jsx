import styles from './CustomButton.module.css'

function CustomButton({text , variant}) {
  return (

    <div className={styles[`${variant}-btn`] d}>
      {text}
    </div>

  )
}

export default CustomButton
