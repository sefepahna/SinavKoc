import React, { useState } from 'react';
import { 
  FaBook, 
  FaRobot, 
  FaCheck, 
  FaClock, 
  FaDownload,
  FaUpload,
  FaEye,
  FaCalendarAlt,
  FaChartBar
} from 'react-icons/fa';

interface Homework {
  id: string;
  title: string;
  subject: string;
  assignedBy: string;
  assignedDate: string;
  dueDate: string;
  difficulty: 'Kolay' | 'Orta' | 'Zor';
  estimatedTime: string;
  source: string;
  description: string;
  status: 'Bekliyor' | 'Devam' | 'Tamamlandı' | 'Gecikti';
  submissionUrl?: string;
  feedback?: string;
  aiGenerated: boolean;
}

const Homework = () => {
  const [activeTab, setActiveTab] = useState<'pending' | 'completed'>('pending');
  const [selectedHomework, setSelectedHomework] = useState<string | null>(null);
  
  const [homeworks, setHomeworks] = useState<Homework[]>([
    {
      id: '1',
      title: 'Polinomlar Soru Seti',
      subject: 'Matematik',
      assignedBy: 'Mehmet Hoca',
      assignedDate: '2024-01-15',
      dueDate: '2024-01-18',
      difficulty: 'Orta',
      estimatedTime: '2 saat',
      source: 'Palme Yayınları - Matematik Soru Bankası',
      description: 'Polinomlar konusunda 25 soru çözümü. Özellikle faktörizasyon ve çarpanlara ayırma konularına odaklan.',
      status: 'Bekliyor',
      aiGenerated: false
    },
    {
      id: '2',
      title: 'Paragraf Analizi Çalışması',
      subject: 'Türkçe',
      assignedBy: 'AI Asistan',
      assignedDate: '2024-01-14',
      dueDate: '2024-01-17',
      difficulty: 'Kolay',
      estimatedTime: '1.5 saat',
      source: 'SınavKoç AI Özel Soru Seti',
      description: 'Deneme analizine göre hazırlanmış kişiselleştirilmiş paragraf soruları. Zayıf olduğun ana fikir bulma konusuna odaklanıyor.',
      status: 'Devam',
      aiGenerated: true
    },
    {
      id: '3',
      title: 'Fotosentez Konu Tekrarı',
      subject: 'Biyoloji',
      assignedBy: 'Can Hoca',
      assignedDate: '2024-01-12',
      dueDate: '2024-01-15',
      difficulty: 'Zor',
      estimatedTime: '3 saat',
      source: 'Ders Kitabı + Video Serisi',
      description: 'Fotosentez konusunu detaylı çalış ve verilen test sorularını çöz.',
      status: 'Tamamlandı',
      submissionUrl: '#',
      feedback: 'Mükemmel! Konuyu çok iyi kavramışsın. Sadece Calvin döngüsü detaylarını bir kez daha gözden geçir.',
      aiGenerated: false
    }
  ]);

  const pendingHomeworks = homeworks.filter(h => h.status === 'Bekliyor' || h.status === 'Devam' || h.status === 'Gecikti');
  const completedHomeworks = homeworks.filter(h => h.status === 'Tamamlandı');

  const currentHomeworks = activeTab === 'pending' ? pendingHomeworks : completedHomeworks;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Bekliyor':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Devam':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Tamamlandı':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Gecikti':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Kolay':
        return 'bg-green-100 text-green-800';
      case 'Orta':
        return 'bg-yellow-100 text-yellow-800';
      case 'Zor':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSubjectColor = (subject: string) => {
    const colors = {
      'Matematik': 'bg-blue-500',
      'Türkçe': 'bg-green-500',
      'Fizik': 'bg-red-500',
      'Kimya': 'bg-yellow-500',
      'Biyoloji': 'bg-purple-500',
      'Tarih': 'bg-indigo-500',
      'Coğrafya': 'bg-pink-500'
    };
    return colors[subject as keyof typeof colors] || 'bg-gray-500';
  };

  const updateHomeworkStatus = (id: string, newStatus: 'Bekliyor' | 'Devam' | 'Tamamlandı') => {
    setHomeworks(prev => prev.map(homework => 
      homework.id === id ? { ...homework, status: newStatus } : homework
    ));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long'
    });
  };

  const getDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 rounded-2xl p-6 text-white">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
            <FaBook size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">Ödevlerim</h1>
            <p className="text-green-100 text-lg">Koç ve AI destekli kişiselleştirilmiş ödevler</p>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
            <div className="text-2xl font-bold text-blue-600 mb-1">{pendingHomeworks.length}</div>
            <div className="text-sm text-gray-600">Bekleyen Ödev</div>
          </div>
          <div className="text-center bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
            <div className="text-2xl font-bold text-green-600 mb-1">{completedHomeworks.length}</div>
            <div className="text-sm text-gray-600">Tamamlanan</div>
          </div>
          <div className="text-center bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
            <div className="text-2xl font-bold text-purple-600 mb-1">
              {homeworks.filter(h => h.aiGenerated).length}
            </div>
            <div className="text-sm text-gray-600">AI Önerisi</div>
          </div>
          <div className="text-center bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4">
            <div className="text-2xl font-bold text-orange-600 mb-1">
              {Math.round((completedHomeworks.length / homeworks.length) * 100)}%
            </div>
            <div className="text-sm text-gray-600">Tamamlanma</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-lg">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('pending')}
            className={`flex-1 flex items-center justify-center space-x-2 px-6 py-4 font-semibold transition-all duration-300 ${
              activeTab === 'pending'
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
            }`}
          >
            <FaClock size={20} />
            <span>Bekleyen Ödevler</span>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
              {pendingHomeworks.length}
            </span>
          </button>
          
          <button
            onClick={() => setActiveTab('completed')}
            className={`flex-1 flex items-center justify-center space-x-2 px-6 py-4 font-semibold transition-all duration-300 ${
              activeTab === 'completed'
                ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
            }`}
          >
            <FaCheck size={20} />
            <span>Tamamlanan</span>
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
              {completedHomeworks.length}
            </span>
          </button>
        </div>

        {/* Homework List */}
        <div className="p-6">
          {currentHomeworks.length > 0 ? (
            <div className="space-y-4">
              {currentHomeworks.map((homework, index) => (
                <div
                  key={homework.id}
                  className="bg-gray-50 hover:bg-gray-100 rounded-xl p-6 transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-bold text-slate-800 text-lg">{homework.title}</h4>
                        {homework.aiGenerated && (
                          <div className="flex items-center space-x-1 bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium">
                            <FaRobot size={10} />
                            <span>AI</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-4 mb-3">
                        <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full ${getSubjectColor(homework.subject)}`}></div>
                          <span className="text-sm font-medium text-gray-700">{homework.subject}</span>
                        </div>
                        
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(homework.difficulty)}`}>
                          {homework.difficulty}
                        </span>
                        
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(homework.status)}`}>
                          {homework.status}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 mb-3">{homework.description}</p>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>Veren: {homework.assignedBy}</span>
                        <span>Süre: {homework.estimatedTime}</span>
                        <span>Kaynak: {homework.source}</span>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm mt-2">
                        <span className="text-gray-600">
                          Verildi: {formatDate(homework.assignedDate)}
                        </span>
                        <span className={`font-medium ${
                          getDaysUntilDue(homework.dueDate) < 0 ? 'text-red-600' :
                          getDaysUntilDue(homework.dueDate) <= 1 ? 'text-orange-600' :
                          'text-green-600'
                        }`}>
                          Teslim: {formatDate(homework.dueDate)} 
                          ({getDaysUntilDue(homework.dueDate) < 0 ? 'Gecikti' :
                            getDaysUntilDue(homework.dueDate) === 0 ? 'Bugün' :
                            `${getDaysUntilDue(homework.dueDate)} gün kaldı`})
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => alert('Ödev detayları görüntüleniyor...')}
                      className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                    >
                      <FaEye size={16} />
                      <span>Detaylar</span>
                    </button>
                    
                    {homework.status !== 'Tamamlandı' && (
                      <button
                        onClick={() => updateHomeworkStatus(homework.id, 'Tamamlandı')}
                        className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                      >
                        <FaUpload size={16} />
                        <span>Teslim Et</span>
                      </button>
                    )}
                    
                    {homework.submissionUrl && (
                      <button
                        onClick={() => alert('Teslim edilen ödev görüntüleniyor...')}
                        className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                      >
                        <FaDownload size={16} />
                        <span>İndir</span>
                      </button>
                    )}
                  </div>

                  {homework.feedback && (
                    <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl">
                      <div className="flex items-center space-x-2 mb-2">
                        <FaCheck className="text-green-600" size={16} />
                        <span className="font-semibold text-green-800">Koç Geri Bildirimi</span>
                      </div>
                      <p className="text-green-700">{homework.feedback}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FaBook className="mx-auto text-gray-300 mb-4" size={64} />
              <h3 className="text-xl font-bold text-gray-600 mb-2">
                {activeTab === 'pending' ? 'Bekleyen ödev yok' : 'Tamamlanan ödev yok'}
              </h3>
              <p className="text-gray-500">
                {activeTab === 'pending' 
                  ? 'Şu anda bekleyen ödevin bulunmuyor. Koçun yeni ödevler verebilir.'
                  : 'Henüz tamamladığın ödev yok. İlk ödevini tamamla!'
                }
              </p>
            </div>
          )}
        </div>
      </div>

      {/* AI Homework Generator */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-200">
        <div className="flex items-center space-x-4 mb-4">
          <div className="p-3 bg-purple-600 rounded-xl">
            <FaRobot className="text-white" size={24} />
          </div>
          <div>
            <h4 className="font-bold text-slate-800">🤖 AI Ödev Önerileri</h4>
            <p className="text-gray-600">Deneme analizine göre kişiselleştirilmiş ödevler</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
          <div className="space-y-2">
            <p>• Zayıf konularına odaklanan sorular</p>
            <p>• Kişisel öğrenme hızına uygun zorluk</p>
            <p>• Hedef puanına göre soru seçimi</p>
          </div>
          <div className="space-y-2">
            <p>• Otomatik zorluk ayarlaması</p>
            <p>• Performans takibi ve analiz</p>
            <p>• Koçla entegre geri bildirim</p>
          </div>
        </div>
        
        <button className="w-full mt-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105">
          <FaRobot className="mr-2" size={16} />
          AI'dan Ödev Önerisi Al
        </button>
      </div>
    </div>
  );
};

export default Homework;