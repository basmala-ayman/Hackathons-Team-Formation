import CustomButton from '../../../../shared/CustomButton/CustomButton'
import styles from './SearchBar.module.css'
import { FaSearch } from 'react-icons/fa';
function SearchBar() {
  return (
    <div className='d-flex gap-2'>
      <div className='d-flex align-items-center gap-2 rounded-3' style={{backgroundColor:"#FAF5FF"}}>
        <FaSearch></FaSearch>
        <input type="search" />
        </div>
        <CustomButton variant='primary'>Search</CustomButton>
     
    </div>

  )
}

export default SearchBar
