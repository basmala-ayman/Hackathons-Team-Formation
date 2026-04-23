import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import HackathonCard from "./Components/HackathonCard/HackathonCard";
import SearchBar from "./Components/SearchBar/SearchBar";
import FilterSideBar from "./Components/FilterSideBar/FilterSideBar";
import HackathonGrid from './Components/HackathonGrid/HackathonGrid'

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
  // const [filters, setFilters]=useState({
  //   date:[],
  //   categories:[],
  //   prizeRange:[]
  // });

  // const handleFilter=(sectionId , valueChecked)=>{
  //   setFilters((prevFilters)=>{
  //     const currentCategoryFilter=prevFilters[sectionId];
  //     if(currentCategoryFilter.includes(valueChecked)){
  //       return {
  //         ...prevFilters,
  //         [sectionId]:currentCategoryFilter.filter((item)=>(item)!==valueChecked)
  //       }
  //     }
  //     else{

  //       return{
  //         ...prevFilters,
  //         [sectionId]: [...currentCategoryFilter , valueChecked]
  //       }

  //     }

  //   })

  // }
  return (
  <Container>
    {/* search part */}
    <Row>
      <h2>Explore Hackathons</h2>
      <SearchBar onSearch={handleSearch}></SearchBar>
    </Row>

    <Row>
      <Col lg={3} className="d-none d-lg-block">
      <FilterSideBar></FilterSideBar>
      </Col>

      <Col></Col>
    </Row>
  </Container>
  );
}

export default Explore;
