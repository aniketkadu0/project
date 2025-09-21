export interface TimeRecord {
  id: string;
  date: string;
  inTime: string;
  outTime?: string;
  totalMinutes: number;
  isActive: boolean;
  targetReached: boolean;
}

export interface TimerState {
  isRunning: boolean;
  startTime: number | null;
  elapsedTime: number;
  currentRecord: TimeRecord | null;
}