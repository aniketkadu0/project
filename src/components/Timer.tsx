import React from "react";
import { Play, Square, Clock, Target } from "lucide-react";
import { useTimer } from "../hooks/useTimer";
import { formatTime, getProgressPercentage } from "../utils/timeUtils";

const Timer: React.FC = () => {
  const { timerState, startTimer, stopTimer } = useTimer();

  const progress = getProgressPercentage(timerState.elapsedTime);
  const targetReached = timerState.elapsedTime >= 210; // 3.5 hours
  const remainingtime = Math.max(210 - timerState.elapsedTime, 0);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
      <div className="text-center">
        <div className="flex items-center justify-center mb-6">
          <Clock className="w-8 h-8 text-blue-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-800">Office Timer</h2>
        </div>
        {/* Circular Progress */}
        <div className="relative w-48 h-48 mx-auto mb-6">
          <svg
            className="w-full h-full transform -rotate-90"
            viewBox="0 0 100 100"
          >
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="#e5e7eb"
              strokeWidth="8"
              fill="none"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke={targetReached ? "#10b981" : "#3b82f6"}
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 45}`}
              strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
              className="transition-all duration-500"
            />
          </svg>

          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div
              className={`text-3xl font-bold ${
                targetReached ? "text-green-600" : "text-blue-600"
              }`}
            >
              {formatTime(timerState.elapsedTime)}
            </div>
            <div className="text-gray-500 text-sm mt-1">
              {Math.round(progress)}% complete
            </div>
          </div>
        </div>
        <div className="font-medium">
          {formatTime(remainingtime)} remaining to reach your target{" "}
        </div>
        {/* Target indicator */}
        <div className="flex items-center justify-center mb-6">
          <Target
            className={`w-5 h-5 mr-2 ${
              targetReached ? "text-green-600" : "text-gray-400"
            }`}
          />
          <span
            className={`font-medium ${
              targetReached ? "text-green-600" : "text-gray-600"
            }`}
          >
            Target: 3.5 hours {targetReached && "✓"}
          </span>
        </div>
        {/* Control Button */}
        <button
          onClick={timerState.isRunning ? stopTimer : startTimer}
          className={`inline-flex items-center px-8 py-4 rounded-full text-white font-semibold text-lg transition-all duration-200 transform hover:scale-105 ${
            timerState.isRunning
              ? "bg-red-600 hover:bg-red-700"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {timerState.isRunning ? (
            <>
              <Square className="w-5 h-5 mr-2" />
              Clock Out
            </>
          ) : (
            <>
              <Play className="w-5 h-5 mr-2" />
              Clock In
            </>
          )}
        </button>
        {/* Status */}
        {timerState.isRunning && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-blue-800 font-medium">
              Started at: {timerState.currentRecord?.inTime}
            </p>
            {targetReached && (
              <p className="text-green-800 font-medium mt-1">
                🎉 Target completed! You can clock out anytime.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Timer;
