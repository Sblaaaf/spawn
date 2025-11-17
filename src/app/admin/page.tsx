import Footer from '../../components/Footer';
import AdminGuard from '../../components/AdminGuard';
import MatchesManager from '../../components/MatchesManager';
import UsersManager from '../../components/UsersManager';

export default function AdminPage() {
  return (
    <AdminGuard>
      <main>
        <div className="morphing-gradient" />
        <div className="relative z-10">

          {/* Admin Panel */}
          <section className="pt-32 pb-24 px-6">
            <div className="max-w-7xl mx-auto">
              {/* Header */}
              <div className="mb-12">
                <h1 className="text-5xl heading-clash font-bold mb-2">
                  🔒 Panel Admin
                </h1>
                <p className="text-gray-400">
                  Gérer les matchs, utilisateurs et statistiques
                </p>
              </div>

              {/* Tabs */}
              <div className="space-y-12">
                <MatchesManager />
                <UsersManager />
              </div>
            </div>
          </section>

          <Footer />
        </div>
      </main>
    </AdminGuard>
  );
}
