import React, { useState } from 'react';
import { 
  FaRobot, 
  FaPaperPlane, 
  FaUser, 
  FaGraduationCap, 
  FaChalkboardTeacher,
  FaHeart,
  FaBookOpen,
  FaFileUpload,
  FaCog,
  FaTrash
} from 'react-icons/fa';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  content: string;
  timestamp: string;
  role?: string;
}

interface AIRole {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  prompt: string;
}

const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      content: 'Merhaba! Ben SınavKoç AI asistanınım. Size nasıl yardımcı olabilirim? Rol seçerek daha özelleştirilmiş yardım alabilirsiniz.',
      timestamp: new Date().toISOString(),
      role: 'Genel Asistan'
    }
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('general');
  const [isTyping, setIsTyping] = useState(false);
  const [showRoleSelector, setShowRoleSelector] = useState(false);

  const aiRoles: AIRole[] = [
    {
      id: 'general',
      name: 'Genel Asistan',
      description: 'Genel sorular ve yardım',
      icon: FaRobot,
      color: 'from-blue-500 to-blue-600',
      prompt: 'Genel eğitim asistanı olarak yardım ediyorum.'
    },
    {
      id: 'successful-student',
      name: 'Derece Yapmış Öğrenci',
      description: 'Başarılı öğrenci deneyimi',
      icon: FaGraduationCap,
      color: 'from-yellow-500 to-yellow-600',
      prompt: 'YKS\'de derece yapmış bir öğrenci olarak deneyimlerimi paylaşıyorum.'
    },
    {
      id: 'math-teacher',
      name: 'Matematik Öğretmeni',
      description: 'Matematik konuları ve soru çözümü',
      icon: FaChalkboardTeacher,
      color: 'from-green-500 to-green-600',
      prompt: 'Deneyimli matematik öğretmeni olarak size yardımcı oluyorum.'
    },
    {
      id: 'turkish-teacher',
      name: 'Türkçe Öğretmeni',
      description: 'Türkçe ve dil bilgisi',
      icon: FaBookOpen,
      color: 'from-purple-500 to-purple-600',
      prompt: 'Türkçe öğretmeni olarak dil bilgisi ve paragraf konularında yardımcı oluyorum.'
    },
    {
      id: 'counselor',
      name: 'Rehber Öğretmeni',
      description: 'Motivasyon ve rehberlik',
      icon: FaHeart,
      color: 'from-pink-500 to-pink-600',
      prompt: 'Rehber öğretmeni olarak motivasyon ve yönlendirme konularında destek veriyorum.'
    },
    {
      id: 'parent',
      name: 'Bilinçli Veli',
      description: 'Veli perspektifi ve tavsiyeler',
      icon: FaUser,
      color: 'from-indigo-500 to-indigo-600',
      prompt: 'Deneyimli bir veli olarak çocuğunuzun eğitim sürecinde size rehberlik ediyorum.'
    }
  ];

  const currentRole = aiRoles.find(role => role.id === selectedRole) || aiRoles[0];

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: newMessage,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    // Simulate AI response
    await new Promise(resolve => setTimeout(resolve, 1500));

    const aiResponse: Message = {
      id: (Date.now() + 1).toString(),
      sender: 'ai',
      content: generateAIResponse(newMessage, currentRole),
      timestamp: new Date().toISOString(),
      role: currentRole.name
    };

    setMessages(prev => [...prev, aiResponse]);
    setIsTyping(false);
  };

  const generateAIResponse = (userMessage: string, role: AIRole): string => {
    // Mock AI responses based on role
    const responses = {
      'general': 'Size yardımcı olmaktan mutluluk duyarım! Bu konuda daha detaylı bilgi verebilirim.',
      'successful-student': 'Benim deneyimime göre, bu konuda şöyle yaklaşmanı öneririm...',
      'math-teacher': 'Bu matematik konusunu adım adım açıklayayım...',
      'turkish-teacher': 'Türkçe konularında size şu stratejileri önerebilirim...',
      'counselor': 'Bu durumda kendini motive etmek için şunları deneyebilirsin...',
      'parent': 'Bir veli olarak bu konuda şu tavsiyeleri verebilirim...'
    };
    
    return responses[role.id as keyof typeof responses] || 'Size nasıl yardımcı olabilirim?';
  };

  const clearChat = () => {
    setMessages([{
      id: '1',
      sender: 'ai',
      content: 'Merhaba! Ben SınavKoç AI asistanınım. Size nasıl yardımcı olabilirim?',
      timestamp: new Date().toISOString(),
      role: currentRole.name
    }]);
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('tr-TR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
              <FaRobot size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">SınavKoç AI Asistan</h1>
              <p className="text-purple-100 text-lg">Akıllı yardımcın her zaman yanında</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowRoleSelector(!showRoleSelector)}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-xl font-semibold transition-all duration-300"
            >
              <FaCog size={16} className="mr-2" />
              Rol Değiştir
            </button>
            <button
              onClick={clearChat}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-xl font-semibold transition-all duration-300"
            >
              <FaTrash size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Role Selector */}
      {showRoleSelector && (
        <div className="bg-white rounded-2xl shadow-xl p-6 animate-in slide-in-from-top-5 duration-300">
          <h3 className="text-lg font-bold text-slate-800 mb-4">AI Rolü Seç</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {aiRoles.map((role) => {
              const Icon = role.icon;
              return (
                <button
                  key={role.id}
                  onClick={() => {
                    setSelectedRole(role.id);
                    setShowRoleSelector(false);
                  }}
                  className={`p-4 rounded-xl border-2 text-left transition-all duration-300 hover:scale-105 ${
                    selectedRole === role.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                  }`}
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${role.color} rounded-xl flex items-center justify-center mb-3`}>
                    <Icon className="text-white" size={20} />
                  </div>
                  <h4 className="font-semibold text-slate-800 mb-1">{role.name}</h4>
                  <p className="text-sm text-gray-600">{role.description}</p>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Current Role Display */}
      <div className="bg-white rounded-2xl shadow-lg p-4">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 bg-gradient-to-r ${currentRole.color} rounded-xl flex items-center justify-center`}>
            <currentRole.icon className="text-white" size={16} />
          </div>
          <div>
            <div className="font-semibold text-slate-800">Aktif Rol: {currentRole.name}</div>
            <div className="text-sm text-gray-600">{currentRole.description}</div>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="bg-white rounded-2xl shadow-xl">
        {/* Messages */}
        <div className="h-96 overflow-y-auto p-6 space-y-4">
          {messages.map((message, index) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-5 duration-500`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                message.sender === 'user'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {message.sender === 'ai' && message.role && (
                  <div className="text-xs text-purple-600 font-medium mb-1">
                    {message.role}
                  </div>
                )}
                <p className="text-sm leading-relaxed">{message.content}</p>
                <div className={`text-xs mt-2 ${
                  message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {formatTime(message.timestamp)}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 px-4 py-3 rounded-2xl">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></div>
                  </div>
                  <span className="text-xs text-gray-500">{currentRole.name} yazıyor...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-6 border-t border-gray-200">
          <div className="flex items-end space-x-3">
            <button
              className="p-3 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl transition-all duration-300 hover:scale-110"
              title="Belge Yükle"
            >
              <FaFileUpload size={20} />
            </button>
            
            <div className="flex-1">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder={`${currentRole.name} ile konuş...`}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={2}
              />
            </div>
            
            <button
              onClick={sendMessage}
              disabled={!newMessage.trim() || isTyping}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white p-3 rounded-xl transition-all duration-300 hover:scale-105"
            >
              <FaPaperPlane size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <button className="bg-white hover:bg-blue-50 rounded-xl shadow-lg p-4 text-left transition-all duration-300 hover:scale-105">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FaBookOpen className="text-blue-600" size={20} />
            </div>
            <div>
              <div className="font-semibold text-slate-800">Konu Anlatımı İste</div>
              <div className="text-sm text-gray-600">Herhangi bir konuyu açıklat</div>
            </div>
          </div>
        </button>

        <button className="bg-white hover:bg-green-50 rounded-xl shadow-lg p-4 text-left transition-all duration-300 hover:scale-105">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <FaGraduationCap className="text-green-600" size={20} />
            </div>
            <div>
              <div className="font-semibold text-slate-800">Soru Çözümü</div>
              <div className="text-sm text-gray-600">Zorlandığın soruları çözdür</div>
            </div>
          </div>
        </button>

        <button className="bg-white hover:bg-purple-50 rounded-xl shadow-lg p-4 text-left transition-all duration-300 hover:scale-105">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <FaHeart className="text-purple-600" size={20} />
            </div>
            <div>
              <div className="font-semibold text-slate-800">Motivasyon Desteği</div>
              <div className="text-sm text-gray-600">Moral ve motivasyon konuşması</div>
            </div>
          </div>
        </button>
      </div>

      {/* AI Features Info */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6 border border-blue-200">
        <h4 className="font-bold text-slate-800 mb-4">🤖 AI Asistan Özellikleri</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
          <div className="space-y-2">
            <p>• Konu anlatımı ve soru çözümü</p>
            <p>• Benzer soru üretimi</p>
            <p>• Mini quiz hazırlama</p>
            <p>• Özet çıkarma</p>
          </div>
          <div className="space-y-2">
            <p>• Motivasyon ve moral desteği</p>
            <p>• Günlük plan hatırlatmaları</p>
            <p>• Belge analizi</p>
            <p>• Kişiselleştirilmiş öneriler</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChat;