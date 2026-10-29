'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-[#30363d] bg-[#161b22]/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="font-mono text-xl font-bold text-[#8957e5] transition-transform group-hover:scale-110">
            &gt;_
          </span>
          <span className="text-lg font-bold tracking-tight text-[#c9d1d9] transition-colors group-hover:text-white">
            Are-U-Pwnd-Yet
          </span>
        </Link>

        <nav aria-label="Navegación principal">
          <ul className="flex items-center gap-1 sm:gap-4">
            <li>
              <Link
                href="/"
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  pathname === '/'
                    ? 'bg-[#21262d] text-[#8957e5] border border-[#30363d]'
                    : 'text-[#8b949e] hover:text-[#c9d1d9] hover:bg-[#21262d]/50'
                }`}
              >
                Inicio
              </Link>
            </li>
            <li>
              <Link
                href="/competencias"
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  pathname.startsWith('/competencias') || pathname.startsWith('/retos')
                    ? 'bg-[#21262d] text-[#8957e5] border border-[#30363d]'
                    : 'text-[#8b949e] hover:text-[#c9d1d9] hover:bg-[#21262d]/50'
                }`}
              >
                Competencias
              </Link>
            </li>
            <li>
              <Link
                href="/login"
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  pathname === '/login'
                    ? 'bg-[#21262d] text-[#8957e5] border border-[#30363d]'
                    : 'text-[#8b949e] hover:text-[#c9d1d9] hover:bg-[#21262d]/50'
                }`}
              >
                Ingresar
              </Link>
            </li>
            <li>
              <Link
                href="/registro"
                className="rounded-md bg-[#8957e5] px-3 py-1.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#7a48d6]"
              >
                Regístrate
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

