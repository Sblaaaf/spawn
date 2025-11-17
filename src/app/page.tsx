import HeroBanner from '../components/HeroBanner';
import MatchesSection from '../components/MatchesSection';
import RankingsSection from '../components/RankingsSection';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="relative z-10 pt-20 pb-16">
        {/* HERO + Stats bento */}
        <HeroBanner />

        {/* Matchs en cours et à venir */}
        <div id="matches">
          <MatchesSection />
        </div>

        {/* Classement meilleurs parieurs */}
        <div id="rankings">
          <RankingsSection />
        </div>

        <Footer />
      </div>
    </main>
  );
}