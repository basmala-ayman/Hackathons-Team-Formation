import styles from './CustomButton.module.css'

function CustomButton({text , variant}) {
  return (
    <>
    <div className='container pt-5 mt-5'>
          <p>ddd</p>
    <div className={styles[`${variant}-btn`]}>
      {text}
    </div>
    </div>
 
     </>
  )
}

export default CustomButton
