import styles from './CustomButton.module.css'

function CustomButton({text , variant}) {
  return (
    <>
    <div></div>
   
    <div className={styles[`${variant}-btn`]}>
      {text}
    </div>
     </>
  )
}

export default CustomButton
