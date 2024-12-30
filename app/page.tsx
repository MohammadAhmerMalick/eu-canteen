import Header from '@/sections/Header'
import Footer from '@/sections/Footer'
import HeroSection from '@/sections/HeroSection'
import OurMenuSection from '@/sections/OurMenuSection'
import MemoriesSection from '@/sections/MemoriesSection'
import QrBannerSection from '@/sections/QrBannerSection'
import FacilitiesSecion from '@/sections/FacilitiesSecion'
import AgentAssistance from '@/components/AgentAssistance'
import ExperienceSection from '@/sections/ExperienceSection'
import VideoBannerSection from '@/sections/VideoBannerSection'
import GreatServiceSection from '@/sections/GreatServiceSection'

const HomePage = () => {
  return (
    <div className="overflow-hidden bg-primary-light">
      <Header />
      <main className="mx-auto max-w-7xl px-4">
        <HeroSection />
        <AgentAssistance className="ml-auto mt-4" expended />
        <FacilitiesSecion />
        <QrBannerSection />
        <MemoriesSection />
        <ExperienceSection />
        <VideoBannerSection />
        <GreatServiceSection />
        <OurMenuSection />
      </main>
      <Footer />
    </div>
  )
}

export default HomePage
