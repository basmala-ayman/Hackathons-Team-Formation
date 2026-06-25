import HeroSection from "./Components/HeroSection/HeroSection"
import Discover from "./Components/Discover/Discover"
import HowItWorks from "./Components/HowItWorks/HowItWorks"
function Home() {
  return (
    <div className="">
      <HeroSection></HeroSection>
      <HowItWorks/>
      <Discover></Discover>
    </div>
  )
}

export default Home
