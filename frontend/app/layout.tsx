
import Link from 'next/link';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <body>
        <header>
          <nav style={{
            display: 'flex',
            gap: 24,
            padding: 12,
            background: '#1a1a1a',
            alignItems: 'center'
          }}>
            <Link href="/" style={{ color: "#fff" }}>Home</Link>
            <Link href="/cadastro" style={{ color: "#fff" }}>Cadastro</Link>
            <Link href="/login" style={{ color: "#fff" }}>Login</Link>
            <Link href="/tela01" style={{ color: "#fff" }}>Tela 01</Link>
            <Link href="/tela02" style={{ color: "#fff" }}>Tela 02</Link>
          </nav>
        </header>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}

