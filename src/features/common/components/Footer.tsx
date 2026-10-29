import Link from 'next/link';

export function Footer() {
  return (
    <footer className="mt-auto border-t border-[#30363d] bg-[#161b22] py-8 text-[#8b949e]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-lg font-bold text-[#8957e5]">&gt;_</span>
              <span className="font-bold text-[#c9d1d9]">Are-U-Pwnd-Yet</span>
            </div>
            <p className="mt-2 text-sm text-[#8b949e]">
              Comunidad estudiantil de ciberseguridad y CTF.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#c9d1d9]">
              Navegación
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-[#c9d1d9] transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/competencias" className="hover:text-[#c9d1d9] transition-colors">
                  Competencias
                </Link>
              </li>
              <li>
                <Link href="/registro" className="hover:text-[#c9d1d9] transition-colors">
                  Regístrate
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#c9d1d9]">
              Legal
            </h3>
            <p className="mt-3 text-sm text-[#8b949e]">
              Diseñado para fines educativos. Plataforma de retos prácticos de ciberseguridad.
            </p>
            <p className="mt-2 text-xs text-[#8b949e]">
              &copy; {new Date().getFullYear()} Are-U-Pwnd-Yet. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

