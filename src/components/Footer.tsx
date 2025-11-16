export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/50 backdrop-blur">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="text-2xl heading-clash font-bold gradient-text mb-4">
              SPAWN
            </div>
            <p className="text-gray-400 text-sm">
              La plateforme n°1 pour parier sur l'esport
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="heading-clash font-semibold mb-4">Produit</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <a href="#" className="hover:accent-text transition-colors">
                  Matchs
                </a>
              </li>
              <li>
                <a href="#" className="hover:accent-text transition-colors">
                  Classement
                </a>
              </li>
              <li>
                <a href="#" className="hover:accent-text transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="heading-clash font-semibold mb-4">Communauté</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <a href="#" className="hover:accent-text transition-colors">
                  Discord
                </a>
              </li>
              <li>
                <a href="#" className="hover:accent-text transition-colors">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="hover:accent-text transition-colors">
                  Twitch
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="heading-clash font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <a href="#" className="hover:accent-text transition-colors">
                  Conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:accent-text transition-colors">
                  Confidentialité
                </a>
              </li>
              <li>
                <a href="#" className="hover:accent-text transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-500 text-sm">
            © 2024 SPAWN. Tous droits réservés.
          </p>
          <p className="text-gray-500 text-xs mt-4 md:mt-0">
            ⚠️ Pariez responsable. Vous devez être majeur.
          </p>
        </div>
      </div>
    </footer>
  );
}
