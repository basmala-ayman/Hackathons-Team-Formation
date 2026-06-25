import HeroSection from "./Components/HeroSection/HeroSection"
import Discover from "./Components/Discover/Discover"
import HowItWorks from "./Components/HowItWorks/HowItWorks"
import FAQ from "./Components/FAQ/FAQ"
function Home() {
  return (
    <div className="">
      <HeroSection></HeroSection>
      <HowItWorks/>
      <Discover></Discover>
      <FAQ/>
    </div>
  )
}

export default Home
