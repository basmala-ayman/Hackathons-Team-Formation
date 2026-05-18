import { useState, useMemo } from "react";
import { Container, Row, Col, Offcanvas } from "react-bootstrap";
import SearchBar from "./Components/SearchBar/SearchBar";
import FilterSideBar from "./Components/FilterSideBar/FilterSideBar";
import HackathonGrid from "./Components/HackathonGrid/HackathonGrid";
import { FilterIcon } from "../../assets/Icons";

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
  //handle SearchFilter component on small screens
  const [openMobileFilter, setOpenMobileFilter] = useState(false);
  const handleOpenedFilters = () => {
    setOpenMobileFilter(true);
  };
  const handleColsedFilters = () => {
    setOpenMobileFilter(false);
  };

  // handle Search logic
  const [searchWord, setSearchWord] = useState("");
  const handleSearch = (word) => {
    setSearchWord(word);
  };

  //handle filter part
  const [filters, setFilters] = useState({
    date: [],
    categories: [],
    prizeRange: [],
  });

  //Memo is used to cash result
  //if searchWord or hackathons changed -> refilter
  const filteredHackathons = useMemo(() => {
    console.log("Word changed->filter");
    return dummyHackathons.filter((hackathon) => {
      //handle search logic
      const lowerSearchWord = searchWord.toLowerCase();
      const isSearchMatch = hackathon.title
        .toLowerCase()
        .includes(lowerSearchWord);
    const isDateMatch =
      filters.date.length === 0 || filters.date.includes(hackathon.date);

    const isCategoriesMatch =
      filters.categories.length === 0 ||
      filters.categories.includes(hackathon.categories);
    const isPrizeRangeMatch =
      filters.prizeRange.length === 0 ||
      filters.prizeRange.includes(hackathon.prizeRange);

      return isSearchMatch && isDate && isCategories && isPrizeRange;

    });
  }, [searchWord,filters, dummyHackathons]);

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
    <>
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
            <div className="mb-3">
              {/* appear only on small screens */}
              <div
                className="d-flex align-items-center gap-1 d-lg-none mb-3"
                style={{ cursor: "pointer" }}
                onClick={handleOpenedFilters}
              >
                <FilterIcon />
                <p className="fs-4 fw-medium mb-0">Filter</p>
              </div>

              <h5 className="fs-2 fw-medium ms-3">Hackathons found</h5>
            </div>
            {/* <HackathonGrid hackathons={dummyHackathons}></HackathonGrid> */}
            {filteredHackathons.length > 0 ? (
              <HackathonGrid hackathons={filteredHackathons} />
            ) : (
              <div className="text-center mt-5">
                <p className="fs-3">No hackathons match your search.</p>
              </div>
            )}
          </Col>
        </Row>
      </Container>

      <Offcanvas
        show={openMobileFilter}
        onHide={handleColsedFilters}
        placement="start"
      >
        <Offcanvas.Header closeButton></Offcanvas.Header>
        <Offcanvas.Body>
          <FilterSideBar />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Explore;
