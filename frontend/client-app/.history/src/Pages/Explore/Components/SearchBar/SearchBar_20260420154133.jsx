import CustomButton from '../../../../shared/CustomButton/CustomButton'
import styles from './SearchBar.module.css'
function SearchBar() {
  return (
    <div className='d-flex gap-2'>
      <div className='d-flex align-items-center gap-2 rounded-3' style={{backgroundColor:"#FAF5FF"}}>
        </div>
        <CustomButton>Search</CustomButton>
     
    </div>

  )
}

export default SearchBar
