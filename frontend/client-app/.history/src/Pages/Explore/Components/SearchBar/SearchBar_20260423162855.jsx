import CustomButton from "../../../../shared/CustomButton/CustomButton";
import styles from "./SearchBar.module.css";
import { SearchIcon } from "../../../../assets/Icons";
import { useState } from "react";
function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit=(e)=>{
    e.preventDefault();
    onSearch()
  }


  return (
    <div className="d-flex gap-2 w-100">
      <div
        className="d-flex align-items-center gap-2 rounded-3  flex-grow-1 px-3 py-2"
        style={{ backgroundColor: "#F0F1F4" }}
      >
        <span className="d-flex align-items-center">
          <SearchIcon />
        </span>
        <input
          type="text"
          placeholder="Search by hackathon title or keyword"
          className={`${styles.inputSearch} form-control fs-4 bg-transparent border-0 flex-grow-1 outline-none pt-2`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <CustomButton variant="primary" size="sm"
      onClick={()=>onSearch(searchTerm)}
      >
        Search
      </CustomButton>
    </div>
  );
}

export default SearchBar;
