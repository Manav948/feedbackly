import HeroSection from '@/components/home/HeroSection'
import StatsBar from '@/components/home/StatsBar'
import FeaturesSection from '@/components/home/FeaturesSection'
import HowItWorks from '@/components/home/HowItWorks'
import CTASection from '@/components/home/CTASection'
import Footer from '@/components/home/Footer'
import { GlassNavbar } from '@/components/GlassNavbar'
import { AnimatedBackground } from '@/components/ui/AnimatedBackground'

export default function Home() {
  return (
    <div className="min-h-screen bg-black ">
      <AnimatedBackground variant="default" showGrid />
      <GlassNavbar />

      <main className="relative pt-16">
        <HeroSection />
        <StatsBar />
        <FeaturesSection />
        <HowItWorks />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}