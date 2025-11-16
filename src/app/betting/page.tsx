import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ProtectedRoute from '../../components/ProtectedRoute';
import BettingCard from '../../components/BettingCard';
import { pb } from '../../lib/pocketbase';

async function getMatches() {
  try {
    const records = await pb.collection('matches').getFullList({
      expand: 'homeTeam,awayTeam,game',
      filter: 'status != "completed"',
      sort: 'start_date',
    });
    return records;
  } catch (error) {
    console.error('Erreur:', error);
    return [];
  }
}

export default async function BettingPage() {
  const matches = await getMatches();

  return (
    <ProtectedRoute>
      <main>
        <div className="morphing-gradient" />
        <div className="relative z-10">
          <Navbar />

          {/* Betting Page Content */}
          <section className="pt-32 pb-24 px-6">
            <div className="max-w-7xl mx-auto">
              {/* Header */}
              <div className="mb-12">
                <h1 className="text-5xl heading-clash font-bold mb-2">
                  Parier sur les matchs
                </h1>
                <p className="text-gray-400">
                  Sélectionne une équipe et place ton pari. Bonne chance !
                </p>
              </div>

              {/* Matches Grid */}
              {matches.length > 0 ? (
                <div className="bento-grid">
                  {matches.map((match: any) => (
                    <BettingCard
                      key={match.id}
                      matchId={match.id}
                      homeTeam={match.expand?.homeTeam?.name || 'Équipe 1'}
                      awayTeam={match.expand?.awayTeam?.name || 'Équipe 2'}
                      game={match.expand?.game?.name || 'Jeu'}
                      startDate={match.start_date}
                      status={match.status}
                      homeTeamId={match.homeTeam}
                      awayTeamId={match.awayTeam}
                    />
                  ))}
                </div>
              ) : (
                <div className="card-glass p-12 text-center">
                  <p className="text-gray-400">Aucun match disponible pour le moment</p>
                </div>
              )}
            </div>
          </section>

          <Footer />
        </div>
      </main>
    </ProtectedRoute>
  );
}
