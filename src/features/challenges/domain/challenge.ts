export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';

export type Category =
  | 'WEB'
  | 'CRYPTO'
  | 'FORENSICS'
  | 'REVERSING'
  | 'PWNING'
  | 'MISC'
  | 'OSINT'
  | 'STEGANOGRAPHY';

export interface Challenge {
  id: string;
  title: string;
  description: string;
  writeup?: string | null;
  imageUrl?: string | null;
  points: number;
  difficulty: Difficulty;
  category: Category;
  createdAt?: string;
  updatedAt?: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedChallengesResponse {
  success: boolean;
  data: Challenge[];
  pagination: PaginationMeta;
}

export interface ChallengeDetailResponse {
  success: boolean;
  data: Challenge;
}

