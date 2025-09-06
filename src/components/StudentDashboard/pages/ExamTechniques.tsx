import React, { useState } from 'react';
import { 
  FaClock, 
  FaBrain, 
  FaBookOpen, 
  FaPlay, 
  FaDownload,
  FaCheckCircle,
  FaLightbulb,
  FaHeartbeat,
  FaTarget,
  FaCalendarAlt
} from 'react-icons/fa';

interface Technique {
  id: string;
  title: string;
  description: string;
  category: 'Zaman Yönetimi' | 'Stres Yönetimi' | 'Soru Çözme' | 'Sınav Günü';
  type: 'Video' | 'PDF' | 'Ses';
  duration?: string;
  completed: boolean;
}

const ExamTechniques = () => {
  const [activeCategory, setActiveCategory] = useState<string>('Tümü');
  const [showTrainingModal, setShowTrainingModal] = useState(false);
  
  const [techniques, setTechniques] = useState<Technique[]>([
    {
      id: '1',
      title: 'Sınav Zamanı Yönetimi',
      description: 'Sınavda zamanını en verimli şekilde kullanma teknikleri',
      category: 'Zaman Yönetimi',
      type: 'Video',
      duration: '15 dk',
      completed: false
    },
    {
      id: '2',
      title: 'Nefes Teknikleri ile Stres Kontrolü',
      description: 'Sınav öncesi ve esnasında stresini kontrol etme yöntemleri',
      category: 'Stres Yönetimi',
      type: 'Video',
      duration: '12 dk',
      completed: true
    },
    {
      id: '3',
      title: 'Etkili Soru Okuma Teknikleri',
      description: 'Soruları hızlı ve doğru anlama stratejileri',
      category: 'Soru Çözme',
      type: 'PDF',
      completed: false
    },
    {
      id: '4',
      title: 'Sınav Günü Rutini',
      description: 'Sınav günü yapılması ve yapılmaması gerekenler',
      category: 'Sınav Günü',
      type: 'PDF',
      completed: false
    },
    {
      id: '5',
      title: 'Konsantrasyon Artırma Egzersizleri',
      description: 'Dikkat ve odaklanma kapasiteni artıran teknikler',
      category: 'Stres Yönetimi',
      type: 'Ses',
      duration: '20 dk',
      completed: false
    },
    {
      id: '6',
      title: 'Soru Seçme ve Atlama Stratejileri',
      description: 'Hangi soruları çözmeli, hangilerini atlamalı?',
      category: 'Soru Çözme',
      type: 'Video',
      duration: '18 dk',
      completed: false
    }
  ]);

  const categories = ['Tümü', 'Zaman Yönetimi', 'Stres Yönetimi', 'Soru Çözme', 'Sınav Günü'];

  const filteredTechniques = activeCategory === 'Tümü' 
    ? techniques 
    : techniques.filter(t => t.category === activeCategory);

  const completedCount = techniques.filter(t => t.completed).length;
  const totalCount = techniques.length;

  const toggleCompletion = (id: string) => {
    setTechniques(prev => prev.map(technique => 
      technique.id === id 
        ? { ...technique, completed: !technique.completed }
        : technique
    ));
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Zaman Yönetimi': 'bg-blue-100 text-blue-800',
      'Stres Yönetimi': 'bg-green-100 text-green-800',
      'Soru Çözme': 'bg-purple-100 text-purple-800',
      'Sınav Günü': 'bg-red-100 text-red-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Video':
        return <FaPlay className="text-red-500" size={16} />;
      case 'PDF':
        return <FaBookOpen className="text-blue-500" size={16} />;
      case 'Ses':
        return <FaHeartbeat className="text-green-500" size={16} />;
      default:
        return <FaBookOpen className="text-gray-500" size={16} />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 rounded-2xl p-6 text-white">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
            <FaBrain size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">Sınav Teknik Eğitimi</h1>
            <p className="text-orange-100 text-lg">Sınavda başarılı olmanın sırları</p>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-slate-800">Eğitim İlerlemen</h3>
            <p className="text-gray-600">Tamamlanan teknikler: {completedCount}/{totalCount}</p>
          </div>
          
          <button
            onClick={() => setShowTrainingModal(true)}
            className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
          >
            <FaCalendarAlt className="mr-2" size={16} />
            Canlı Eğitim Al
          </button>
        </div>
        
        <div className="bg-gray-200 rounded-full h-3 overflow-hidden mb-2">
          <div 
            className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%` }}
          ></div>
        </div>
        <div className="text-sm text-gray-600">
          %{Math.round((completedCount / totalCount) * 100)} tamamlandı
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 hover:scale-105 ${
                activeCategory === category
                  ? 'bg-orange-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Techniques List */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-slate-800 mb-6">
          {activeCategory === 'Tümü' ? 'Tüm Teknikler' : activeCategory}
        </h3>
        
        {filteredTechniques.length > 0 ? (
          <div className="space-y-4">
            {filteredTechniques.map((technique, index) => (
              <div
                key={technique.id}
                className={`p-6 rounded-xl border-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${
                  technique.completed 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-gray-50 border-gray-200 hover:border-orange-300'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <button
                    onClick={() => toggleCompletion(technique.id)}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                      technique.completed 
                        ? 'bg-green-500 border-green-500' 
                        : 'border-gray-300 hover:border-orange-500'
                    }`}
                  >
                    {technique.completed && <FaCheckCircle className="text-white" size={12} />}
                  </button>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className={`font-bold text-lg mb-2 ${
                          technique.completed ? 'text-green-700 line-through' : 'text-slate-800'
                        }`}>
                          {technique.title}
                        </h4>
                        <p className="text-gray-600 mb-3">{technique.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(technique.category)}`}>
                          {technique.category}
                        </span>
                        
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          {getTypeIcon(technique.type)}
                          <span>{technique.type}</span>
                          {technique.duration && (
                            <>
                              <span>•</span>
                              <span>{technique.duration}</span>
                            </>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={() => alert(`"${technique.title}" açılıyor...`)}
                        className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                      >
                        {technique.type === 'Video' ? 'İzle' : 
                         technique.type === 'Ses' ? 'Dinle' : 'Oku'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <FaBrain className="mx-auto text-gray-300 mb-4" size={48} />
            <p className="text-gray-500">Bu kategoride teknik bulunamadı</p>
          </div>
        )}
      </div>

      {/* Live Training Modal */}
      {showTrainingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-slate-800 mb-6">Canlı Sınav Teknik Eğitimi</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Eğitim Türü</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500">
                  <option value="individual">Bireysel Eğitim</option>
                  <option value="group">Grup Eğitimi</option>
                  <option value="intensive">Yoğun Hazırlık</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Odak Alanı</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500">
                  <option value="">Alan seçin</option>
                  <option value="time-management">Zaman Yönetimi</option>
                  <option value="stress-control">Stres Kontrolü</option>
                  <option value="question-strategy">Soru Çözme Stratejisi</option>
                  <option value="exam-day">Sınav Günü Hazırlığı</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tercih Edilen Zaman</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500">
                  <option value="">Zaman seçin</option>
                  <option value="morning">Sabah (09:00-12:00)</option>
                  <option value="afternoon">Öğleden Sonra (13:00-17:00)</option>
                  <option value="evening">Akşam (18:00-21:00)</option>
                </select>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowTrainingModal(false)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-3 rounded-xl font-semibold transition-all duration-300"
              >
                İptal
              </button>
              <button
                onClick={() => {
                  setShowTrainingModal(false);
                  alert('Eğitim talebiniz alındı! Uzman eğitmenimiz size ulaşacak.');
                }}
                className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-4 py-3 rounded-xl font-semibold transition-all duration-300"
              >
                Eğitim Al
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Tips */}
      <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-200">
        <div className="flex items-center space-x-3 mb-4">
          <FaLightbulb className="text-orange-600" size={24} />
          <h4 className="font-bold text-slate-800">💡 Günün İpucu</h4>
        </div>
        <p className="text-gray-700 leading-relaxed">
          <strong>Sınav öncesi son 10 dakika:</strong> Derin nefes al, omuzlarını gevşet ve 
          kendine "Ben hazırım, elimden geleni yapacağım" de. Pozitif düşünce gücünü hafife alma!
        </p>
      </div>
    </div>
  );
};

export default ExamTechniques;