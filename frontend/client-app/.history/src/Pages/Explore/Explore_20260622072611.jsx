import styles from "./Explore.module.css";
import { useState } from "react";
import { Container, Row, Col, Offcanvas } from "react-bootstrap";
import SearchBar from "../../shared/SearchBar/SearchBar";
import FilterSideBar from "./Components/FilterSideBar/FilterSideBar";
import HackathonGrid from "./Components/HackathonGrid/HackathonGrid";
import { FilterIcon } from "../../assets/Icons";
import useHackathons from "./hooks/useHackathons";
import useHackathonFilters from "./hooks/useHackathonFilters";
import useHackathonInterest from "./hooks/useHackathonInterest";

import { LoadingState, EmptyState } from "../../shared/States";

function Explore() {
  const { hackathons, loading, error } = useHackathons();
  const { filters, handleSearch, handleFilter, filteredHackathons } =
    useHackathonFilters(hackathons);
  const { registerInterest, loadingInterest } = useHackathonInterest();

  //handle SearchFilter component on small screens
  const [openMobileFilter, setOpenMobileFilter] = useState(false);

   const handleInterest = async () => {
      if (loading || isInterested) return; // prevent double click
      try {
        const response = await registerInterest(id);
        setIsInterested(true);
        // console.log(response.message);
        toast.success("Interest submitted");
      } catch (error) {
        const backendMessage = error.message;
  
        if (backendMessage) {
          toast.error(backendMessage);
        } else {
          toast.error("Something went wrong. Please try again.");
        }
        // console.log(error);
      }
    };
  const handleOpenedFilters = () => {
    setOpenMobileFilter(true);
  };
  const handleColsedFilters = () => {
    setOpenMobileFilter(false);
  };

  if (loading) {
    return <LoadingState message=" Loading Hackathons..." />;
  }
  if (error) {
    return <EmptyState message="No hackathons found" />;
  }

  return (
    <div className={styles.pageBackground}>
      <Container className="my-5">
        {/* search part */}
        <Row>
          <h3
            className="fw-bolder"
            style={{
              color: "var(--color-very-dark-purple)",
              fontSize: "var(--fs-h3)",
            }}
          >
            Explore Hackathons
          </h3>

          <SearchBar
            onSearch={handleSearch}
            placeholderText={"Search by hackathon title or keyword"}
          ></SearchBar>
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

              <h5 className="fs-2 fw-medium ms-3">
                {hackathons.length} Hackathons found
              </h5>
            </div>
            {/* <HackathonGrid hackathons={hackathons}></HackathonGrid> */}
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
    </div>
  );
}

export default Explore;
