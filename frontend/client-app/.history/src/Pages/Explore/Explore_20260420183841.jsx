import { useState } from "react";
import HackathonCard from "./Components/HackathonCard/HackathonCard";
import SearchBar from "./Components/SearchBar/SearchBar";

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
  const [searchWord, setSearchWord] = useState("");
  const handleSearch = (word) => {
    setSearchWord(word);
  };
  return (
    <div className="d-flex">
      {/* <HackathonCard hackathon={dummyHackathon}></HackathonCard> */}
      {/* <SearchBar onSearch={handleSearch}></SearchBar> */}
    <
    </div>
  );
}

export default Explore;
