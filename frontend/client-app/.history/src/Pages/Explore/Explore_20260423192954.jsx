import { useState, useMemo, useCallback } from "react";
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
      tags:["Gaming"
Health
IoT],
      image: "/dummy.png",
      teamSize: "2-5 members",
      location: "online",
      level: "Intermediate",
    },
    {
      id: 2,
      title: "Web Dev Hackathon",
      prizeAmount: "$5,000",
      image: "/dummy.png",
      teamSize: "1-4 members",
      location: "Cairo",
      level: "Beginner",
    },
    {
      id: 3,
      title: "Data Science Sprint",
      prizeAmount: "$8,000",
      image: "/dummy.png",
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
    tags: [],
    prizeAmount: [],
  });
  const handleFilter = useCallback((filterType, selectedValue) => {
    setFilters((prevFilterState) => {
      const currentList = prevFilterState[filterType];
      const isValueIncluded = currentList.includes(selectedValue);
      //if the selected filter value included already remove it , else add in the filter list under its category
      const updatedList = isValueIncluded
        ? currentList.filter((item) => item !== selectedValue)
        : [...currentList, selectedValue];

      //return the filter but edit the filter type which its list is changed
      return {
        ...prevFilterState,
        [filterType]: updatedList,
      };
    });
  }, []);

  //Memo is used to cash result
  //if searchWord or hackathons changed -> refilter
  const filteredHackathons = useMemo(() => {
    console.log("Word changed->filter");
    return dummyHackathons.filter((hackathon) => {
      //check if search word matches hackthon title
      const lowerSearchWord = searchWord.toLowerCase();
      const isSearchMatch = hackathon.title
        .toLowerCase()
        .includes(lowerSearchWord); //if search bar is empty -> return true

      //check if hackthon properties matches filter

//no filter in date or the date value matches date of hackathon
      const isTagsMatch =
        filters.tags.length === 0 ||
        filters.tags.includes(hackathon.tags);
      const isPrizeAmountMatch =
        filters.prizeAmount.length === 0 ||
        filters.prizeAmount.includes(hackathon.prizeAmount);

      //only return hackathon if all conditions are matched
      return (
        isSearchMatch && isTagsMatch && isPrizeAmountMatch
      );
    });
  }, [searchWord, filters, dummyHackathons]);

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
            <FilterSideBar
              onFilterChange={handleFilter}
              activeFilters={filters}
            ></FilterSideBar>
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
          <FilterSideBar
            onFilterChange={handleFilter}
            activeFilters={filters}
          />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Explore;
