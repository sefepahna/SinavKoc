import React, { useState } from 'react';
import { FaTrophy, FaMedal, FaAward, FaClock, FaUsers, FaChartLine, FaFire, FaGraduationCap, FaArrowUp } from 'react-icons/fa';

interface Student {
  id: number;
  name: string;
  studyTime: number;
  avatar: string;
  rank: number;
  grade: string;
  improvement: number;
  streak: number;
  lastExamScore: number;
}

const CoachLeaderboard = () => {
  const [timeFilter, setTimeFilter] = useState<'weekly' | 'monthly'>('weekly');
  const [sortBy, setSortBy] = useState<'studyTime' | 'improvement' | 'examScore'>('studyTime');

  const weeklyData: Student[] = [
    { id: 1, name: 'Ahmet Yılmaz', studyTime: 42, avatar: 'AY', rank: 1, grade: '12. Sınıf', improvement: 15, streak: 7, lastExamScore: 385 },
    { id: 2, name: 'Elif Kaya', studyTime: 38, avatar: 'EK', rank: 2, grade: '11. Sınıf', improvement: 22, streak: 5, lastExamScore: 372 },
    { id: 3, name: 'Mehmet Özkan', studyTime: 35, avatar: 'MÖ', rank: 3, grade: '12. Sınıf', improvement: 8, streak: 3, lastExamScore: 358 },
    { id: 4, name: 'Zeynep Demir', studyTime: 32, avatar: 'ZD', rank: 4, grade: '11. Sınıf', improvement: 18, streak: 4, lastExamScore: 345 },
    { id: 5, name: 'Can Arslan', studyTime: 28, avatar: 'CA', rank: 5, grade: '10. Sınıf', improvement: 12, streak: 2, lastExamScore: 298 },
    { id: 6, name: 'Ayşe Öztürk', studyTime: 25, avatar: 'AÖ', rank: 6, grade: '12. Sınıf', improvement: 5, streak: 6, lastExamScore: 312 },
    { id: 7, name: 'Burak Çelik', studyTime: 22, avatar: 'BÇ', rank: 7, grade: '11. Sınıf', improvement: 10, streak: 1, lastExamScore: 289 },
  ];

  const monthlyData: Student[] = [
    { id: 1, name: 'Elif Kaya', studyTime: 156, avatar: 'EK', rank: 1, grade: '11. Sınıf', improvement: 35, streak: 15, lastExamScore: 372 },
    { id: 2, name: 'Ahmet Yılmaz', studyTime: 148, avatar: 'AY', rank: 2, grade: '12. Sınıf', improvement: 28, streak: 12, lastExamScore: 385 },
    { id: 3, name: 'Mehmet Özkan', studyTime: 142, avatar: 'MÖ', rank: 3, grade: '12. Sınıf', improvement: 20, streak: 8, lastExamScore: 358 },
    { id: 4, name: 'Can Arslan', studyTime: 135, avatar: 'CA', rank: 4, grade: '10. Sınıf', improvement: 25, streak: 6, lastExamScore: 298 },
    { id: 5, name: 'Zeynep Demir', studyTime: 128, avatar: 'ZD', rank: 5, grade: '11. Sınıf', improvement: 30, streak: 10, lastExamScore: 345 },
    { id: 6, name: 'Ayşe Öztürk', studyTime: 118, avatar: 'AÖ', rank: 6, grade: '12. Sınıf', improvement: 15, streak: 8, lastExamScore: 312 },
    { id: 7, name: 'Burak Çelik', studyTime: 105, avatar: 'BÇ', rank: 7, grade: '11. Sınıf', improvement: 18, streak: 4, lastExamScore: 289 },
  ];

  const currentData = timeFilter === 'weekly' ? weeklyData : monthlyData;

  const sortedData = [...currentData].sort((a, b) => {
    switch (sortBy) {
      case 'improvement':
        return b.improvement - a.improvement;
      case 'examScore':
        return b.lastExamScore - a.lastExamScore;
      default:
        return b.studyTime - a.studyTime;
    }
  });

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <FaTrophy className="text-yellow-500" size={28} />;
      case 2:
        return <FaMedal className="text-gray-400" size={28} />;
      case 3:
        return <FaAward className="text-orange-500" size={28} />;
      default:
        return (
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
            <span className="text-white font-bold">#{rank}</span>
          </div>
        );
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white border-yellow-300 shadow-yellow-200';
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-500 text-white border-gray-300 shadow-gray-200';
      case 3:
        return 'bg-gradient-to-r from-orange-400 to-orange-600 text-white border-orange-300 shadow-orange-200';
      default:
        return 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50';
    }
  };

  const getAvatarColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white ring-4 ring-yellow-200';
      case 2:
        return 'bg-gradient-to-r from-gray-400 to-gray-500 text-white ring-4 ring-gray-200';
      case 3:
        return 'bg-gradient-to-r from-orange-500 to-orange-600 text-white ring-4 ring-orange-200';
      default:
        return 'bg-gradient-to-r from-blue-500 to-blue-600 text-white';
    }
  };

  const getGradeColor = (grade: string) => {
    const colors = {
      '12. Sınıf': 'bg-red-100 text-red-800',
      '11. Sınıf': 'bg-blue-100 text-blue-800',
      '10. Sınıf': 'bg-green-100 text-green-800',
      '9. Sınıf': 'bg-purple-100 text-purple-800'
    };
    return colors[grade as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const totalStudents = currentData.length;
  const totalStudyTime = currentData.reduce((sum, student) => sum + student.studyTime, 0);
  const averageStudyTime = Math.round(totalStudyTime / totalStudents);
  const averageImprovement = Math.round(currentData.reduce((sum, student) => sum + student.improvement, 0) / totalStudents);

  return (
    <div className="bg-gradient-to-br from-white via-blue-50 to-purple-50 rounded-2xl shadow-xl p-8 border border-blue-100 hover:shadow-2xl transition-all duration-500 hover:scale-[1.01] relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-8 right-8 w-20 h-20 bg-yellow-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-8 left-8 w-16 h-16 bg-blue-500 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-12 h-12 bg-purple-500 rounded-full animate-pulse delay-2000"></div>
      </div>
      {/* Enhanced Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 space-y-4 lg:space-y-0">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 hover:scale-110 hover:rotate-12">
            <FaTrophy className="text-white" size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">
              Öğrenci Performans Tablosu
            </h3>
            <p className="text-gray-600">
              En başarılı öğrencilerinizi takip edin ve motive edin
            </p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
          <div className="flex bg-gray-100 rounded-xl p-1 shadow-inner hover:shadow-lg transition-all duration-300">
            <button
              onClick={() => setTimeFilter('weekly')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-500 ${
                timeFilter === 'weekly'
                  ? 'bg-white text-blue-600 shadow-md transform scale-105 animate-pulse'
                  : 'text-gray-600 hover:text-gray-900 hover:scale-105'
              }`}
            >
              Haftalık
            </button>
            <button
              onClick={() => setTimeFilter('monthly')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-500 ${
                timeFilter === 'monthly'
                  ? 'bg-white text-blue-600 shadow-md transform scale-105 animate-pulse'
                  : 'text-gray-600 hover:text-gray-900 hover:scale-105'
              }`}
            >
              Aylık
            </button>
          </div>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <option value="studyTime">Çalışma Saatine Göre</option>
            <option value="improvement">Gelişime Göre</option>
            <option value="examScore">Sınav Puanına Göre</option>
          </select>
        </div>
      </div>

      {/* Enhanced Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white text-center shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-110 animate-in slide-in-from-left-10 duration-1000">
          <FaUsers className="mx-auto mb-2 animate-bounce" size={24} />
          <div className="text-2xl font-bold">{totalStudents}</div>
          <div className="text-xs text-blue-100">Toplam Öğrenci</div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 text-white text-center shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-110 animate-in slide-in-from-bottom-10 duration-1000 delay-200">
          <FaClock className="mx-auto mb-2 animate-pulse" size={24} />
          <div className="text-2xl font-bold">{totalStudyTime}h</div>
          <div className="text-xs text-green-100">Toplam Çalışma</div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-4 text-white text-center shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-110 animate-in slide-in-from-right-10 duration-1000 delay-400">
          <FaChartLine className="mx-auto mb-2 animate-bounce" size={24} />
          <div className="text-2xl font-bold">{averageStudyTime}h</div>
          <div className="text-xs text-purple-100">Ortalama Çalışma</div>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-4 text-white text-center shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-110 animate-in slide-in-from-top-10 duration-1000 delay-600">
          <FaArrowUp className="mx-auto mb-2 animate-pulse" size={24} />
          <div className="text-2xl font-bold">+{averageImprovement}%</div>
          <div className="text-xs text-orange-100">Ortalama Gelişim</div>
        </div>
      </div>

      {/* Enhanced Leaderboard */}
      <div className="space-y-4">
        {sortedData.map((student, index) => (
          <div
            key={student.id}
            className={`p-6 rounded-2xl border-2 transition-all duration-500 hover:shadow-2xl transform hover:scale-[1.03] ${getRankColor(student.rank)} shadow-lg animate-in slide-in-from-bottom-10 duration-1000`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    {getRankIcon(student.rank)}
                  </div>
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-300 hover:scale-110 ${getAvatarColor(student.rank)}`}>
                    {student.avatar}
                  </div>
                </div>
                <div>
                  <h4 className={`font-bold text-xl mb-1 ${
                    student.rank <= 3 ? 'text-white' : 'text-gray-900'
                  }`}>
                    {student.name}
                  </h4>
                  <div className="flex items-center space-x-3 mb-2">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getGradeColor(student.grade)}`}>
                      {student.grade}
                    </span>
                    <div className={`flex items-center space-x-1 text-sm ${
                      student.rank <= 3 ? 'text-white opacity-90' : 'text-gray-600'
                    }`}>
                      <FaGraduationCap size={12} />
                      <span>Son puan: {student.lastExamScore}</span>
                    </div>
                  </div>
                  <div className={`flex items-center space-x-4 text-sm ${
                    student.rank <= 3 ? 'text-white opacity-90' : 'text-gray-600'
                  }`}>
                    <div className="flex items-center space-x-1 hover:scale-110 transition-all duration-300">
                      <FaClock size={12} className="animate-pulse" />
                      <span>{student.studyTime}h çalışma</span>
                    </div>
                    <div className="flex items-center space-x-1 hover:scale-110 transition-all duration-300">
                      <FaFire size={12} className="animate-bounce" />
                      <span>{student.streak} gün streak</span>
                    </div>
                    <div className="flex items-center space-x-1 hover:scale-110 transition-all duration-300">
                      <FaChartLine size={12} className="animate-pulse" />
                      <span>+{student.improvement}% gelişim</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className={`text-4xl font-bold mb-1 ${
                  student.rank <= 3 ? 'text-white' : 'text-gray-900'
                }`}>
                  {sortBy === 'studyTime' ? `${student.studyTime}h` :
                   sortBy === 'improvement' ? `+${student.improvement}%` :
                   student.lastExamScore}
                </div>
                <div className={`text-sm ${
                  student.rank <= 3 ? 'text-white opacity-75' : 'text-gray-500'
                }`}>
                  {sortBy === 'studyTime' ? 'çalışma süresi' :
                   sortBy === 'improvement' ? 'gelişim oranı' :
                   'sınav puanı'}
                </div>
              </div>
            </div>
            
            {/* Enhanced Progress bar */}
            <div className="mt-6">
              <div className={`w-full rounded-full h-4 overflow-hidden hover:h-5 transition-all duration-300 ${
                student.rank <= 3 ? 'bg-white bg-opacity-30' : 'bg-gray-200'
              }`}>
                <div
                  className={`rounded-full h-4 transition-all duration-1000 ease-out relative hover:shadow-lg ${
                    student.rank <= 3 ? 'bg-white' : 'bg-gradient-to-r from-blue-500 to-purple-500'
                  }`}
                  style={{
                    width: `${(student.studyTime / sortedData[0].studyTime) * 100}%`
                  }}
                >
                  <div className="absolute inset-0 bg-white/30 rounded-full animate-pulse"></div>
                </div>
              </div>
              <div className={`flex justify-between text-xs mt-2 ${
                student.rank <= 3 ? 'text-white opacity-75' : 'text-gray-500'
              }`}>
                <span>Liderin %{Math.round((student.studyTime / sortedData[0].studyTime) * 100)}'i</span>
                <span>Hedef: 50h</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced Motivation Section */}
      <div className="mt-8 p-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl text-white shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] relative overflow-hidden animate-in slide-in-from-bottom-10 duration-1000 delay-800">
        {/* Floating animation elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-4 w-16 h-16 bg-white rounded-full animate-pulse"></div>
          <div className="absolute bottom-4 left-4 w-12 h-12 bg-yellow-400 rounded-full animate-bounce delay-1000"></div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <FaTrophy className="text-yellow-400 animate-bounce" size={32} />
            <h4 className="text-2xl font-bold">
              Muhteşem Performans! 🎉
            </h4>
          </div>
          <p className="text-blue-100 text-lg mb-4">
            Öğrencileriniz bu {timeFilter === 'weekly' ? 'hafta' : 'ay'} toplam <strong>{totalStudyTime} saat</strong> çalıştı.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 hover:bg-white/30 transition-all duration-300 hover:scale-105">
              <div className="font-bold">Ortalama Çalışma</div>
              <div className="text-2xl font-bold">{averageStudyTime}h</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 hover:bg-white/30 transition-all duration-300 hover:scale-105">
              <div className="font-bold">Ortalama Gelişim</div>
              <div className="text-2xl font-bold">+{averageImprovement}%</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 hover:bg-white/30 transition-all duration-300 hover:scale-105">
              <div className="font-bold">En Yüksek Streak</div>
              <div className="text-2xl font-bold">{Math.max(...currentData.map(s => s.streak))} gün</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachLeaderboard;