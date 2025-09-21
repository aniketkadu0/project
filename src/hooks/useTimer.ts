import { useState, useEffect, useRef } from 'react';
import { TimerState, TimeRecord } from '../types';
import { getTodayDateString, formatTimeHHMM, isTargetReached } from '../utils/timeUtils';

const TARGET_MINUTES = 3.5 * 60; // 210 minutes

export const useTimer = () => {
  const [timerState, setTimerState] = useState<TimerState>({
    isRunning: false,
    startTime: null,
    elapsedTime: 0,
    currentRecord: null
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const notificationShownRef = useRef(false);

  // Load timer state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem('timerState');
    if (savedState) {
      const parsed = JSON.parse(savedState);
      if (parsed.isRunning && parsed.startTime) {
        const elapsed = Math.floor((Date.now() - parsed.startTime) / 60000);
        setTimerState({
          ...parsed,
          elapsedTime: elapsed
        });
      } else {
        setTimerState(parsed);
      }
    }
  }, []);

  // Save timer state to localStorage
  const saveTimerState = (state: TimerState) => {
    localStorage.setItem('timerState', JSON.stringify(state));
  };

  // Update elapsed time every minute when running
  useEffect(() => {
    if (timerState.isRunning && timerState.startTime) {
      intervalRef.current = setInterval(() => {
        const elapsed = Math.floor((Date.now() - timerState.startTime!) / 60000);
        setTimerState(prev => {
          const newState = { ...prev, elapsedTime: elapsed };
          saveTimerState(newState);
          
          // Check for target completion and show notification
          if (elapsed >= TARGET_MINUTES && !notificationShownRef.current) {
            showNotification();
            notificationShownRef.current = true;
          }
          
          return newState;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [timerState.isRunning, timerState.startTime]);

  const showNotification = () => {
    // Browser notification
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Office Time Completed! 🎉', {
        body: '3.5 hours completed! You can now leave the office.',
        icon: '/favicon.ico'
      });
    }

    // Audio notification
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmQdBzOR2+7DeS0EJ3fH8N2QQAoUXrTp66hVFApGn+DyvmQdBzOR2+7DeS0EJ3fH8N2QQAoUXrTp66hVFApGn+DyvmQdBzOR2+7DeS0EJ3fH8N2QQAoUXrTp66hVFApGn+DyvmQdBzOR2+7DeS0EJ3fH8N2QQAoUXrTp66hVFApGn+DyvmQdBzOR2+7DeS0EJ3fH8N2QQAoUXrTp66hVFApGn+DyvmQdBzOR2+7DeS0EJ3fH8N2QQAoUXrTp66hVFApGn+DyvmQdBzOR2+7DeS0EJ3fH8N2QQAoUXrTp66hVFApGn+DyvmQdBzOR2+7DeS0EJ3fH8N2QQAoUXrTp66hVFApGn+DyvmQdBzOR2+7DeS0EJ3fH8N2QQAoUXrTp66hVFApGn+DyvmQdBzOR2+7DeS0EJ3fH8N2QQAoUXrTp66hVFApGn+DyvmQdBzOR2+7DeS0EJ3fH8N2QQAoUXrTp66hVFApGn+DyvmQdBzOR2+7DeS0EJ3fH8N2QQAoUXrTp66hVFApGn+DyvmQdBzOR2+7DeS0EJ3fH8N2QQAoUXrTp66hVFApGn+DyvmQdBzOR2+7DeS0EJ3fH8N2QQAoUXrTp66hVFApGn+DyvmQdBzOR2+7DeS0EJ3fH8N2QQAoUXrTp66hVFApGn+DyvmQdBzOR2+7DeS0EJ3fH8N2QQAoUXrTp66hVFApGn+DyvmQdBzOR2+7DeS0EJ3fH8N2QQAoUXrTp66hVFApGn+DyvmQdBzOR2+7DeS0EJ3fH8N2QQAoUXrTp66hVFApGn+DyvmQdBzOR2+7DeS0EJ3fH8N2QQAoUXrTp66hVFApGn+DyvmQdBzOR2+7DeS0EJ3fH8N2QQAoUXrTp66hVFApGn+DyvmQdBzOR2+7DeS0EJ3fH8N2QQAoUXrTp66hVFApGn+DyvmQdBzOR2+7DeS0EJ3fH8N2QQAoUXrTp66hVFApGn+DyvmQdBzOR2+7DeS0EJ3fH8N2QQAoUXrTp66hVFApGn+DyvmQdBzOR2+7DeS0EJ3fH8N2QQAoUXrTp66hVFApGn+DyvmQdBzOR2+7DeS0EJ3fH8N2QQAoUXrTp66hVFApGn+DyvmQdBzOR2+7DeS0EJ3fH8N2QQAoUXrTp66hVFApGn+DyvmQdBzOR2+7DeS0EJ3fH8N2QQAoUXrTp66hVFApGn+DyvmQdBzOR2+7DeS0EJ3fH8N2QQAoUXrTp66hVFApGn+DyvmQdBzOR2+7DeS0E');
    audio.play().catch(() => {}); // Ignore errors if audio fails
  };

  const startTimer = () => {
    const now = Date.now();
    const today = getTodayDateString();
    
    const newRecord: TimeRecord = {
      id: `${today}-${now}`,
      date: today,
      inTime: formatTimeHHMM(new Date(now)),
      totalMinutes: 0,
      isActive: true,
      targetReached: false
    };

    const newState: TimerState = {
      isRunning: true,
      startTime: now,
      elapsedTime: 0,
      currentRecord: newRecord
    };

    setTimerState(newState);
    saveTimerState(newState);
    notificationShownRef.current = false;

    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  };

  const stopTimer = () => {
    if (!timerState.currentRecord || !timerState.startTime) return;

    const now = Date.now();
    const elapsed = Math.floor((now - timerState.startTime) / 60000);
    
    const completedRecord: TimeRecord = {
      ...timerState.currentRecord,
      outTime: formatTimeHHMM(new Date(now)),
      totalMinutes: elapsed,
      isActive: false,
      targetReached: isTargetReached(elapsed)
    };

    // Save to records
    const existingRecords = JSON.parse(localStorage.getItem('timeRecords') || '[]');
    const updatedRecords = [...existingRecords, completedRecord];
    localStorage.setItem('timeRecords', JSON.stringify(updatedRecords));

    // Reset timer state
    const newState: TimerState = {
      isRunning: false,
      startTime: null,
      elapsedTime: 0,
      currentRecord: null
    };

    setTimerState(newState);
    saveTimerState(newState);
    notificationShownRef.current = false;
  };

  return {
    timerState,
    startTimer,
    stopTimer
  };
};