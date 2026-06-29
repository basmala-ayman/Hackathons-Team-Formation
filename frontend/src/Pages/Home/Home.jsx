import HeroSection from "./Components/HeroSection/HeroSection"
import Discover from "./Components/Discover/Discover"
import HowItWorks from "./Components/HowItWorks/HowItWorks"
import FAQ from "./Components/FAQ/FAQ"
import CTA from "./Components/CTA/CTA"
function Home() {
  return (
    <div className="">
      <HeroSection></HeroSection>
      <HowItWorks/>
      <Discover></Discover>
      <FAQ/>
      <CTA/>
    </div>
  )
}

export default Home
