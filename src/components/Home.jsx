import Navbar from './common/Navbar';
import Footer from './common/Footer';
import Hero from './home/Hero';
import ValueProps from './home/ValueProps';
import StartingLineup from './home/StartingLineup';
import Categories from './home/Categories';
import PromoBanner from './home/PromoBanner';
import BrandStory from './home/BrandStory';
import ValuePillars from './home/ValuePillars';
import BrandHighlights from './home/BrandHighlights';
import FaqSection from './home/FaqSection';
import Newsletter from './home/Newsletter';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#10131E] text-white flex flex-col font-sans selection:bg-[#C3F85C] selection:text-[#10131E]">
      {/* Header & Navigation */}
      <Navbar activePage="home" />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. Value Propositions Bar (3 Pillars) */}
        <ValueProps />

        {/* 3. Featured Classics / Starting Lineup */}
        <StartingLineup />

        {/* 4. Product Categories */}
        <Categories />

        {/* 5. Promotional Highlight Banner */}
        <PromoBanner />

        {/* 6. Brand Story & Visual */}
        <BrandStory />

        {/* 7. Value Pillars (Light Cream Section) */}
        <ValuePillars />

        {/* 8. Retro Brand Typographic Highlights */}
        <BrandHighlights />

        {/* 9. FAQ / Player Support Section */}
        <FaqSection />

        {/* 10. Newsletter Signup Banner */}
        <Newsletter />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
