import CustomButton from '../../../../shared/CustomButton/CustomButton'
import styles from './SearchBar.module.css'
import { SearchIcon } from '../../../../assets/Icons'
function SearchBar() {
  return (
    <div className='d-flex gap-2 w-100'>
      <div className='d-flex align-items-center gap-2 rounded-3  flex-grow-1' style={{backgroundColor:"#FAF5FF"}}>
        <SearchIcon></SearchIcon>
        <input type="text"
        placeholder="Search by hackathon title or keyword"
        className={`bg-transparent border-0 flex-grow-1 py-2 outline-none`
        />
        
        </div>
        <CustomButton variant='primary' size='sm'>Search</CustomButton>
     
    </div>

  )
}

export default SearchBar
