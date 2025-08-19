import React, { useState } from 'react';
import { 
  FaVideo, 
  FaCalendarPlus, 
  FaCalendarAlt, 
  FaDownload, 
  FaStickyNote,
  FaClock,
  FaUser
} from 'react-icons/fa';

interface Session {
  id: string;
  date: string;
  time: string;
  duration: string;
  coach: string;
  subject: string;
  type: 'Birebir' | 'Grup' | 'Deneme Analizi';
  status: 'Yaklaşan' | 'Tamamlandı' | 'İptal';
  notes?: string;
}

const Sessions = () => {
  const [sessions] = useState<Session[]>([
    {
      id: '1',
      date: '2024-01-15',
      time: '14:00',
      duration: '60 dk',
      coach: 'Mehmet Hoca',
      subject: 'Matematik',
      type: 'Birebir',
      status: 'Yaklaşan',
      notes: 'Polinomlar konusu üzerinde çalışacağız'
    },
    {
      id: '2',
      date: '2024-01-12',
      time: '16:00',
      duration: '45 dk',
      coach: 'Ayşe Hoca',
      subject: 'Türkçe',
      type: 'Birebir',
      status: 'Tamamlandı',
      notes: 'Paragraf konusu işlendi, ödev verildi'
    },
    {
      id: '3',
      date: '2024-01-10',
      time: '19:00',
      duration: '90 dk',
      coach: 'Can Hoca',
      subject: 'Fen Bilimleri',
      type: 'Grup',
      status: 'Tamamlandı',
      notes: 'Fotosentez konusu grup çalışması yapıldı'
    },
    {
      id: '4',
      date: '2024-01-08',
      time: '15:30',
      duration: '30 dk',
      coach: 'Zeynep Hoca',
      subject: 'Genel',
      type: 'Deneme Analizi',
      status: 'Tamamlandı',
      notes: 'TYT deneme sonuçları analiz edildi'
    }
  ]);

  const [showCalendly, setShowCalendly] = useState(false);

  const nextSession = sessions.find(session => session.status === 'Yaklaşan');
  const pastSessions = sessions.filter(session => session.status === 'Tamamlandı');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Yaklaşan':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Tamamlandı':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'İptal':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Birebir':
        return 'bg-purple-100 text-purple-800';
      case 'Grup':
        return 'bg-blue-100 text-blue-800';
      case 'Deneme Analizi':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const addToCalendar = (session: Session) => {
    // Mock calendar integration
    alert(`Takvim etkinliği oluşturuldu: ${session.subject} dersi - ${formatDate(session.date)} ${session.time}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6 animate-in slide-in-from-top-10 duration-1000">
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 mb-2">Oturumlar (Randevular)</h1>
            <p className="text-gray-600">Koçlarınla olan derslerini takip et</p>
          </div>
          
          <button
            onClick={() => setShowCalendly(true)}
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
          >
            <FaCalendarPlus size={20} />
            <span>Yeni Randevu Al</span>
          </button>
        </div>
      </div>

      {/* Next Session Card */}
      {nextSession && (
        <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-2xl p-6 text-white animate-in slide-in-from-left-10 duration-1000 delay-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold">Yaklaşan Oturum</h3>
            <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
              {nextSession.type}
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <FaCalendarAlt className="text-blue-200" size={20} />
                  <span className="text-lg font-semibold">{formatDate(nextSession.date)}</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <FaClock className="text-blue-200" size={20} />
                  <span className="text-lg">{nextSession.time} ({nextSession.duration})</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <FaUser className="text-blue-200" size={20} />
                  <span className="text-lg">{nextSession.coach}</span>
                </div>
              </div>
            </div>
            
            <div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <h4 className="font-semibold mb-2">{nextSession.subject}</h4>
                <p className="text-blue-100 text-sm">{nextSession.notes}</p>
              </div>
              
              <button
                onClick={() => addToCalendar(nextSession)}
                className="w-full mt-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
              >
                Takvime Ekle
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Past Sessions */}
      <div className="bg-white rounded-2xl shadow-lg p-6 animate-in slide-in-from-right-10 duration-1000 delay-400">
        <h3 className="text-xl font-bold text-slate-800 mb-6">Geçmiş Oturumlar</h3>
        
        {pastSessions.length > 0 ? (
          <div className="space-y-4">
            {pastSessions.map((session, index) => (
              <div
                key={session.id}
                className="bg-gray-50 hover:bg-gray-100 rounded-xl p-4 transition-all duration-300 hover:scale-[1.02] animate-in slide-in-from-left-10 duration-1000"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-semibold text-slate-800">{session.subject}</h4>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(session.type)}`}>
                        {session.type}
                      </span>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(session.status)}`}>
                        {session.status}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                      <span>{formatDate(session.date)}</span>
                      <span>{session.time}</span>
                      <span>{session.duration}</span>
                      <span>{session.coach}</span>
                    </div>
                    
                    {session.notes && (
                      <div className="flex items-start space-x-2 text-sm text-gray-700">
                        <FaStickyNote className="text-yellow-500 mt-0.5" size={12} />
                        <span>{session.notes}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => alert('Ders notları görüntüleniyor...')}
                      className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300"
                      title="Notlar"
                    >
                      <FaStickyNote size={16} />
                    </button>
                    
                    <button
                      onClick={() => alert('Özet PDF indiriliyor...')}
                      className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-300"
                      title="Özet PDF İndir"
                    >
                      <FaDownload size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <FaVideo className="mx-auto text-gray-300 mb-4" size={64} />
            <h4 className="text-xl font-bold text-gray-600 mb-2">Henüz tamamlanmış oturum yok</h4>
            <p className="text-gray-500">
              İlk dersini aldıktan sonra burada görüntülenecek.
            </p>
          </div>
        )}
      </div>

      {/* Calendly Modal */}
      {showCalendly && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full h-[80vh] animate-in zoom-in-50 duration-300">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-slate-800">Randevu Al</h3>
              <button
                onClick={() => setShowCalendly(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors duration-300"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6 h-full flex items-center justify-center">
              <div className="text-center">
                <FaCalendarPlus className="mx-auto text-blue-600 mb-4" size={64} />
                <h4 className="text-xl font-bold text-slate-800 mb-2">Calendly Entegrasyonu</h4>
                <p className="text-gray-600 mb-6">
                  Gerçek uygulamada burada Calendly widget'ı görünecek.
                </p>
                <div className="bg-blue-50 rounded-xl p-6 max-w-md mx-auto">
                  <p className="text-sm text-blue-800">
                    <strong>Demo URL:</strong><br />
                    https://calendly.com/sinavkoc-demo
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty State for Next Session */}
      {!nextSession && (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center animate-in slide-in-from-bottom-10 duration-1000 delay-600">
          <FaVideo className="mx-auto text-gray-300 mb-4" size={64} />
          <h3 className="text-xl font-bold text-gray-600 mb-2">Yaklaşan oturum yok</h3>
          <p className="text-gray-500 mb-6">
            Koçunla yeni bir randevu alarak çalışmalarına devam edebilirsin.
          </p>
          <button
            onClick={() => setShowCalendly(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
          >
            Hemen Randevu Al
          </button>
        </div>
      )}
    </div>
  );
};

export default Sessions;