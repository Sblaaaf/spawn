export default function HeroBanner() {
  return (
    <section className="relative min-h-screen pt-24 px-6 flex items-center justify-center overflow-hidden">
      {/* Glow elements */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Logo */}
        <div className="mb-8 inline-block">
          <div className="text-6xl md:text-8xl heading-clash font-bold">
            <span className="gradient-text">SPAWN</span>
          </div>
          <div className="text-lg md:text-xl text-gray-400 mt-2">
            Spawn In, Cash Out!
          </div>
        </div>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
          Parie sur les matchs esport les plus épiques, défie la communauté et remporte des gains.
          <br />
          <span className="accent-text font-semibold">Bienvenue dans SPAWN.</span>
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <button className="btn-accent text-lg px-8 py-4">
            Commencer à parier
          </button>
          <button className="px-8 py-4 border-2 border-[var(--accent)] text-[var(--accent)] font-semibold rounded-lg hover:bg-[var(--accent)]/10 transition-all duration-200">
            Découvrir
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {[
            { label: 'Matchs', value: '150+' },
            { label: 'Utilisateurs', value: '5K+' },
            { label: 'Jeux', value: '10+' },
            { label: 'Tournois', value: '50+' },
          ].map((stat) => (
            <div key={stat.label} className="card-glass p-4">
              <div className="text-2xl md:text-3xl heading-clash font-bold gradient-text">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400 mt-2">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
