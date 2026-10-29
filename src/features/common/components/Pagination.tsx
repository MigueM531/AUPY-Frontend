'use client';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  onPageChange: (newPage: number) => void;
  isLoading?: boolean;
}

export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  onPageChange,
  isLoading = false,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <nav
      className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-[#30363d] pt-6 sm:flex-row"
      aria-label="Paginación de retos"
    >
      <div className="text-sm text-[#8b949e]">
        Mostrando página <span className="font-semibold text-[#c9d1d9]">{currentPage}</span> de{' '}
        <span className="font-semibold text-[#c9d1d9]">{totalPages}</span> ({totalItems} retos en total)
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1 || isLoading}
          className="rounded-md border border-[#30363d] bg-[#161b22] px-3 py-1.5 text-xs font-semibold text-[#c9d1d9] transition-colors hover:border-[#8957e5] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          &larr; Anterior
        </button>

        <span className="font-mono text-xs text-[#8b949e]">
          [{currentPage}/{totalPages}]
        </span>

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages || isLoading}
          className="rounded-md border border-[#30363d] bg-[#161b22] px-3 py-1.5 text-xs font-semibold text-[#c9d1d9] transition-colors hover:border-[#8957e5] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          Siguiente &rarr;
        </button>
      </div>
    </nav>
  );
}

