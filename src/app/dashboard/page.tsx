import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ProtectedRoute from '../../components/ProtectedRoute';
import DashboardStats from '../../components/DashboardStats';
import MyBets from '../../components/MyBets';

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <main>
        <div className="morphing-gradient" />
        <div className="relative z-10">
          <Navbar />

          {/* Dashboard Content */}
          <section className="pt-32 pb-24 px-6">
            <div className="max-w-7xl mx-auto">
              {/* Header */}
              <div className="mb-12">
                <h1 className="text-5xl heading-clash font-bold mb-2">
                  Mon Dashboard
                </h1>
                <p className="text-gray-400">
                  Suivi de tes paris et de tes performances
                </p>
              </div>

              {/* Stats */}
              <DashboardStats />

              {/* My Bets */}
              <MyBets />
            </div>
          </section>

          <Footer />
        </div>
      </main>
    </ProtectedRoute>
  );
}
