import React, { useState } from 'react';
import { FaWhatsapp, FaTimes, FaPaperPlane } from 'react-icons/fa';

const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // For MVP, just show an alert
      alert(`Mesajınız alındı: "${message}"\n\nEn kısa sürede size dönüş yapacağız!`);
      setMessage('');
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 animate-in slide-in-from-bottom-5 duration-300">
          <div className="bg-white rounded-2xl shadow-2xl w-80 max-w-[calc(100vw-3rem)] border border-gray-200">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <FaWhatsapp size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold">Sınav Koç Destek</h3>
                    <p className="text-xs opacity-90">Genellikle hemen yanıtlar</p>
                  </div>
                </div>
                <button
                  onClick={toggleChat}
                  className="text-white hover:text-green-200 transition-colors duration-300"
                >
                  <FaTimes size={20} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="p-4 h-64 overflow-y-auto bg-gray-50">
              <div className="space-y-3">
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <p className="text-sm text-gray-700">
                    Merhaba! 👋 Sınav Koç ekibine hoş geldin. 
                    Sormak istediğin bir şey var mı?
                  </p>
                  <span className="text-xs text-gray-500">Şimdi</span>
                </div>
              </div>
            </div>

            {/* Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Mesajınızı yazın..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                />
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg transition-colors duration-300"
                >
                  <FaPaperPlane size={16} />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 animate-bounce hover:animate-pulse"
      >
        {isOpen ? (
          <FaTimes size={24} />
        ) : (
          <FaWhatsapp size={24} />
        )}
      </button>

      {/* Tooltip */}
      {!isOpen && (
        <div className="fixed bottom-6 right-20 z-30 bg-gradient-to-r from-gray-800 to-gray-900 text-white px-4 py-3 rounded-xl text-sm whitespace-nowrap animate-in slide-in-from-right-5 duration-300 delay-1000 shadow-xl border border-gray-700">
          Sormak istediğin bir şey var mı?
          <div className="absolute top-1/2 -right-1 transform -translate-y-1/2 w-3 h-3 bg-gray-800 rotate-45 border-r border-b border-gray-700"></div>
        </div>
      )}
    </>
  );
};

export default FloatingChat;