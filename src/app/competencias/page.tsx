'use client';

import { Suspense, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Navbar } from '@/features/common/components/Navbar';
import { Footer } from '@/features/common/components/Footer';
import { ChallengeCard } from '@/features/challenges/components/ChallengeCard';
import { Pagination } from '@/features/common/components/Pagination';
import { useChallenges } from '@/features/challenges/hooks/useChallenges';
import type { Difficulty } from '@/features/challenges/domain/challenge';

function CompetenciasContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Leer página de la URL (?page=N)
  const pageParam = searchParams.get('page');
  const currentPage = Math.max(1, parseInt(pageParam || '1', 10) || 1);

  // Hook centralizado que consume GET /challenges?page=N&limit=10 a través de challengeService
  const { challenges, pagination, isLoading, error, refetch } = useChallenges(currentPage, 10);

  // Filtros locales complementarios de búsqueda y dificultad (igual que Entrega 1)
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('ALL');

  const filteredChallenges = useMemo(() => {
    return challenges.filter((reto) => {
      const matchText =
        reto.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reto.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reto.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchDifficulty =
        selectedDifficulty === 'ALL' || reto.difficulty === selectedDifficulty;

      return matchText && matchDifficulty;
    });
  }, [challenges, searchTerm, selectedDifficulty]);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.push(`/competencias?${params.toString()}`);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#0d1117] text-[#c9d1d9]">
      <Navbar />

      <main className="flex-1 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* CATALOG HERO */}
          <div className="text-center sm:text-left">
            <span className="inline-block rounded-full border border-[#8957e5]/40 bg-[#8957e5]/10 px-3 py-1 text-xs font-semibold text-[#a371f7]">
              Catálogo
            </span>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Competencias CTF y Laboratorios
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-[#8b949e] sm:text-base">
              Explora retos reales. Filtra por categoría, dificultad o palabra clave
              para poner a prueba tus habilidades de seguridad informática.
            </p>
          </div>

          {/* FILTERS SECTION */}
          <section
            aria-label="Filtros de búsqueda de competencias"
            className="mt-8 rounded-lg border border-[#30363d] bg-[#161b22] p-4 sm:p-6"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              {/* Buscador */}
              <div className="flex-1">
                <label htmlFor="search-input" className="sr-only">
                  Buscar por título o categoría
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-[#8b949e]">
                    🔍
                  </span>
                  <input
                    id="search-input"
                    type="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar por título, tag o tecnología (ej. Web, OSINT)..."
                    className="w-full rounded-md border border-[#30363d] bg-[#0d1117] py-2 pl-9 pr-4 text-sm text-[#c9d1d9] placeholder-[#8b949e] focus:border-[#8957e5] focus:outline-none focus:ring-1 focus:ring-[#8957e5]"
                  />
                </div>
              </div>

              {/* Botones de Dificultad */}
              <div
                className="flex flex-wrap items-center gap-2"
                role="group"
                aria-label="Filtrar por dificultad"
              >
                <button
                  type="button"
                  onClick={() => setSelectedDifficulty('ALL')}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                    selectedDifficulty === 'ALL'
                      ? 'bg-[#8957e5] text-white'
                      : 'border border-[#30363d] bg-[#0d1117] text-[#8b949e] hover:border-[#8957e5] hover:text-[#c9d1d9]'
                  }`}
                >
                  Todas
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedDifficulty('EASY' as Difficulty)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                    selectedDifficulty === 'EASY'
                      ? 'bg-[#2ea043] text-white'
                      : 'border border-[#30363d] bg-[#0d1117] text-[#8b949e] hover:border-[#2ea043] hover:text-[#c9d1d9]'
                  }`}
                >
                  Principiante
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedDifficulty('MEDIUM' as Difficulty)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                    selectedDifficulty === 'MEDIUM'
                      ? 'bg-[#d29922] text-white'
                      : 'border border-[#30363d] bg-[#0d1117] text-[#8b949e] hover:border-[#d29922] hover:text-[#c9d1d9]'
                  }`}
                >
                  Intermedio
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedDifficulty('HARD' as Difficulty)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                    selectedDifficulty === 'HARD'
                      ? 'bg-[#f85149] text-white'
                      : 'border border-[#30363d] bg-[#0d1117] text-[#8b949e] hover:border-[#f85149] hover:text-[#c9d1d9]'
                  }`}
                >
                  Avanzado
                </button>
              </div>
            </div>

            {/* Contador de resultados */}
            <div className="mt-4 border-t border-[#30363d] pt-3 text-xs text-[#8b949e]" aria-live="polite">
              {isLoading ? (
                <span>Consultando retos</span>
              ) : error ? (
                <span className="text-[#f85149]">Error al consultar retos.</span>
              ) : (
                <span>
                  Mostrando {filteredChallenges.length} de {challenges.length} retos en esta página
                  {pagination ? ` (${pagination.total} retos totales en la plataforma)` : ''}.
                </span>
              )}
            </div>
          </section>

          {/* ESTADO DE CARGA */}
          {isLoading && (
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse rounded-lg border border-[#30363d] bg-[#161b22] p-6 space-y-4"
                >
                  <div className="flex justify-between items-center">
                    <div className="h-4 w-20 rounded bg-[#21262d]" />
                    <div className="h-4 w-12 rounded bg-[#21262d]" />
                  </div>
                  <div className="h-5 w-3/4 rounded bg-[#21262d]" />
                  <div className="space-y-2">
                    <div className="h-3 w-full rounded bg-[#21262d]" />
                    <div className="h-3 w-5/6 rounded bg-[#21262d]" />
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-[#30363d]">
                    <div className="h-3 w-16 rounded bg-[#21262d]" />
                    <div className="h-7 w-24 rounded bg-[#21262d]" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {!isLoading && error && (
            <div
              role="alert"
              className="mt-8 rounded-lg border border-[#f85149]/50 bg-[#f85149]/10 p-6 text-center"
            >
              <div className="font-mono text-2xl text-[#f85149]">[!] ERROR DE CONEXIÓN</div>
              <p className="mt-2 text-sm text-[#c9d1d9]">{error}</p>
              <button
                type="button"
                onClick={() => refetch()}
                className="mt-4 inline-flex items-center rounded-md bg-[#8957e5] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#7a48d6]"
              >
                Reintentar conexión
              </button>
            </div>
          )}


          {!isLoading && !error && filteredChallenges.length === 0 && (
            <div
              role="status"
              className="mt-12 rounded-lg border border-dashed border-[#30363d] bg-[#161b22]/50 p-12 text-center"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#21262d] text-2xl" aria-hidden="true">
                🔍
              </div>
              <h2 className="mt-4 text-lg font-semibold text-white">No se encontraron retos</h2>
              <p className="mt-1 text-sm text-[#8b949e]">
                Intenta ajustar tus términos de búsqueda o selecciona otro filtro de dificultad.
              </p>
              {(searchTerm || selectedDifficulty !== 'ALL') && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedDifficulty('ALL');
                  }}
                  className="mt-4 rounded-md border border-[#30363d] bg-[#161b22] px-3.5 py-1.5 text-xs font-semibold text-[#c9d1d9] hover:border-[#8957e5] hover:text-white"
                >
                  Limpiar filtros
                </button>
              )}
            </div>
          )}


          {!isLoading && !error && filteredChallenges.length > 0 && (
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredChallenges.map((challenge) => (
                <ChallengeCard key={challenge.id} challenge={challenge} />
              ))}
            </div>
          )}


          {!isLoading && !error && pagination && (
            <Pagination
              currentPage={pagination.page}
              totalPages={pagination.totalPages}
              totalItems={pagination.total}
              onPageChange={handlePageChange}
              isLoading={isLoading}
            />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function CompetenciasPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#0d1117] text-[#c9d1d9]">
          <div className="font-mono text-sm text-[#8b949e] animate-pulse">
            &gt;_ Cargando catálogo de competencias...
          </div>
        </div>
      }
    >
      <CompetenciasContent />
    </Suspense>
  );
}

