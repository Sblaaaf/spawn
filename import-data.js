import PocketBase from 'pocketbase';
import fs from 'fs';

const pb = new PocketBase('https://renaud.pb.andy-cinquin.fr');

// Charge le fichier JSON
const dataPath = './data_esport_betting.json';
const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

// Map pour stocker les IDs (ancien ID -> nouveau ID PocketBase)
const idMap = {};

async function importData() {
  try {
    console.log('Démarrage de l\'import des données...\n');

    // 0. AUTHENTIFIER EN TANT QU'ADMIN
    console.log('Authentification admin...');
    const adminEmail = process.env.POCKETBASE_ADMIN_EMAIL || 'hello@sblaaaf.com';
    const adminPassword = process.env.POCKETBASE_ADMIN_PASSWORD || 'pocketbase123';
    
    try {
      await pb.admins.authWithPassword(adminEmail, adminPassword);
      console.log('Authentification admin réussie\n');
    } catch (authError) {
      console.error(' Erreur d\'authentification admin :', authError.message);
      console.error(' Vérifie que POCKETBASE_ADMIN_EMAIL et POCKETBASE_ADMIN_PASSWORD sont corrects');
      process.exit(1);
    }

    // 1. Importer les games
    console.log('Import des games...');
    for (const game of data.games) {
      const newGame = await pb.collection('games').create({
        name: game.name,
        category: game.category,
      });
      idMap[game.id] = newGame.id;
      console.log(`  ${game.name} créé (${newGame.id})`);
    }

    // 2. Importer les teams
    console.log('\nImport des teams...');
    for (const team of data.teams) {
      const newTeam = await pb.collection('teams').create({
        name: team.name,
        tag: team.tag,
        country: team.country,
        founded_year: team.founded_year,
        total_earnings: team.total_earnings,
      });
      idMap[team.id] = newTeam.id;
      console.log(`  ${team.name} créé (${newTeam.id})`);
    }

    // 3. Importer les tournaments
    console.log('\nImport des tournaments...');
    for (const tournament of data.tournaments) {
      const newTournament = await pb.collection('tournaments').create({
        name: tournament.name,
        game: idMap[tournament.game_id],
        prize_pool: tournament.prize_pool,
        start_date: tournament.start_date,
        end_date: tournament.end_date,
        location: tournament.location,
        status: tournament.status,
      });
      idMap[tournament.id] = newTournament.id;
      console.log(` ${tournament.name} créé (${newTournament.id})`);
    }

    // 4. Importer les matches
    console.log('\nImport des matches...');
    for (const match of data.matches) {
      const newMatch = await pb.collection('matches').create({
        tournament: idMap[match.tournament_id],
        homeTeam: idMap[match.team1_id],
        awayTeam: idMap[match.team2_id],
        game: idMap[match.game_id],
        start_date: match.match_date,
        status: match.status,
        homeScore: match.team1_score || 0,
        awayScore: match.team2_score || 0,
        format: match.format,
        winner: match.winner_id ? idMap[match.winner_id] : null,
      });
      idMap[match.id] = newMatch.id;
      console.log(`  Match créé (${newMatch.id})`);
    }

    // 5. Importer les utilisateurs (Auth collection)
    console.log('\nImport des utilisateurs...');
    for (const user of data.users) {
      const newUser = await pb.collection('users').create(
        {
          email: user.email,
          password: 'TempPassword123!',
          passwordConfirm: 'TempPassword123!',
          username: user.username,
          balance: user.balance || 1000,
        },
        {}
      );
      idMap[user.id] = newUser.id;
      console.log(`  ✓ ${user.username} créé (${newUser.id})`);
    }

    // 6. Importer les match_odds
    console.log('\n Import des match odds...');
    for (const odd of data.match_odds) {
      const newOdd = await pb.collection('match_odds').create({
        match: idMap[odd.match_id],
        team: idMap[odd.team_id],
        odds: odd.odds,
      });
      console.log(`  Odds créées (${newOdd.id})`);
    }

    // 7. Importer les bets
    console.log('\nImport des bets...');
    for (const bet of data.bets) {
      const newBet = await pb.collection('bets').create({
        user: idMap[bet.user_id],
        match: idMap[bet.match_id],
        team: idMap[bet.team_id],
        amount: bet.amount,
        odds: bet.odds,
        potential_payout: bet.potential_payout,
        status: bet.status,
      });
      console.log(`  Bet crées (${newBet.id})`);
    }

    console.log('\nImport terminé avec succès !');
  } catch (error) {
    console.error('Erreur lors de l\'import :', error.message);
    console.error(error);
  }
}

// Lancer l'import
importData();