import React from 'react';
import { Building } from 'lucide-react';
import Timer from './components/Timer';
import RecordsTable from './components/RecordsTable';
import WhatsAppIntegration from './components/WhatsAppIntegration';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-blue-600 p-3 rounded-full mr-4">
              <Building className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Office Time Tracker</h1>
              <p className="text-gray-600 mt-2">Track your daily 3.5-hour office commitment</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Timer Section */}
          <Timer />
          
          {/* WhatsApp Integration */}
          <WhatsAppIntegration />
          
          {/* Records Section */}
          <RecordsTable />
        </div>

        {/* Footer */}
        <div className="text-center mt-12 py-6 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            Stay consistent with your office hours. Track, achieve, succeed! 🚀
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;