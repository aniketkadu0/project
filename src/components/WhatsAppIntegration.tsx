import React from 'react';
import { MessageSquare, ExternalLink } from 'lucide-react';

const WhatsAppIntegration: React.FC = () => {
  const whatsappNumber = '+1234567890'; // Replace with your number
  const message = encodeURIComponent('Office time completed! 3.5 hours done for today. 🎉');
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${message}`;

  return (
    <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl shadow-lg p-6 mb-8">
      <div className="flex items-center mb-4">
        <MessageSquare className="w-6 h-6 text-green-600 mr-3" />
        <h3 className="text-lg font-bold text-gray-800">WhatsApp Notifications</h3>
      </div>
      
      <div className="space-y-4">
        <p className="text-gray-700">
          Get instant WhatsApp notifications when your 3.5-hour target is completed.
        </p>
        
        <div className="space-y-3">
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">Automatic Browser Notifications</h4>
            <p className="text-sm text-gray-600">
              The app will show browser notifications when your target is reached. 
              Make sure to allow notifications when prompted.
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">Manual WhatsApp Message</h4>
            <p className="text-sm text-gray-600 mb-3">
              Click the button below to quickly send yourself a WhatsApp message when done.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Send WhatsApp Message
              <ExternalLink className="w-4 h-4 ml-1" />
            </a>
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">Setup Instructions</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Update the phone number in the code to your WhatsApp number</li>
              <li>• For automated WhatsApp messages, consider integrating with WhatsApp Business API</li>
              <li>• You can also use IFTTT or Zapier to create automated workflows</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppIntegration;