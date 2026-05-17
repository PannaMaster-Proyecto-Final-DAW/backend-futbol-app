export enum AttemptStatus {
  PENDING = 'pending',
  WON = 'won',
  LOST = 'lost',
}

export interface UserGameAttempt {
  id: string;
  userId: string;
  date: string;
  gameId: string;
  modeId: string;
  score: number;
  status: AttemptStatus;
  history?: any;
}
