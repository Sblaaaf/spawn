// src/app/page.tsx
import { pb } from '../lib/pocketbase';

export default async function Home() {
  const records = await pb.collection('test').getFullList({ sort: '-created' });

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Spawn - POC Esport</h1>
      <h2 className="text-xl mb-2">Test de connexion PocketBase</h2>
      <ul className="list-disc pl-6">
        {records.map((record) => (
          <li key={record.id}>{record.title}</li>
        ))}
      </ul>
    </main>
  );
}
