# 🎮 Spawn - Plateforme de Paris E-sportifs

**Spawn** est une plateforme de paris en ligne dédiée aux e-sports, développée avec Next.js, React et Tailwind CSS. Cette application permet aux utilisateurs de parier sur leurs équipes e-sportives favorites et offre une interface d'administration complète pour la gestion des équipes et des matchs.

## 🚀 Vue d'ensemble du projet

Ce projet est développé dans le cadre d'un module de validation pour l'obtention d'une licence en informatique. L'objectif est de créer un POC (Proof of Concept) fonctionnel d'une plateforme de paris e-sportifs avec une interface moderne et intuitive.

### Aperçu Design

## 🎯 Fonctionnalités principales

### 🏠 Landing Page
- Présentation claire de la plateforme
- Interface gaming moderne avec thème sombre
- Navigation intuitive vers les différentes sections

### 👨‍💼 Interface d'administration
- **Gestion des équipes** :
  - Création de nouvelles équipes
  - Upload d'images de profil des équipes
  - Modification des équipes existantes
  - Suppression d'équipes
- **Gestion des matchs** :
  - Ajout de nouveaux matchs
  - Modification des matchs en cours
  - Suppression de matchs

### 🎰 Interface visiteur
- **Paris sur les matchs** :
  - Visualisation des matchs ouverts aux paris
  - Placement d'offres de paris
  - Suivi des cotes en temps réel
- **Résultats et statistiques** :
  - Consultation des résultats des matchs
  - Visualisation des gains et pertes
  - Historique des paris

## 🛠️ Stack technique

### Frontend
- **Next.js 14** - Framework React avec App Router
- **React 18** - Bibliothèque JavaScript pour l'interface utilisateur
- **Tailwind CSS** - Framework CSS utility-first
- **TypeScript** - Typage statique pour JavaScript

### Backend
- **Next.js API Routes** - API intégrée
- **Prisma** - ORM moderne pour la base de données
- **SQLite** - Base de données légère pour le développement

### Outils de développement
- **ESLint** - Linting pour la qualité du code
- **Prettier** - Formatage automatique du code
- **Husky** - Git hooks pour l'automatisation

## 📊 Base de données

La base de données comprend les entités principales suivantes :

- **Games** - Jeux e-sportifs (LoL, CS2, Valorant, etc.)
- **Teams** - Équipes professionnelles
- **Players** - Joueurs et streamers
- **Matches** - Matchs e-sportifs
- **Bets** - Paris des utilisateurs
- **Users** - Utilisateurs de la plateforme
- **Tournaments** - Tournois e-sportifs

### Données de test incluses
- Équipes françaises e-sport (Vitality, Karmine Corp, LDLC, etc.)
- Joueurs professionnels et streamers populaires
- Matchs avec statuts variés (terminés, en cours, à venir)
- Utilisateurs de test avec historique de paris

## 🚀 Installation et lancement

### Prérequis
- Node.js (version 18 ou supérieure)
- npm ou yarn
- Git

### Étapes d'installation

1. **Cloner le repository**
   ```bash
   git clone https://github.com/votre-username/spawn.git
   cd spawn
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Configurer les variables d'environnement**
   ```bash
   cp .env.example .env.local
   ```
   Éditer le fichier `.env.local` avec vos configurations.

4. **Initialiser la base de données**
   ```bash
   npx prisma db push
   npx prisma db seed
   ```

5. **Lancer le serveur de développement**
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

6. **Accéder à l'application**
   Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 📁 Structure du projet

```
spawn/
├── app/                    # App Router de Next.js
│   ├── admin/             # Pages d'administration
│   ├── api/               # API Routes
│   ├── betting/           # Pages de paris
│   └── globals.css        # Styles globaux
├── components/            # Composants React réutilisables
│   ├── ui/               # Composants UI de base
│   └── forms/            # Composants de formulaires
├── lib/                  # Utilitaires et configurations
│   ├── prisma.ts         # Configuration Prisma
│   └── utils.ts          # Fonctions utilitaires
├── prisma/               # Configuration de la base de données
│   ├── schema.prisma     # Schéma de la base de données
│   └── seed.ts           # Données de test
├── public/               # Assets statiques
└── types/                # Définitions TypeScript
```

## 🎨 Design et UX/UI

Le design suit les principes suivants :
- **Thème sombre** pour une expérience gaming immersive
- **Interface minimaliste** pour une navigation intuitive
- **Design moderne** avec des éléments UI gaming
- **Responsive** adapté à tous les écrans
- **Accessibilité** respectant les standards WCAG

### Palette de couleurs
- Couleurs primaires : Verts gaming (#00FF88, #1a5f3f)
- Arrière-plans : Dégradés de gris foncé
- Accents : Jaune pour les éléments importants
- Texte : Blanc et gris clair pour la lisibilité

## 🔒 Sécurité

Les mesures de sécurité implémentées incluent :
- Validation et sanitisation des données d'entrée
- Gestion des erreurs avec try/catch
- Variables d'environnement pour les données sensibles
- Validation côté client et serveur

## 📈 Performance

Optimisations mises en place :
- Lazy loading des composants
- Optimisation des images avec Next.js Image
- Code splitting automatique
- Mise en cache des requêtes API

## 🧪 Tests et qualité du code

- **ESLint** pour le respect des conventions de codage
- **Prettier** pour le formatage automatique
- **TypeScript** pour la sécurité des types
- Architecture modulaire avec séparation des responsabilités

## 📚 Documentation technique

### API Endpoints principales
- `GET /api/teams` - Récupérer toutes les équipes
- `POST /api/teams` - Créer une nouvelle équipe
- `GET /api/matches` - Récupérer les matchs
- `POST /api/bets` - Placer un pari
- `GET /api/users/[id]/stats` - Statistiques utilisateur

### Composants clés
- `MatchCard` - Affichage des informations de match
- `BettingForm` - Formulaire de paris
- `TeamManager` - Gestion des équipes (admin)
- `StatsPanel` - Affichage des statistiques

## 🤝 Contribution

Ce projet étant un travail académique, les contributions externes ne sont pas acceptées. Cependant, les retours et suggestions sont les bienvenus pour améliorer le code et l'architecture.

## 📄 Licence

© Sblaaaf! - Tous droits réservés.

## 👥 Équipe

- **Développeur principal** : Renaud L. alias Sblaaaf!
- **Établissement** : EPSI - B3 DEVAI

## 🎯 Objectifs pédagogiques atteints

- ✅ Architecture et structure du projet
- ✅ Code fonctionnel avec gestion d'erreurs
- ✅ Performance et optimisations de base
- ✅ Documentation technique complète
- ✅ Interface utilisateur moderne et responsive
- ✅ Choix techniques justifiés
- ✅ Utilisation appropriée des outils modernes
- ✅ Sécurité de base implémentée

## 📞 Contact

Pour toute question concernant ce projet :
GitHub : [sblaaaf]

---

**Spawn** - Votre plateforme de paris e-sportifs de nouvelle génération 🎮🏆