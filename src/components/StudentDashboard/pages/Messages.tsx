import React, { useState } from 'react';
import { 
  FaComments, 
  FaPaperPlane, 
  FaWhatsapp, 
  FaClock,
  FaCheckDouble,
  FaUser
} from 'react-icons/fa';

interface Message {
  id: string;
  sender: 'student' | 'coach';
  content: string;
  timestamp: string;
  read: boolean;
}

const Messages = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'coach',
      content: 'Merhaba Ayşe! Bugünkü matematik dersinde polinomlar konusunu işleyeceğiz. Hazır mısın? 😊',
      timestamp: '2024-01-15T10:30:00',
      read: true
    },
    {
      id: '2',
      sender: 'student',
      content: 'Merhaba hocam! Evet hazırım. Dün verdiğiniz ödevleri de tamamladım.',
      timestamp: '2024-01-15T10:32:00',
      read: true
    },
    {
      id: '3',
      sender: 'coach',
      content: 'Harika! O zaman bugün biraz daha ileri seviye sorulara geçebiliriz. Deneme sınavındaki performansın da çok iyiydi 👏',
      timestamp: '2024-01-15T10:35:00',
      read: true
    },
    {
      id: '4',
      sender: 'student',
      content: 'Teşekkür ederim hocam! Bu hafta fizik konularında biraz zorlanıyorum. Ek kaynak önerir misiniz?',
      timestamp: '2024-01-15T14:20:00',
      read: true
    },
    {
      id: '5',
      sender: 'coach',
      content: 'Tabii ki! Fizik için "Palme Yayınları" kitabını öneririm. Özellikle hareket konusu için çok iyi açıklamaları var. Yarın detaylı bir çalışma planı hazırlayıp göndereceğim.',
      timestamp: '2024-01-15T14:45:00',
      read: false
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('tr-TR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Bugün';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Dün';
    } else {
      return date.toLocaleDateString('tr-TR', { 
        day: 'numeric', 
        month: 'long' 
      });
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    setIsSending(true);
    
    const message: Message = {
      id: Date.now().toString(),
      sender: 'student',
      content: newMessage,
      timestamp: new Date().toISOString(),
      read: true
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    // Simulate sending delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSending(false);

    // Simulate coach response after 2 seconds
    setTimeout(() => {
      const coachResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'coach',
        content: 'Mesajın alındı! En kısa sürede detaylı yanıt vereceğim. 😊',
        timestamp: new Date().toISOString(),
        read: false
      };
      setMessages(prev => [...prev, coachResponse]);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const unreadCount = messages.filter(msg => !msg.read && msg.sender === 'coach').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6 animate-in slide-in-from-top-10 duration-1000 hover:shadow-xl transition-all duration-500 hover:scale-[1.01]">
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 mb-2 animate-in slide-in-from-left-10 duration-1000">Mesajlar</h1>
            <p className="text-gray-600 animate-in slide-in-from-left-10 duration-1000 delay-200">Koçunla iletişim kur</p>
          </div>
          
          {unreadCount > 0 && (
            <div className="flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full animate-bounce hover:scale-105 transition-all duration-300">
              <FaComments size={16} className="animate-pulse" />
              <span className="font-semibold">{unreadCount} yeni mesaj</span>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Area */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg animate-in slide-in-from-left-10 duration-1000 delay-200 hover:shadow-xl transition-all duration-500 hover:scale-[1.01]">
          {/* Chat Header */}
          <div className="flex items-center space-x-4 p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-110">
              <FaUser className="text-white" size={20} />
            </div>
            <div>
              <h3 className="font-bold text-slate-800">Mehmet Hoca</h3>
              <p className="text-sm text-green-600 flex items-center space-x-1">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
                <span>Çevrimiçi</span>
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="h-96 overflow-y-auto p-6 space-y-4">
            {messages.map((message, index) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'student' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-5 duration-700 hover:scale-[1.02] transition-all duration-300`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl transition-all duration-300 hover:shadow-lg ${
                  message.sender === 'student'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}>
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <div className={`flex items-center justify-end space-x-1 mt-2 text-xs ${
                    message.sender === 'student' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    <span>{formatTime(message.timestamp)}</span>
                    {message.sender === 'student' && (
                      <FaCheckDouble className={message.read ? 'text-blue-200' : 'text-blue-300'} size={12} />
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {isSending && (
              <div className="flex justify-end animate-in slide-in-from-bottom-5 duration-500">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-2xl max-w-xs">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-200"></div>
                    </div>
                    <span className="text-xs">Gönderiliyor...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Message Input */}
          <div className="p-6 border-t border-gray-200">
            <div className="flex items-end space-x-3">
              <div className="flex-1">
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Koçuna mesaj gönder..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none hover:shadow-lg transition-all duration-300 focus:shadow-xl hover:scale-[1.01]"
                  rows={2}
                />
              </div>
              <button
                onClick={sendMessage}
                disabled={!newMessage.trim() || isSending}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white p-3 rounded-xl transition-all duration-500 hover:scale-110 disabled:hover:scale-100 hover:shadow-xl animate-pulse hover:animate-bounce"
              >
                <FaPaperPlane size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6 animate-in slide-in-from-right-10 duration-1000 delay-400">
          {/* WhatsApp Support */}
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white hover:from-green-600 hover:to-green-700 transition-all duration-500 hover:scale-105 hover:shadow-xl relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-2 right-2 w-12 h-12 bg-white rounded-full animate-pulse"></div>
              <div className="absolute bottom-2 left-2 w-8 h-8 bg-yellow-400 rounded-full animate-bounce delay-1000"></div>
            </div>
            <div className="flex items-center space-x-3 mb-4">
              <FaWhatsapp size={32} className="animate-bounce" />
              <div>
                <h3 className="font-bold text-lg">WhatsApp Destek</h3>
                <p className="text-green-100 text-sm">Hızlı yanıt için</p>
              </div>
            </div>
            
            <p className="text-green-100 mb-4 text-sm leading-relaxed">
              Acil durumlar için WhatsApp üzerinden 7/24 destek alabilirsin.
            </p>
            
            <button className="w-full bg-white text-green-600 hover:bg-green-50 px-4 py-3 rounded-xl font-semibold transition-all duration-500 hover:scale-110 flex items-center justify-center space-x-2 hover:shadow-lg animate-pulse hover:animate-bounce">
              <FaWhatsapp size={20} />
              <span>WhatsApp'ta Yaz</span>
            </button>
          </div>

          {/* Response Time */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-500 hover:scale-105">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-xl hover:bg-blue-200 transition-all duration-300 hover:scale-110 hover:rotate-12">
                <FaClock className="text-blue-600" size={20} />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">Yanıt Süresi</h3>
                <p className="text-gray-600 text-sm">Ortalama bekleme</p>
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">3 saat</div>
              <p className="text-gray-600 text-sm">
                Koçun genellikle 3 saat içinde yanıtlıyor
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-500 hover:scale-105">
            <h3 className="font-bold text-slate-800 mb-4">Hızlı İşlemler</h3>
            
            <div className="space-y-3">
              <button className="w-full text-left p-3 bg-gray-50 hover:bg-blue-50 rounded-xl transition-all duration-500 hover:scale-110 hover:shadow-lg animate-in slide-in-from-left-10 duration-1000">
                <div className="font-medium text-slate-800">📅 Randevu Al</div>
                <div className="text-sm text-gray-600">Yeni ders randevusu</div>
              </button>
              
              <button className="w-full text-left p-3 bg-gray-50 hover:bg-green-50 rounded-xl transition-all duration-500 hover:scale-110 hover:shadow-lg animate-in slide-in-from-left-10 duration-1000 delay-200">
                <div className="font-medium text-slate-800">📊 Deneme Paylaş</div>
                <div className="text-sm text-gray-600">Sonuçları analiz et</div>
              </button>
              
              <button className="w-full text-left p-3 bg-gray-50 hover:bg-purple-50 rounded-xl transition-all duration-500 hover:scale-110 hover:shadow-lg animate-in slide-in-from-left-10 duration-1000 delay-400">
                <div className="font-medium text-slate-800">❓ Soru Sor</div>
                <div className="text-sm text-gray-600">Konu hakkında</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;