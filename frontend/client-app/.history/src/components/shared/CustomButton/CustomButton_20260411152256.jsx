import styles from './CustomButton.module.css'

function CustomButton({text , variant}) {
  return (
    <>
   
    <div className={styles[`${variant}-btn`]}>
      {text}
      <p className="text-primary">c</p>
    
    </div>
  )
}

export default CustomButton
