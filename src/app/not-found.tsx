import Link from 'next/link';
import { Navbar } from '@/features/common/components/Navbar';
import { Footer } from '@/features/common/components/Footer';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0d1117] text-[#c9d1d9]">
      <Navbar />

      <main className="flex flex-1 items-center justify-center py-16">
        <div className="mx-auto max-w-lg px-4 text-center">
          <div className="font-mono text-5xl font-extrabold text-[#8957e5]">404</div>
          <div className="mt-2 font-mono text-sm uppercase tracking-wider text-[#f85149]">
            
          </div>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-white">
            Página no encontrada
          </h1>
          <p className="mt-2 text-sm text-[#8b949e]">
            La ruta solicitada no existe, ha sido movida o no tienes permisos para visualizarla.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/"
              className="rounded-md bg-[#8957e5] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#7a48d6]"
            >
              Volver al Inicio
            </Link>
            <Link
              href="/competencias"
              className="rounded-md border border-[#30363d] bg-[#161b22] px-4 py-2 text-sm font-semibold text-[#c9d1d9] transition-colors hover:border-[#8957e5] hover:text-white"
            >
              Ver Competencias
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

