import Link from 'next/link';
import type { Challenge, Difficulty } from '../domain/challenge';

interface ChallengeCardProps {
  challenge: Challenge;
}

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

export function ChallengeCard({ challenge }: ChallengeCardProps) {
  const difficultyLabel = difficultyLabels[challenge.difficulty] || challenge.difficulty;
  const badgeClass =
    difficultyBadgeClasses[challenge.difficulty] ||
    'border-[#8957e5]/40 bg-[#8957e5]/10 text-[#a371f7]';

  return (
    <article className="flex flex-col justify-between rounded-lg border border-[#30363d] bg-[#161b22] p-6 shadow-sm transition-all hover:border-[#8957e5]/60 hover:shadow-md">
      <div>
        <div className="flex items-center justify-between gap-2">
          <span
            className={`inline-block rounded-full border px-2.5 py-0.5 text-xs font-semibold ${badgeClass}`}
          >
            {difficultyLabel}
          </span>
          <span className="font-mono text-sm font-bold text-[#8957e5]">
            {challenge.points} PTS
          </span>
        </div>

        <h2 className="mt-3 text-lg font-semibold text-[#c9d1d9] group-hover:text-white">
          {challenge.title}
        </h2>

        <p className="mt-2 line-clamp-3 text-sm text-[#8b949e]">
          {challenge.description}
        </p>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-[#30363d] pt-4">
        <span className="font-mono text-xs text-[#8b949e]">
          #{challenge.category}
        </span>
        <Link
          href={`/retos/${challenge.id}`}
          className="rounded-md bg-[#8957e5] px-3.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#7a48d6]"
        >
          Iniciar Reto
        </Link>
      </div>
    </article>
  );
}

