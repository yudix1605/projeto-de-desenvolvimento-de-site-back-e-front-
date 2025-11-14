// frontend/app/page.tsx
export default function Home() {
  return (
    <main className="flex flex-col items-center min-h-screen pt-16 pb-8 bg-gradient-to-br from-white to-[#f4f7fa]">
      <header className="mb-12 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-3 tracking-tight">Alimente sua saúde<br/><span className="text-primary-500">com equilíbrio</span></h1>
        <p className="text-base text-neutral-500 max-w-md mx-auto">Gerencie sua dieta e veja sua evolução com praticidade.</p>
      </header>
      <div className="flex flex-col w-full max-w-sm gap-4 my-8">
        <a href="/alimentos" className="rounded-xl py-4 px-4 bg-green-700 text-white text-lg font-semibold hover:bg-green-800 transition">Ver Alimentos</a>
        <a href="/alimentos/novo" className="rounded-xl py-4 px-4 bg-gray-200 text-green-800 text-lg font-semibold border border-green-200 hover:bg-green-50 transition">Novo alimento</a>
      </div>
      <footer className="mt-auto text-neutral-400 text-sm pt-12">© 2025 DietaApp</footer>
    </main>
  );
}
