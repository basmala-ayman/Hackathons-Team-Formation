import HackathonCard from "./Components/HackathonCard/HackathonCard";

function Explore() {
  const dummyHackathon = {
  title: "AI Innovation Challenge 2026",
  prizeAmount: "$10,000",
  image: "https://via.placeholder.com/300x200",
  date: "May 15 - May 20, 2026",
  teamSize: "2-5 members",
  level: "Intermediate"
};
  return (
    <div>
      <HackathonCard hackathon={dummyHackathon}></HackathonCard>
    </div>
  )
}

export default Explore;
