import React, { useState } from 'react';
import { 
  FaHeart, 
  FaUserMd, 
  FaRobot, 
  FaBookOpen, 
  FaCalendarAlt,
  FaComments,
  FaDownload,
  FaPlay,
  FaHeadphones
} from 'react-icons/fa';

interface SupportSession {
  id: string;
  date: string;
  time: string;
  counselor: string;
  type: 'Bireysel' | 'Grup' | 'Acil';
  status: 'Yaklaşan' | 'Tamamlandı';
  notes?: string;
}

const PsychologicalSupport = () => {
  const [activeTab, setActiveTab] = useState<'sessions' | 'ai-chat' | 'resources'>('sessions');
  const [showBookingModal, setShowBookingModal] = useState(false);
  
  const [sessions] = useState<SupportSession[]>([
    {
      id: '1',
      date: '2024-01-16',
      time: '15:00',
      counselor: 'Dr. Ayşe Kaya',
      type: 'Bireysel',
      status: 'Yaklaşan',
      notes: 'Sınav kaygısı ve motivasyon konuları'
    },
    {
      id: '2',
      date: '2024-01-10',
      time: '14:00',
      counselor: 'Dr. Mehmet Özkan',
      type: 'Bireysel',
      status: 'Tamamlandı',
      notes: 'Zaman yönetimi ve çalışma teknikleri'
    }
  ]);

  const resources = [
    {
      id: '1',
      title: 'Sınav Kaygısı ile Başa Çıkma Rehberi',
      type: 'PDF Kitapçık',
      description: 'AI destekli kapsamlı rehber',
      downloadUrl: '#',
      pages: 24
    },
    {
      id: '2',
      title: 'Motivasyon ve Hedef Belirleme',
      type: 'Ses Kitabı',
      description: 'Dinleyerek öğren',
      downloadUrl: '#',
      duration: '45 dk'
    },
    {
      id: '3',
      title: 'Stres Yönetimi Teknikleri',
      type: 'Video Serisi',
      description: '5 bölümlük eğitim serisi',
      downloadUrl: '#',
      episodes: 5
    },
    {
      id: '4',
      title: 'Gelecek Kaygısı ve Çözümleri',
      type: 'PDF Kitapçık',
      description: 'Uzman psikolog önerileri',
      downloadUrl: '#',
      pages: 18
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Yaklaşan':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Tamamlandı':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Bireysel':
        return 'bg-purple-100 text-purple-800';
      case 'Grup':
        return 'bg-blue-100 text-blue-800';
      case 'Acil':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 rounded-2xl p-6 text-white">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
            <FaHeart size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">Psikolojik Destek</h1>
            <p className="text-pink-100 text-lg">Zihinsel sağlığın ve motivasyonun için buradayız</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-lg">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('sessions')}
            className={`flex-1 flex items-center justify-center space-x-2 px-6 py-4 font-semibold transition-all duration-300 ${
              activeTab === 'sessions'
                ? 'text-pink-600 border-b-2 border-pink-600 bg-pink-50'
                : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50'
            }`}
          >
            <FaUserMd size={20} />
            <span>Uzman Desteği</span>
          </button>
          
          <button
            onClick={() => setActiveTab('ai-chat')}
            className={`flex-1 flex items-center justify-center space-x-2 px-6 py-4 font-semibold transition-all duration-300 ${
              activeTab === 'ai-chat'
                ? 'text-pink-600 border-b-2 border-pink-600 bg-pink-50'
                : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50'
            }`}
          >
            <FaRobot size={20} />
            <span>AI Danışman</span>
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">7/24</span>
          </button>
          
          <button
            onClick={() => setActiveTab('resources')}
            className={`flex-1 flex items-center justify-center space-x-2 px-6 py-4 font-semibold transition-all duration-300 ${
              activeTab === 'resources'
                ? 'text-pink-600 border-b-2 border-pink-600 bg-pink-50'
                : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50'
            }`}
          >
            <FaBookOpen size={20} />
            <span>Kaynaklar</span>
          </button>
        </div>

        <div className="p-6">
          {/* Uzman Desteği Tab */}
          {activeTab === 'sessions' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Psikolojik Danışman Seansları</h3>
                  <p className="text-gray-600">Uzman psikologlarımızla birebir görüşmeler</p>
                </div>
                <button
                  onClick={() => setShowBookingModal(true)}
                  className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                >
                  <FaCalendarAlt className="mr-2" size={16} />
                  Randevu Al
                </button>
              </div>

              {sessions.length > 0 ? (
                <div className="space-y-4">
                  {sessions.map((session, index) => (
                    <div
                      key={session.id}
                      className="bg-gray-50 hover:bg-gray-100 rounded-xl p-4 transition-all duration-300 hover:scale-[1.02]"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="font-semibold text-slate-800">{session.counselor}</h4>
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
                          </div>
                          
                          {session.notes && (
                            <p className="text-sm text-gray-700">{session.notes}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <FaUserMd className="mx-auto text-gray-300 mb-4" size={64} />
                  <h4 className="text-xl font-bold text-gray-600 mb-2">Henüz randevu yok</h4>
                  <p className="text-gray-500 mb-6">
                    Uzman psikologlarımızla görüşmek için randevu alabilirsin.
                  </p>
                  <button
                    onClick={() => setShowBookingModal(true)}
                    className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                  >
                    İlk Randevunu Al
                  </button>
                </div>
              )}
            </div>
          )}

          {/* AI Danışman Tab */}
          {activeTab === 'ai-chat' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-purple-600 rounded-xl">
                    <FaRobot className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800">AI Psikolojik Danışman</h3>
                    <p className="text-gray-600">7/24 anlayışlı destek</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <p className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span>Sınav kaygısı yönetimi</span>
                    </p>
                    <p className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      <span>Motivasyon artırıcı konuşmalar</span>
                    </p>
                    <p className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                      <span>Stres yönetimi teknikleri</span>
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                      <span>Gelecek planlaması</span>
                    </p>
                    <p className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      <span>Öfke ve hayal kırıklığı yönetimi</span>
                    </p>
                    <p className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                      <span>Özgüven geliştirme</span>
                    </p>
                  </div>
                </div>
                
                <button className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105">
                  <FaComments className="mr-2" size={16} />
                  AI Danışmanla Konuş
                </button>
              </div>
            </div>
          )}

          {/* Kaynaklar Tab */}
          {activeTab === 'resources' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">Psikolojik Destek Kaynakları</h3>
                <p className="text-gray-600 mb-6">AI destekli rehberler ve eğitim materyalleri</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {resources.map((resource, index) => (
                  <div
                    key={resource.id}
                    className="bg-gray-50 hover:bg-gray-100 rounded-xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl">
                        {resource.type.includes('PDF') ? (
                          <FaBookOpen className="text-white" size={20} />
                        ) : resource.type.includes('Ses') ? (
                          <FaHeadphones className="text-white" size={20} />
                        ) : (
                          <FaPlay className="text-white" size={20} />
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="font-bold text-slate-800 mb-2">{resource.title}</h4>
                        <p className="text-sm text-gray-600 mb-3">{resource.description}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-gray-500">
                            {resource.type} • {
                              resource.pages ? `${resource.pages} sayfa` :
                              resource.duration ? resource.duration :
                              `${resource.episodes} bölüm`
                            }
                          </div>
                          
                          <button
                            onClick={() => alert(`"${resource.title}" açılıyor...`)}
                            className="flex items-center space-x-1 text-pink-600 hover:text-pink-700 font-medium text-sm transition-all duration-300 hover:scale-105"
                          >
                            <FaDownload size={12} />
                            <span>İndir/Aç</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Emergency Support */}
      <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl p-6 border border-red-200">
        <div className="flex items-center space-x-4 mb-4">
          <div className="p-3 bg-red-600 rounded-xl">
            <FaHeart className="text-white" size={24} />
          </div>
          <div>
            <h4 className="font-bold text-slate-800">🚨 Acil Durum Desteği</h4>
            <p className="text-gray-600">Acil psikolojik destek için 7/24 ulaşabilirsin</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="bg-white hover:bg-red-50 border border-red-200 rounded-xl p-4 text-left transition-all duration-300 hover:scale-105">
            <div className="font-semibold text-red-600 mb-1">Acil Danışman Hattı</div>
            <div className="text-sm text-gray-600">+90 (555) 911-0000</div>
          </button>
          
          <button className="bg-white hover:bg-purple-50 border border-purple-200 rounded-xl p-4 text-left transition-all duration-300 hover:scale-105">
            <div className="font-semibold text-purple-600 mb-1">AI Acil Destek</div>
            <div className="text-sm text-gray-600">Hemen konuşmaya başla</div>
          </button>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-slate-800 mb-6">Psikolojik Danışman Randevusu</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Randevu Türü</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500">
                  <option value="individual">Bireysel Görüşme</option>
                  <option value="group">Grup Terapisi</option>
                  <option value="emergency">Acil Destek</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Konu</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500">
                  <option value="">Konu seçin</option>
                  <option value="exam-anxiety">Sınav Kaygısı</option>
                  <option value="motivation">Motivasyon Eksikliği</option>
                  <option value="stress">Stres Yönetimi</option>
                  <option value="future-anxiety">Gelecek Kaygısı</option>
                  <option value="family-pressure">Aile Baskısı</option>
                  <option value="self-confidence">Özgüven Eksikliği</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ek Notlar</label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500"
                  placeholder="Görüşmek istediğiniz konular hakkında kısa bilgi..."
                ></textarea>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowBookingModal(false)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-3 rounded-xl font-semibold transition-all duration-300"
              >
                İptal
              </button>
              <button
                onClick={() => {
                  setShowBookingModal(false);
                  alert('Randevu talebiniz alındı! En kısa sürede size dönüş yapacağız.');
                }}
                className="flex-1 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white px-4 py-3 rounded-xl font-semibold transition-all duration-300"
              >
                Randevu Al
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PsychologicalSupport;