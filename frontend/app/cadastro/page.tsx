// frontend/app/alimentos/page.tsx
'use client'

import { useEffect, useState } from "react";

type Food = {
  id: number; nome: string;
  calorias: number; proteinas: number;
  carboidratos: number; gorduras: number;
};

export default function ListaAlimentos() {
  const [alimentos, setAlimentos] = useState<Food[]>([]);
  useEffect(() => { fetch('http://localhost:5000/alimentos').then(res => res.json()).then(setAlimentos); }, []);

  return (
    <main className="px-4 py-8 bg-white min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center">Alimentos</h1>
      <div className="flex justify-center mb-6">
        <a href="/alimentos/novo" className="py-2 px-6 bg-green-700 text-white rounded-full shadow hover:bg-green-800 font-medium">Novo alimento</a>
      </div>
      <ul className="grid gap-6">
        {alimentos.map(a => (
          <li key={a.id} className="rounded-2xl shadow-md bg-[#fbfbfb] p-5 flex flex-col items-start border border-gray-100">
            <span className="text-xl font-semibold text-green-800 mb-1">{a.nome}</span>
            <span className="text-xs text-neutral-500">{a.calorias} kcal &bull; Prot: {a.proteinas}g &bull; Carb: {a.carboidratos}g &bull; Gord: {a.gorduras}g</span>
          </li>
        ))}
      </ul>
    </main>
  );
}
