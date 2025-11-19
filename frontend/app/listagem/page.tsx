// frontend/app/alimentos/page.tsx
'use client'

import { useEffect, useState } from "react";

type Food = {
  id: number;
  nome: string;
  calorias: number;
  proteinas: number;
  carboidratos: number;
  gorduras: number;
}

export default function ListaAlimentos() {
  const [alimentos, setAlimentos] = useState<Food[]>([]);
  useEffect(() => {
    fetch('http://localhost:5000/alimentos')
      .then(res => res.json())
      .then(setAlimentos);
  }, []);

  return (
    <main className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Alimentos</h1>
      <a href="/alimentos/novo" className="block mb-4 text-center bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
        + Adicionar alimento
      </a>
      <ul className="space-y-3">
        {alimentos.map((a) => (
          <li key={a.id} className="bg-white rounded shadow p-3 flex flex-col">
            <span className="font-semibold">{a.nome}</span>
            <span className="text-sm text-gray-600">{a.calorias} kcal</span>
          </li>
        ))}
      </ul>
    </main>
  );
}
