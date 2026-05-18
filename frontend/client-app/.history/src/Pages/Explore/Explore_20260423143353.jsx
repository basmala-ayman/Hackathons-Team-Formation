import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import SearchBar from "./Components/SearchBar/SearchBar";
import FilterSideBar from "./Components/FilterSideBar/FilterSideBar";
import HackathonGrid from './Components/HackathonGrid/HackathonGrid'

function Explore() {
const dummyHackathons = [
  {
    id: 1,
    title: "AI Innovation Challenge 2026",
    prizeAmount: "$10,000",
    image: "/dummy.png",
    date: "May 15 - May 20, 2026",
    teamSize: "2-5 members",
    location: "online",
    level: "Intermediate",
  },
  {
    id: 2,
    title: "Web Dev Hackathon",
    prizeAmount: "$5,000",
    image: "/dummy.png",
    date: "June 1 - June 3, 2026",
    teamSize: "1-4 members",
    location: "Cairo",
    level: "Beginner",
  },
  {
    id: 3,
    title: "Data Science Sprint",
    prizeAmount: "$8,000",
    image: "/dummy.png",
    date: "July 10 - July 15, 2026",
    teamSize: "2-3 members",
    location: "online",
    level: "Advanced",
  },
];
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
  <Container className="my-5">
    {/* search part */}
    <Row>
      <h2 className="fs-1 fw-bold">Explore Hackathons</h2>
      <SearchBar onSearch={handleSearch}></SearchBar>
    </Row>

    <Row className="mt-5">
      <Col lg={2} className="d-none d-lg-block">
      <FilterSideBar></FilterSideBar>
      </Col>

      <Col lg={10} xs={12}>
      <div className="d-flex">
        <div className="d-lg-none border p-2 rounded">
           <FilterIcon /> Filter
        </div>
      <h5 className="fs-2 fw-medium ms-3">Hackathons found</h5>
</div>
      <HackathonGrid hackathons={dummyHackathons}></HackathonGrid>
      </Col>
    </Row>
  </Container>
  );
}

export default Explore;
