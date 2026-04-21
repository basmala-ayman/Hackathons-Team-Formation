import HackathonCard from "./Components/HackathonCard/HackathonCard";

function Explore() {
  const dummyHackathon = {
  title: "AI Innovation Challenge 2026",
  prizeAmount: "$10,000",
  image: "/public/dummy.png",
  date: "May 15 - May 20, 2026",
  teamSize: "2-5 members",
  level: "Intermediate"
};
  return (
    <div className="d-flex">
      <HackathonCard hackathon={dummyHackathon}></HackathonCard>
      <HackathonCard hackathon={dummyHackathon}></HackathonCard>
          <HackathonCard hackathon={dummyHackathon}></HackathonCard>
      <HackathonCard hackathon={dummyHackathon}></HackathonCard>
      <HackathonCard hackathon={dummyHackathon}></HackathonCard>

    </div>
  )
}

export default Explore;
