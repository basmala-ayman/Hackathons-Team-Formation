import styles from './CustomButton.module.css'

function CustomButton({text , variant}) {
  return (
    <>
    <div className='container'>
          
    <div className={styles[`${variant}-btn`]}>
      {text}
    </div>
    </div>
 
     </>
  )
}

export default CustomButton
