import React, { useState } from 'react';
import { Calendar, Clock, Trash2, Filter } from 'lucide-react';
import { useRecords } from '../hooks/useRecords';
import { formatDate, formatTime } from '../utils/timeUtils';
import { TimeRecord } from '../types';

const RecordsTable: React.FC = () => {
  const { records, loadRecords, clearAllRecords } = useRecords();
  const [filterPeriod, setFilterPeriod] = useState<'all' | 'week' | 'month'>('all');

  const getFilteredRecords = (): TimeRecord[] => {
    if (filterPeriod === 'all') return records;

    const now = new Date();
    const cutoffDate = new Date();

    if (filterPeriod === 'week') {
      cutoffDate.setDate(now.getDate() - 7);
    } else if (filterPeriod === 'month') {
      cutoffDate.setMonth(now.getMonth() - 1);
    }

    return records.filter(record => new Date(record.date) >= cutoffDate);
  };

  const filteredRecords = getFilteredRecords();
  const totalHours = filteredRecords.reduce((sum, record) => sum + record.totalMinutes, 0) / 60;
  const completedDays = filteredRecords.filter(record => record.targetReached).length;

  const handleClearRecords = () => {
    if (window.confirm('Are you sure you want to clear all records? This action cannot be undone.')) {
      clearAllRecords();
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Calendar className="w-6 h-6 text-blue-600 mr-3" />
          <h3 className="text-xl font-bold text-gray-800">Time Records</h3>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={filterPeriod}
              onChange={(e) => setFilterPeriod(e.target.value as any)}
              className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Time</option>
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
            </select>
          </div>
          
          {records.length > 0 && (
            <button
              onClick={handleClearRecords}
              className="inline-flex items-center px-3 py-2 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Summary Stats */}
      {filteredRecords.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-blue-600 text-sm font-medium">Total Hours</div>
            <div className="text-2xl font-bold text-blue-800">{totalHours.toFixed(1)}h</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-green-600 text-sm font-medium">Completed Days</div>
            <div className="text-2xl font-bold text-green-800">{completedDays}</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-gray-600 text-sm font-medium">Total Sessions</div>
            <div className="text-2xl font-bold text-gray-800">{filteredRecords.length}</div>
          </div>
        </div>
      )}

      {/* Records Table */}
      {filteredRecords.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">In Time</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Out Time</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Duration</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((record) => (
                <tr key={record.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="font-medium text-gray-900">
                      {formatDate(record.date)}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-700">{record.inTime}</td>
                  <td className="py-3 px-4 text-gray-700">{record.outTime || '-'}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="font-medium text-gray-900">
                        {formatTime(record.totalMinutes)}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        record.targetReached
                          ? 'bg-green-100 text-green-800'
                          : record.isActive
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {record.isActive ? 'Active' : record.targetReached ? 'Completed' : 'Incomplete'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-12">
          <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h4 className="text-lg font-medium text-gray-500 mb-2">No records found</h4>
          <p className="text-gray-400">Start your first timer to see records here.</p>
        </div>
      )}
    </div>
  );
};

export default RecordsTable;