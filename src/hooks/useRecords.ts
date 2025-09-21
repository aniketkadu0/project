import { useState, useEffect } from 'react';
import { TimeRecord } from '../types';

export const useRecords = () => {
  const [records, setRecords] = useState<TimeRecord[]>([]);

  useEffect(() => {
    loadRecords();
  }, []);

  const loadRecords = () => {
    const savedRecords = JSON.parse(localStorage.getItem('timeRecords') || '[]');
    // Sort by date (newest first)
    const sortedRecords = savedRecords.sort((a: TimeRecord, b: TimeRecord) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    setRecords(sortedRecords);
  };

  const clearAllRecords = () => {
    localStorage.removeItem('timeRecords');
    setRecords([]);
  };

  return {
    records,
    loadRecords,
    clearAllRecords
  };
};