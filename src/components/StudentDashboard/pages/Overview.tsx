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
  FaArrowUp,
  FaBolt,
  FaBullseye
} from 'react-icons/fa';
import PomodoroTimer from '../components/PomodoroTimer';
import Leaderboard from '../components/Leaderboard';

const Overview = () => {
  const [studyHours, setStudyHours] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [lastExamScore, setLastExamScore] = useState(0);
  const [streak, setStreak] = useState(0);

  // Animate numbers on mount
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    
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
      return timer;
    };

    timers.push(setTimeout(() => timers.push(animateNumber(setStudyHours, 24)), 200));
    timers.push(setTimeout(() => timers.push(animateNumber(setCompletedTasks, 12)), 400));
    timers.push(setTimeout(() => timers.push(animateNumber(setLastExamScore, 385)), 600));
    timers.push(setTimeout(() => timers.push(animateNumber(setStreak, 7)), 800));
    
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, []);

  const weeklyData = [
    { day: 'Pzt', hours: 4, target: 5 },
    { day: 'Sal', hours: 3, target: 5 },
    { day: 'Çar', hours: 5, target: 5 },
    { day: 'Per', hours: 4, target: 5 },
    { day: 'Cum', hours: 6, target: 5 },
    { day: 'Cmt', hours: 2, target: 3 },
    { day: 'Paz', hours: 0, target: 2 }
  ];

  const subjectProgress = [
    { subject: 'Matematik', current: 75, change: +12, color: 'from-blue-500 to-blue-600' },
    { subject: 'Türkçe', current: 68, change: +8, color: 'from-green-500 to-green-600' },
    { subject: 'Fen', current: 82, change: +15, color: 'from-purple-500 to-purple-600' },
    { subject: 'Sosyal', current: 71, change: +5, color: 'from-orange-500 to-orange-600' }
  ];

  const todaysTasks = [
    { id: 1, title: 'Matematik - Polinomlar', time: '14:00', completed: false },
    { id: 2, title: 'Türkçe - Paragraf', time: '16:00', completed: true },
    { id: 3, title: 'TYT Deneme', time: '19:00', completed: false }
  ];

  const upcomingEvents = [
    { id: 1, title: 'Matematik Dersi', time: '14:00', type: 'lesson' },
    { id: 2, title: 'Deneme Sınavı', time: 'Yarın 09:00', type: 'exam' },
    { id: 3, title: 'Koç Görüşmesi', time: 'Cuma 15:00', type: 'meeting' }
  ];

  return (
    <div className="space-y-6">
      {/* Enhanced Pro Upgrade Banner */}
      <div className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 rounded-2xl p-6 text-white animate-in slide-in-from-top-10 duration-1000 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
              <FaCrown size={28} className="animate-pulse" />
            </div>
            <div>
              <div className="text-xl font-bold mb-1">SınavKoç Pro'ya Geç!</div>
              <div className="text-sm opacity-90">Sınırsız deneme analizi, kişisel koç desteği ve garantili başarı</div>
              <div className="flex items-center space-x-4 mt-2 text-sm">
                <span className="bg-white/20 px-2 py-1 rounded-full">✨ Premium Özellikler</span>
                <span className="bg-white/20 px-2 py-1 rounded-full">🎯 %95 Başarı Oranı</span>
              </div>
            </div>
          </div>
          <button className="bg-white text-orange-600 hover:bg-orange-50 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-105 shadow-lg">
            Hemen Yükselt
          </button>
        </div>
      </div>

      {/* Enhanced Hero Card */}
      <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-3xl p-8 text-white animate-in slide-in-from-left-10 duration-1000 delay-200 shadow-2xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-3">Merhaba, Ayşe! 👋</h1>
            <p className="text-blue-100 text-xl">Bugün de harika bir gün olacak!</p>
            <div className="flex items-center space-x-4 mt-3 text-sm">
              <div className="flex items-center space-x-1">
                <FaFire className="text-orange-400" />
                <span>{streak} günlük seri</span>
              </div>
              <div className="flex items-center space-x-1">
                <FaBullseye className="text-green-400" />
                <span>Hedef: 450 puan</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-3">
              <FaCrown className="text-yellow-400" size={24} />
              <span className="font-bold text-lg">SınavKoç Plus</span>
            </div>
            <div className="text-blue-100 text-sm">Aktif üyelik</div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
            <FaClock className="mx-auto mb-3 text-blue-200" size={28} />
            <div className="text-3xl font-bold mb-1">{studyHours}</div>
            <div className="text-sm text-blue-200">Saat Bu Hafta</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
            <FaTasks className="mx-auto mb-3 text-green-200" size={28} />
            <div className="text-3xl font-bold mb-1">{completedTasks}</div>
            <div className="text-sm text-green-200">Tamamlanan</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
            <FaChartLine className="mx-auto mb-3 text-yellow-200" size={28} />
            <div className="text-3xl font-bold mb-1">{lastExamScore}</div>
            <div className="text-sm text-yellow-200">Son Net</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
            <FaFire className="mx-auto mb-3 text-orange-200" size={28} />
            <div className="text-3xl font-bold mb-1">{streak}</div>
            <div className="text-sm text-orange-200">Gün Streak</div>
          </div>
        </div>
      </div>

      {/* Today's Tasks Preview */}
      <div className="bg-white rounded-2xl shadow-xl p-6 animate-in slide-in-from-right-10 duration-1000 delay-300 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl">
              <FaCalendarDay className="text-white" size={20} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800">Bugünün Görevleri</h3>
              <p className="text-sm text-gray-600">{todaysTasks.filter(t => !t.completed).length} görev kaldı</p>
            </div>
          </div>
          <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm transition-colors duration-300">
            Tümünü Gör →
          </button>
        </div>

        <div className="space-y-3">
          {todaysTasks.slice(0, 3).map((task, index) => (
            <div
              key={task.id}
              className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 hover:scale-[1.02] ${
                task.completed 
                  ? 'bg-green-50 border border-green-200' 
                  : 'bg-gray-50 border border-gray-200 hover:border-blue-300'
              }`}
            >
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                task.completed 
                  ? 'bg-green-500 border-green-500' 
                  : 'border-gray-300 hover:border-blue-500'
              }`}>
                {task.completed && <span className="text-white text-xs">✓</span>}
              </div>
              <div className="flex-1">
                <div className={`font-semibold ${task.completed ? 'line-through text-green-700' : 'text-slate-800'}`}>
                  {task.title}
                </div>
                <div className="text-sm text-gray-600">{task.time}</div>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                task.completed 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {task.completed ? 'Tamamlandı' : 'Bekliyor'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pomodoro ve Leaderboard Section */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 animate-in slide-in-from-left-10 duration-700 delay-400">
          <PomodoroTimer />
        </div>
        <div className="lg:col-span-3 animate-in slide-in-from-right-10 duration-700 delay-600">
          <Leaderboard />
        </div>
      </div>

      {/* Enhanced Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Study Hours */}
        <div className="bg-white rounded-2xl shadow-xl p-6 animate-in slide-in-from-left-10 duration-1000 delay-800 border border-gray-100">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
              <FaClock className="text-white" size={20} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800">Haftalık Çalışma</h3>
              <p className="text-sm text-gray-600">Hedeflerle karşılaştırma</p>
            </div>
          </div>
          
          <div className="space-y-4">
            {weeklyData.map((day, index) => (
              <div key={day.day} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 text-sm font-bold text-gray-700">{day.day}</div>
                    <div className={`w-3 h-3 rounded-full ${
                      day.hours >= day.target ? 'bg-green-500' : 'bg-orange-500'
                    }`}></div>
                  </div>
                  <div className="text-sm font-bold text-slate-800">{day.hours}s / {day.target}s</div>
                </div>
                
                <div className="flex space-x-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000 ease-out"
                      style={{ 
                        width: `${Math.min((day.hours / day.target) * 100, 100)}%`,
                        animationDelay: `${index * 100}ms`
                      }}
                    ></div>
                  </div>
                  <div className="w-16 bg-gray-100 rounded-full h-3 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full transition-all duration-1000 ease-out opacity-50"
                      style={{ width: '100%' }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
            <div className="text-center">
              <div className="text-sm text-gray-700 mb-1">Bu hafta hedefin</div>
              <div className="text-2xl font-bold text-blue-600">
                %{Math.round((weeklyData.reduce((sum, day) => sum + day.hours, 0) / weeklyData.reduce((sum, day) => sum + day.target, 0)) * 100)}
              </div>
              <div className="text-xs text-gray-600">tamamlandı</div>
            </div>
          </div>
        </div>

        {/* Enhanced Subject Progress */}
        <div className="bg-white rounded-2xl shadow-xl p-6 animate-in slide-in-from-right-10 duration-1000 delay-1000 border border-gray-100">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl">
              <FaChartLine className="text-white" size={20} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800">Branş Performansı</h3>
              <p className="text-sm text-gray-600">Son hafta değişimi</p>
            </div>
          </div>
          
          <div className="space-y-6">
            {subjectProgress.map((subject, index) => (
              <div key={subject.subject} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${subject.color}`}></div>
                    <span className="font-semibold text-gray-700">{subject.subject}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-lg font-bold text-slate-800">{subject.current}</span>
                    <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-bold ${
                      subject.change > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      <FaArrowUp size={10} className={subject.change < 0 ? 'rotate-180' : ''} />
                      <span>{Math.abs(subject.change)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${subject.color} rounded-full transition-all duration-1000 ease-out relative`}
                    style={{ 
                      width: `${subject.current}%`,
                      animationDelay: `${index * 200}ms`
                    }}
                  >
                    <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
                  </div>
                </div>
                
                <div className="text-xs text-gray-500 text-right">
                  {subject.current >= 80 ? '🎉 Mükemmel!' : 
                   subject.current >= 60 ? '👍 İyi gidiyor' : 
                   '💪 Daha fazla çalışma gerekli'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-white rounded-2xl shadow-xl p-6 animate-in slide-in-from-bottom-10 duration-1000 delay-600 border border-gray-100">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
            <FaBolt className="text-white" size={20} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800">Yaklaşan Etkinlikler</h3>
            <p className="text-sm text-gray-600">Bugün ve yakın zamanda</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {upcomingEvents.map((event, index) => (
            <div
              key={event.id}
              className="p-4 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center space-x-3 mb-2">
                <div className={`w-3 h-3 rounded-full ${
                  event.type === 'lesson' ? 'bg-blue-500' :
                  event.type === 'exam' ? 'bg-red-500' : 'bg-green-500'
                }`}></div>
                <span className="font-semibold text-slate-800">{event.title}</span>
              </div>
              <div className="text-sm text-gray-600 flex items-center space-x-1">
                <FaClock size={12} />
                <span>{event.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in slide-in-from-bottom-10 duration-1000 delay-800">
        <button className="bg-white hover:bg-blue-50 rounded-2xl shadow-xl p-6 text-left transition-all duration-300 hover:scale-105 hover:shadow-2xl group border border-gray-100">
          <div className="flex items-center space-x-4">
            <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl group-hover:from-blue-600 group-hover:to-blue-700 transition-all duration-300 transform group-hover:scale-110">
              <FaCalendarDay className="text-white" size={28} />
            </div>
            <div>
              <div className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors duration-300 text-lg">
                Bugünün Planını Gör
              </div>
              <div className="text-sm text-gray-600">5 görev seni bekliyor</div>
              <div className="text-xs text-blue-600 font-medium mt-1">→ Hemen başla</div>
            </div>
          </div>
        </button>

        <button className="bg-white hover:bg-green-50 rounded-2xl shadow-xl p-6 text-left transition-all duration-300 hover:scale-105 hover:shadow-2xl group border border-gray-100">
          <div className="flex items-center space-x-4">
            <div className="p-4 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl group-hover:from-green-600 group-hover:to-green-700 transition-all duration-300 transform group-hover:scale-110">
              <FaUpload className="text-white" size={28} />
            </div>
            <div>
              <div className="font-bold text-slate-800 group-hover:text-green-600 transition-colors duration-300 text-lg">
                Deneme Sonucu Yükle
              </div>
              <div className="text-sm text-gray-600">Analizini hemen gör</div>
              <div className="text-xs text-green-600 font-medium mt-1">→ AI analizi</div>
            </div>
          </div>
        </button>

        <button className="bg-white hover:bg-purple-50 rounded-2xl shadow-xl p-6 text-left transition-all duration-300 hover:scale-105 hover:shadow-2xl group border border-gray-100">
          <div className="flex items-center space-x-4">
            <div className="p-4 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl group-hover:from-purple-600 group-hover:to-purple-700 transition-all duration-300 transform group-hover:scale-110">
              <FaComments className="text-white" size={28} />
            </div>
            <div>
              <div className="font-bold text-slate-800 group-hover:text-purple-600 transition-colors duration-300 text-lg">
                Koçumla Mesajlaş
              </div>
              <div className="text-sm text-gray-600">2 yeni mesaj var</div>
              <div className="text-xs text-purple-600 font-medium mt-1">→ Hemen yanıtla</div>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Overview;