import { useState } from "react";
import HackathonCard from "./Components/HackathonCard/HackathonCard";
import SearchBar from "./Components/SearchBar/SearchBar";
import FilterSideBar from "./Components/FilterSideBar/FilterSideBar";

function Explore() {
  const dummyHackathon = {
    title: "AI Innovation Challenge 2026",
    prizeAmount: "$10,000",
    image: "/public/dummy.png",
    date: "May 15 - May 20, 2026",
    teamSize: "2-5 members",
    location: "online",
    level: "Intermediate",
  };
  // handle Search part
  const [searchWord, setSearchWord] = useState("");
  const handleSearch = (word) => {
    setSearchWord(word);
  };

  //handle filter part
  const [filters, setFilters]=useState({
    date:[],
    categories:[],
    prizeRange:[]
  });

  const handleFilter=(sectionId , valueChecked)=>{
    setFilters((prevFilters)=>{
      const currentCategoryFilter=prevFilters[sectionId];
      if(currentCategoryFilter.includes(valueChecked)){
        return {
          
        }
      }
    })

  }
  return (
    <div className="d-flex">
      {/* <HackathonCard hackathon={dummyHackathon}></HackathonCard> */}
      {/* <SearchBar onSearch={handleSearch}></SearchBar> */}
    <FilterSideBar></FilterSideBar>
    </div>
  );
}

export default Explore;
