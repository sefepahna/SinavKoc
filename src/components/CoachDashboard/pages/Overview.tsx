import React, { useState, useEffect } from 'react';
import { 
  FaClock, 
  FaTasks, 
  FaChartLine, 
  FaFire, 
  FaCalendarDay, 
  FaUpload, 
  FaComments,
  FaCrown,
  FaArrowUp
} from 'react-icons/fa';

const Overview = () => {
  const [studyHours, setStudyHours] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [lastExamScore, setLastExamScore] = useState(0);
  const [streak, setStreak] = useState(0);

  // Animate numbers on mount
  useEffect(() => {
    const animateNumber = (setter: React.Dispatch<React.SetStateAction<number>>, target: number) => {
      let current = 0;
      const increment = target / 30;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setter(target);
          clearInterval(timer);
        } else {
          setter(Math.floor(current));
        }
      }, 50);
    };

    setTimeout(() => animateNumber(setStudyHours, 24), 200);
    setTimeout(() => animateNumber(setCompletedTasks, 12), 400);
    setTimeout(() => animateNumber(setLastExamScore, 385), 600);
    setTimeout(() => animateNumber(setStreak, 7), 800);
  }, []);

  const weeklyData = [
    { day: 'Pzt', hours: 4 },
    { day: 'Sal', hours: 3 },
    { day: 'Çar', hours: 5 },
    { day: 'Per', hours: 4 },
    { day: 'Cum', hours: 6 },
    { day: 'Cmt', hours: 2 },
    { day: 'Paz', hours: 0 }
  ];

  const subjectProgress = [
    { subject: 'Matematik', current: 75, change: +12 },
    { subject: 'Türkçe', current: 68, change: +8 },
    { subject: 'Fen', current: 82, change: +15 },
    { subject: 'Sosyal', current: 71, change: +5 }
  ];

  return (
    <div className="space-y-6">
      {/* Pro Upgrade Banner */}
      <div className="bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl p-4 text-white animate-in slide-in-from-top-10 duration-1000">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FaCrown size={24} className="animate-pulse" />
            <div>
              <div className="font-bold">Pro'ya geç • En iyi sonuçlar için önerilir</div>
              <div className="text-sm opacity-90">Sınırsız deneme analizi ve kişisel koç desteği</div>
            </div>
          </div>
          <button className="bg-white text-orange-600 hover:bg-orange-50 px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 hover:scale-105">
            Yükselt
          </button>
        </div>
      </div>

      {/* Hero Card */}
      <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-3xl p-8 text-white animate-in slide-in-from-left-10 duration-1000 delay-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Merhaba, Ayşe! 👋</h1>
            <p className="text-blue-100 text-lg">Bugün de harika bir gün olacak!</p>
          </div>
          <div className="text-right">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <FaCrown className="text-yellow-400" size={20} />
              <span className="font-bold">SınavKoç Plus</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <FaClock className="mx-auto mb-2 text-blue-200" size={24} />
            <div className="text-2xl font-bold">{studyHours}</div>
            <div className="text-sm text-blue-200">Saat Bu Hafta</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <FaTasks className="mx-auto mb-2 text-green-200" size={24} />
            <div className="text-2xl font-bold">{completedTasks}</div>
            <div className="text-sm text-green-200">Tamamlanan</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <FaChartLine className="mx-auto mb-2 text-yellow-200" size={24} />
            <div className="text-2xl font-bold">{lastExamScore}</div>
            <div className="text-sm text-yellow-200">Son Net</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <FaFire className="mx-auto mb-2 text-orange-200" size={24} />
            <div className="text-2xl font-bold">{streak}</div>
            <div className="text-sm text-orange-200">Gün Streak</div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Study Hours */}
        <div className="bg-white rounded-2xl shadow-lg p-6 animate-in slide-in-from-left-10 duration-1000 delay-400">
          <h3 className="text-xl font-bold text-slate-800 mb-6">Haftalık Çalışma Süresi</h3>
          <div className="space-y-4">
            {weeklyData.map((day, index) => (
              <div key={day.day} className="flex items-center space-x-4">
                <div className="w-8 text-sm font-medium text-gray-600">{day.day}</div>
                <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000 ease-out"
                    style={{ 
                      width: `${(day.hours / 6) * 100}%`,
                      animationDelay: `${index * 100}ms`
                    }}
                  ></div>
                </div>
                <div className="w-8 text-sm font-bold text-slate-800">{day.hours}s</div>
              </div>
            ))}
          </div>
        </div>

        {/* Subject Progress */}
        <div className="bg-white rounded-2xl shadow-lg p-6 animate-in slide-in-from-right-10 duration-1000 delay-600">
          <h3 className="text-xl font-bold text-slate-800 mb-6">Branş Net Değişimi</h3>
          <div className="space-y-4">
            {subjectProgress.map((subject, index) => (
              <div key={subject.subject} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-700">{subject.subject}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-bold text-slate-800">{subject.current}</span>
                    <div className={`flex items-center space-x-1 text-xs font-bold ${
                      subject.change > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      <FaArrowUp size={10} className={subject.change < 0 ? 'rotate-180' : ''} />
                      <span>{Math.abs(subject.change)}</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full transition-all duration-1000 ease-out"
                    style={{ 
                      width: `${subject.current}%`,
                      animationDelay: `${index * 200}ms`
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-in slide-in-from-bottom-10 duration-1000 delay-800">
        <button className="bg-white hover:bg-blue-50 rounded-2xl shadow-lg p-6 text-left transition-all duration-300 hover:scale-105 hover:shadow-xl group">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 rounded-xl group-hover:bg-blue-200 transition-colors duration-300">
              <FaCalendarDay className="text-blue-600" size={24} />
            </div>
            <div>
              <div className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors duration-300">
                Bugünün Planını Gör
              </div>
              <div className="text-sm text-gray-600">5 görev seni bekliyor</div>
            </div>
          </div>
        </button>

        <button className="bg-white hover:bg-green-50 rounded-2xl shadow-lg p-6 text-left transition-all duration-300 hover:scale-105 hover:shadow-xl group">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-100 rounded-xl group-hover:bg-green-200 transition-colors duration-300">
              <FaUpload className="text-green-600" size={24} />
            </div>
            <div>
              <div className="font-bold text-slate-800 group-hover:text-green-600 transition-colors duration-300">
                Deneme Sonucu Yükle
              </div>
              <div className="text-sm text-gray-600">Analizini hemen gör</div>
            </div>
          </div>
        </button>

        <button className="bg-white hover:bg-purple-50 rounded-2xl shadow-lg p-6 text-left transition-all duration-300 hover:scale-105 hover:shadow-xl group">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-purple-100 rounded-xl group-hover:bg-purple-200 transition-colors duration-300">
              <FaComments className="text-purple-600" size={24} />
            </div>
            <div>
              <div className="font-bold text-slate-800 group-hover:text-purple-600 transition-colors duration-300">
                Koçumla Mesajlaş
              </div>
              <div className="text-sm text-gray-600">2 yeni mesaj var</div>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Overview;