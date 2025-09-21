export const formatTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};

export const formatTimeHHMM = (date: Date): string => {
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const getTodayDateString = (): string => {
  return new Date().toISOString().split("T")[0];
};

export const getProgressPercentage = (minutes: number): number => {
  const targetMinutes = 3.5 * 60; // 210 minutes
  return Math.min((minutes / targetMinutes) * 100, 100);
};

export const isTargetReached = (minutes: number): boolean => {
  return minutes >= 3.5 * 60; // 210 minutes
};
