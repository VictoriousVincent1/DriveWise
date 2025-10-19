'use client';

import { useState } from 'react';
import type { ChatMessage } from '../../types';
import { formatCurrency } from '../../lib/utils';

export default function DealerChatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! I'm your DriveWise assistant. I can help you explore financing options, compare vehicles, or connect you with local dealers. What would you like to do today?",
  timestamp: new Date().toISOString(),
      suggestions: [
        'Find affordable vehicles',
        'Compare lease vs buy',
        'Talk to a local dealer',
        'Get financing advice'
      ],
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content,
  timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = {
        affordable: "Based on your budget of $1,040/month, I can show you several great options:\n\n 2024 Corolla XSE - $358/mo (lease)\n🚙 2024 Camry SE - $429/mo (finance)\n 2024 RAV4 XLE - $498/mo (finance)\n\nWould you like to see detailed comparisons?",
        compare: "Let me break down Lease vs Buy for you:\n\n**Lease Benefits:**\n Lower monthly payments\n Drive new car every 2-3 years\n Warranty coverage\n No ownership\n Mileage restrictions\n\n**Buy Benefits:**\n Build equity\n No mileage limits\n Customization freedom\n Higher payments\n Maintenance costs after warranty\n\nBased on your profile, I'd recommend financing if you plan to keep the car 5+ years.",
        dealer: "I've found 4 certified Toyota dealers near you:\n\n Eastside Toyota Center (8.7 mi) - 4.9★\n   Special: $2,500 loyalty rebate\n\n Toyota of Downtown (2.3 mi) - 4.8★\n   Special: 0% APR for 60 months\n\n Northside Toyota (5.1 mi) - 4.6★\n   Special: Free maintenance 2 years\n\nWould you like to schedule a test drive or request a quote?",
        default: "I'd be happy to help with that! Could you provide more details about:\n• Your preferred vehicle type\n• Your budget range\n• Whether you're considering trade-in\n\nOr I can connect you with a live dealer specialist right away!",
      };

      let responseContent = responses.default;
      const lowerContent = content.toLowerCase();
      
      if (lowerContent.includes('afford') || lowerContent.includes('budget') || lowerContent.includes('cheap')) {
        responseContent = responses.affordable;
      } else if (lowerContent.includes('lease') || lowerContent.includes('buy') || lowerContent.includes('compar')) {
        responseContent = responses.compare;
      } else if (lowerContent.includes('dealer') || lowerContent.includes('location') || lowerContent.includes('near')) {
        responseContent = responses.dealer;
      }

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseContent,
  timestamp: new Date().toISOString(),
        suggestions: ['Show me vehicles', 'Connect with dealer', 'Calculate payments', 'Switch to visual mode'],
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-[600px]">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg">DriveWise Assistant</h3>
            <p className="text-sm opacity-90">Your personal car financing guide</p>
          </div>
          <button className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded text-sm transition-colors">
            Switch to Visual Mode
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-4 ${
                message.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white shadow-sm border border-gray-200'
              }`}
            >
              <p className="text-sm whitespace-pre-line">{message.content}</p>
              {message.suggestions && message.role === 'assistant' && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {message.suggestions.map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(suggestion)}
                      className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-1 rounded-full transition-colors border border-blue-200"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-4">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
            placeholder="Ask about financing, vehicles, or dealers..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => handleSendMessage(inputValue)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Send
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          💡 Not a fan of chatbots? Click "Switch to Visual Mode" anytime!
        </p>
      </div>
    </div>
  );
}
