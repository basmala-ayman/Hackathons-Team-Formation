import CustomButton from '../../../../shared/CustomButton/CustomButton'
import styles from './SearchBar.module.css'
import { Se
function SearchBar() {
  return (
    <div className='d-flex gap-2'>
      <div className='d-flex align-items-center gap-2 rounded-3' style={{backgroundColor:"#FAF5FF"}}>
        <SearchIcon></SearchIcon>
        <input type="text"
        placeholder="Search by hackathon title or keyword"
        className="bg-transparent border-0 flex-grow-1 py-2 outline-none"
        />
        
        </div>
        <CustomButton variant='primary'>Search</CustomButton>
     
    </div>

  )
}

export default SearchBar
