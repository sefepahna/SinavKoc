import React, { useState } from 'react';
import { 
  FaRobot, 
  FaEdit, 
  FaDownload, 
  FaCalendarPlus, 
  FaCheck, 
  FaClock,
  FaBookOpen,
  FaChartBar
} from 'react-icons/fa';

const StudyPlan = () => {
  const [checkedTasks, setCheckedTasks] = useState<{[key: string]: boolean}>({});
  const [isRegenerating, setIsRegenerating] = useState(false);

  const weekDays = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];
  
  const dailyPlans = {
    'Pazartesi': [
      { id: '1', subject: 'Matematik', topic: 'Polinomlar', duration: '2 saat', time: '14:00-16:00', completed: false },
      { id: '2', subject: 'Türkçe', topic: 'Paragraf', duration: '1 saat', time: '16:30-17:30', completed: false },
      { id: '3', subject: 'Deneme', topic: 'TYT Deneme', duration: '3 saat', time: '19:00-22:00', completed: false }
    ],
    'Salı': [
      { id: '4', subject: 'Fizik', topic: 'Hareket', duration: '1.5 saat', time: '15:00-16:30', completed: false },
      { id: '5', subject: 'Matematik', topic: 'Limit', duration: '2 saat', time: '17:00-19:00', completed: false }
    ],
    'Çarşamba': [
      { id: '6', subject: 'Kimya', topic: 'Atomun Yapısı', duration: '1.5 saat', time: '14:00-15:30', completed: false },
      { id: '7', subject: 'Biyoloji', topic: 'Hücre', duration: '1 saat', time: '16:00-17:00', completed: false },
      { id: '8', subject: 'Türkçe', topic: 'Dil Bilgisi', duration: '1 saat', time: '20:00-21:00', completed: false }
    ],
    'Perşembe': [
      { id: '9', subject: 'Matematik', topic: 'Türev', duration: '2 saat', time: '15:00-17:00', completed: false },
      { id: '10', subject: 'Edebiyat', topic: 'Şiir', duration: '1 saat', time: '19:00-20:00', completed: false }
    ],
    'Cuma': [
      { id: '11', subject: 'Deneme', topic: 'AYT Deneme', duration: '3 saat', time: '14:00-17:00', completed: false },
      { id: '12', subject: 'Tekrar', topic: 'Haftalık Özet', duration: '2 saat', time: '19:00-21:00', completed: false }
    ],
    'Cumartesi': [
      { id: '13', subject: 'Sosyal', topic: 'Tarih', duration: '1.5 saat', time: '10:00-11:30', completed: false },
      { id: '14', subject: 'Coğrafya', topic: 'İklim', duration: '1 saat', time: '14:00-15:00', completed: false }
    ],
    'Pazar': [
      { id: '15', subject: 'Dinlenme', topic: 'Serbest Zaman', duration: '∞', time: 'Tüm gün', completed: false }
    ]
  };

  const subjectMastery = [
    { subject: 'Matematik', progress: 75, color: 'from-blue-500 to-blue-600' },
    { subject: 'Türkçe', progress: 68, color: 'from-green-500 to-green-600' },
    { subject: 'Fizik', progress: 82, color: 'from-purple-500 to-purple-600' },
    { subject: 'Kimya', progress: 71, color: 'from-yellow-500 to-yellow-600' },
    { subject: 'Biyoloji', progress: 79, color: 'from-pink-500 to-pink-600' },
    { subject: 'Edebiyat', progress: 65, color: 'from-indigo-500 to-indigo-600' }
  ];

  const handleTaskCheck = (taskId: string) => {
    setCheckedTasks(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  const handleRegenerate = async () => {
    setIsRegenerating(true);
    // Simulate AI regeneration
    await new Promise(resolve => setTimeout(resolve, 1200));
    setIsRegenerating(false);
    // Show success toast (mock)
    alert('Plan başarıyla yenilendi! 🎉');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6 animate-in slide-in-from-top-10 duration-1000">
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 mb-2">Çalışma Planım</h1>
            <p className="text-gray-600">AI destekli kişiselleştirilmiş haftalık programın</p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={handleRegenerate}
              disabled={isRegenerating}
              className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
            >
              {isRegenerating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Yenileniyor...</span>
                </>
              ) : (
                <>
                  <FaRobot size={16} />
                  <span>Yeniden Planla (AI)</span>
                </>
              )}
            </button>
            
            <button className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105">
              <FaEdit size={16} />
              <span>Planı Düzenle</span>
            </button>
            
            <button className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105">
              <FaDownload size={16} />
              <span>PDF İndir</span>
            </button>
            
            <button className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105">
              <FaCalendarPlus size={16} />
              <span>Takvime Ekle</span>
            </button>
          </div>
        </div>
      </div>

      {/* Weekly Plan */}
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
        {weekDays.map((day, dayIndex) => (
          <div 
            key={day} 
            className="bg-white rounded-2xl shadow-lg p-4 animate-in slide-in-from-bottom-10 duration-1000"
            style={{ animationDelay: `${dayIndex * 100}ms` }}
          >
            <h3 className="font-bold text-slate-800 mb-4 text-center border-b border-gray-200 pb-2">
              {day}
            </h3>
            
            <div className="space-y-3">
              {dailyPlans[day as keyof typeof dailyPlans]?.map((task) => (
                <div 
                  key={task.id}
                  className={`p-3 rounded-xl border-2 transition-all duration-300 cursor-pointer hover:scale-105 ${
                    checkedTasks[task.id] 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-gray-50 border-gray-200 hover:border-blue-300'
                  }`}
                  onClick={() => handleTaskCheck(task.id)}
                >
                  <div className="flex items-start space-x-2">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 transition-all duration-300 ${
                      checkedTasks[task.id] 
                        ? 'bg-green-500 border-green-500' 
                        : 'border-gray-300 hover:border-blue-500'
                    }`}>
                      {checkedTasks[task.id] && <FaCheck className="text-white" size={10} />}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className={`font-semibold text-sm transition-all duration-300 ${
                        checkedTasks[task.id] ? 'text-green-700 line-through' : 'text-slate-800'
                      }`}>
                        {task.subject}
                      </div>
                      <div className="text-xs text-gray-600 mb-1">{task.topic}</div>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <FaClock size={10} />
                        <span>{task.duration}</span>
                      </div>
                      <div className="text-xs text-blue-600 font-medium">{task.time}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Subject Mastery Heatmap */}
      <div className="bg-white rounded-2xl shadow-lg p-6 animate-in slide-in-from-bottom-10 duration-1000 delay-700">
        <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center space-x-2">
          <FaChartBar className="text-blue-600" />
          <span>Konu Hakimiyet Haritası</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjectMastery.map((subject, index) => (
            <div 
              key={subject.subject}
              className="space-y-3 animate-in slide-in-from-left-10 duration-1000"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-700">{subject.subject}</span>
                <span className="text-sm font-bold text-slate-800">{subject.progress}%</span>
              </div>
              
              <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r ${subject.color} rounded-full transition-all duration-1000 ease-out`}
                  style={{ 
                    width: `${subject.progress}%`,
                    animationDelay: `${index * 200}ms`
                  }}
                ></div>
              </div>
              
              <div className="text-xs text-gray-500">
                {subject.progress >= 80 ? 'Mükemmel 🎉' : 
                 subject.progress >= 60 ? 'İyi gidiyor 👍' : 
                 'Daha fazla çalışma gerekli 💪'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Info Note */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200 animate-in slide-in-from-bottom-10 duration-1000 delay-900">
        <div className="flex items-start space-x-3">
          <FaBookOpen className="text-blue-600 mt-1" size={20} />
          <div>
            <h4 className="font-semibold text-slate-800 mb-2">💡 Planın Nasıl Oluşturuluyor?</h4>
            <p className="text-gray-700 text-sm leading-relaxed">
              Bu plan, deneme sonuçlarına, hedef tarihine ve kişisel öğrenme hızına göre AI tarafından günlük optimize edilir. 
              Her gün tamamladığın görevler ve performansın analiz edilerek bir sonraki gün için en uygun program hazırlanır.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyPlan;