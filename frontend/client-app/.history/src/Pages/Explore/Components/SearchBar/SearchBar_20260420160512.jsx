import CustomButton from '../../../../shared/CustomButton/CustomButton'
import styles from './SearchBar.module.css'
import { SearchIcon } from '../../../../assets/Icons'
function SearchBar() {
  return (
    <div className='d-flex gap-2 w-100'>
      <div className='d-flex align-items-center gap-2 rounded-3  flex-grow-1 px-3 py-2' style={{backgroundColor:"#FAF5FF"}}>
        <span className="d-flex align-items-center">
            <SearchIcon />
        </span>
        <input type="text"
        placeholder="Search by hackathon title or keyword"
        className={`${styles.inputSearch} bg-transparent border-0 flex-grow-1 outline-none p-0 m-0`}
        />
        
        </div>
        <CustomButton variant='primary' size='sm'>Search</CustomButton>
     
    </div>

  )
}

export default SearchBar
