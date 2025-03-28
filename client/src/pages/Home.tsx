import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import PortfolioSection from '@/components/PortfolioSection';
import AIShowcaseSection from '@/components/AIShowcaseSection';
import InnovationTimelineSection from '@/components/InnovationTimelineSection';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="font-inter text-[#1A1F36] bg-background">
      <Header />
      <HeroSection />
      <PortfolioSection />
      <AIShowcaseSection />
      <InnovationTimelineSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
