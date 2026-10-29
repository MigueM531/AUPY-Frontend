'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/features/common/components/Navbar';
import { Footer } from '@/features/common/components/Footer';
import { useChallengeDetail } from '@/features/challenges/hooks/useChallengeDetail';
import type { Difficulty } from '@/features/challenges/domain/challenge';

const difficultyLabels: Record<Difficulty, string> = {
  EASY: 'Principiante',
  MEDIUM: 'Intermedio',
  HARD: 'Avanzado',
};

const difficultyBadgeClasses: Record<Difficulty, string> = {
  EASY: 'border-[#2ea043]/40 bg-[#2ea043]/10 text-[#3fb950]',
  MEDIUM: 'border-[#d29922]/40 bg-[#d29922]/10 text-[#e3b341]',
  HARD: 'border-[#f85149]/40 bg-[#f85149]/10 text-[#f85149]',
};

export default function RetoDetailPage() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : (params?.id as string) || '';

  const { challenge, isLoading, error, isNotFound, refetch } = useChallengeDetail(id);

  return (
    <div className="flex min-h-screen flex-col bg-[#0d1117] text-[#c9d1d9]">
      <Navbar />

      <main className="flex-1 py-10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

          <div className="mb-6">
            <Link
              href="/competencias"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#8b949e] transition-colors hover:text-[#c9d1d9]"
            >
              &larr; Volver a Competencias
            </Link>
          </div>

          {isLoading && (
            <div className="animate-pulse rounded-lg border border-[#30363d] bg-[#161b22] p-8 space-y-6">
              <div className="flex gap-3">
                <div className="h-6 w-24 rounded bg-[#21262d]" />
                <div className="h-6 w-24 rounded bg-[#21262d]" />
                <div className="h-6 w-20 rounded bg-[#21262d]" />
              </div>
              <div className="h-8 w-2/3 rounded bg-[#21262d]" />
              <div className="space-y-3">
                <div className="h-4 w-full rounded bg-[#21262d]" />
                <div className="h-4 w-5/6 rounded bg-[#21262d]" />
                <div className="h-4 w-3/4 rounded bg-[#21262d]" />
              </div>
              <div className="h-20 w-full rounded bg-[#21262d]" />
            </div>
          )}

          {!isLoading && isNotFound && (
            <div
              role="alert"
              className="rounded-lg border border-[#30363d] bg-[#161b22] p-12 text-center"
            >
              <div className="font-mono text-3xl text-[#ffbd2e]">404 // NOT FOUND</div>
              <h1 className="mt-4 text-xl font-bold text-white">Reto no encontrado</h1>
              <p className="mt-2 text-sm text-[#8b949e]">
                El reto con identificador <code className="text-[#8957e5]">{id}</code> no existe en la base de datos o fue eliminado.
              </p>
              <div className="mt-6">
                <Link
                  href="/competencias"
                  className="rounded-md bg-[#8957e5] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#7a48d6]"
                >
                  Explorar catálogo de retos
                </Link>
              </div>
            </div>
          )}

          {!isLoading && !isNotFound && error && (
            <div
              role="alert"
              className="rounded-lg border border-[#f85149]/50 bg-[#f85149]/10 p-8 text-center"
            >
              <div className="font-mono text-2xl text-[#f85149]">[!] ERROR DE CARGA</div>
              <p className="mt-2 text-sm text-[#c9d1d9]">{error}</p>
              <button
                type="button"
                onClick={() => refetch()}
                className="mt-4 rounded-md bg-[#8957e5] px-4 py-2 text-xs font-semibold text-white hover:bg-[#7a48d6]"
              >
                Reintentar carga
              </button>
            </div>
          )}

          {!isLoading && !isNotFound && !error && challenge && (
            <article className="rounded-lg border border-[#30363d] bg-[#161b22] p-6 sm:p-8 shadow-lg">

              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="rounded-full border border-[#8957e5]/40 bg-[#8957e5]/10 px-3 py-1 font-mono text-xs font-semibold text-[#a371f7]">
                  #{challenge.category}
                </span>
                <span
                  className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                    difficultyBadgeClasses[challenge.difficulty] ||
                    'border-[#8957e5]/40 bg-[#8957e5]/10 text-[#a371f7]'
                  }`}
                >
                  {difficultyLabels[challenge.difficulty] || challenge.difficulty}
                </span>
                <span className="font-mono text-sm font-bold text-[#8957e5]">
                  {challenge.points} PTS
                </span>
              </div>

              
              <h1 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                {challenge.title}
              </h1>

            
              {challenge.imageUrl && (
                <div className="mt-4 overflow-hidden rounded-md border border-[#30363d] bg-[#0d1117]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={challenge.imageUrl}
                    alt={`Diagrama o recurso de ${challenge.title}`}
                    className="max-h-96 w-full object-contain p-2"
                  />
                </div>
              )}

              <div className="mt-4 border-t border-[#30363d] pt-4">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-[#8b949e]">
                  Descripción del Reto
                </h2>
                <p className="mt-2 text-base leading-relaxed text-[#c9d1d9] whitespace-pre-line">
                  {challenge.description}
                </p>
              </div>

            
              {challenge.writeup && (
                <div className="mt-6 rounded-md border border-[#30363d] bg-[#0d1117] p-4">
                  <h3 className="font-mono text-xs font-semibold uppercase text-[#e3b341]">
                    [i] Pista / Información Adicional
                  </h3>
                  <p className="mt-1 text-sm text-[#8b949e] font-mono">
                    {challenge.writeup}
                  </p>
                </div>
              )}

              
              <div className="mt-8 rounded-lg border border-[#30363d] bg-[#0d1117] p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-semibold text-[#c9d1d9]">
                    Enviar Solución (Flag)
                  </h2>
                  <span className="font-mono text-xs text-[#8b949e]">
                    Formato: AUPY&#123;...&#125;
                  </span>
                </div>

                <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                  <input
                    type="text"
                    disabled
                    placeholder="AUPY{tu_flag_aqui}"
                    className="flex-1 rounded-md border border-[#30363d] bg-[#161b22] px-3.5 py-2 font-mono text-sm text-[#8b949e] placeholder-[#6e7681] opacity-75 cursor-not-allowed"
                  />
                  <button
                    type="button"
                    disabled
                    className="rounded-md bg-[#8957e5]/50 px-4 py-2 text-sm font-semibold text-white opacity-60 cursor-not-allowed"
                  >
                    Enviar Flag
                  </button>
                </div>

                <div className="mt-3 flex items-center gap-2 text-xs text-[#8b949e]">
                  <span className="text-[#e3b341]">🔒</span>
                  <span>
                    El envío y registro de flags requiere iniciar sesión.{' '}
                    <Link href="/login" className="text-[#8957e5] hover:underline">
                      Inicia sesión
                    </Link>{' '}
                    o{' '}
                    <Link href="/registro" className="text-[#8957e5] hover:underline">
                      regístrate
                    </Link>{' '}
                    para participar.
                  </span>
                </div>
              </div>
            </article>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
