/* import { pb } from '../lib/pocketbase'; */
import Navbar from '../components/Navbar';
import HeroBanner from '../components/HeroBanner';
import MatchesSection from '../components/MatchesSection';
import RankingsSection from '../components/RankingsSection';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <main>
      {/* Background morphing gradient */}
      <div className="morphing-gradient" />

      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <HeroBanner />
        <MatchesSection />
        <RankingsSection />
        <Footer />
      </div>
    </main>
  );
}
