import React, { useState } from 'react';
import { FaTrophy, FaMedal, FaAward, FaClock, FaFire, FaChartLine } from 'react-icons/fa';

interface Student {
  id: number;
  name: string;
  studyTime: number;
  avatar: string;
  rank: number;
  streak: number;
  improvement: number;
}

const Leaderboard = () => {
  const [timeFilter, setTimeFilter] = useState<'weekly' | 'monthly'>('weekly');

  const weeklyData: Student[] = [
    { id: 1, name: 'Ahmet Yılmaz', studyTime: 42, avatar: 'AY', rank: 1, streak: 7, improvement: 15 },
    { id: 2, name: 'Elif Kaya', studyTime: 38, avatar: 'EK', rank: 2, streak: 5, improvement: 12 },
    { id: 3, name: 'Mehmet Özkan', studyTime: 35, avatar: 'MÖ', rank: 3, streak: 3, improvement: 8 },
    { id: 4, name: 'Sen', studyTime: 32, avatar: 'SEN', rank: 4, streak: 7, improvement: 20 },
    { id: 5, name: 'Can Arslan', studyTime: 28, avatar: 'CA', rank: 5, streak: 2, improvement: 5 },
  ];

  const monthlyData: Student[] = [
    { id: 1, name: 'Elif Kaya', studyTime: 156, avatar: 'EK', rank: 1, streak: 15, improvement: 25 },
    { id: 2, name: 'Ahmet Yılmaz', studyTime: 148, avatar: 'AY', rank: 2, streak: 12, improvement: 18 },
    { id: 3, name: 'Sen', studyTime: 142, avatar: 'SEN', rank: 3, streak: 20, improvement: 35 },
    { id: 4, name: 'Mehmet Özkan', studyTime: 135, avatar: 'MÖ', rank: 4, streak: 8, improvement: 10 },
    { id: 5, name: 'Can Arslan', studyTime: 128, avatar: 'CA', rank: 5, streak: 6, improvement: 8 },
  ];

  const currentData = timeFilter === 'weekly' ? weeklyData : monthlyData;
  const userRank = currentData.find(student => student.name === 'Sen');

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <FaTrophy className="text-yellow-500" size={24} />;
      case 2:
        return <FaMedal className="text-gray-400" size={24} />;
      case 3:
        return <FaAward className="text-orange-500" size={24} />;
      default:
        return (
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
            <span className="text-white font-bold text-sm">#{rank}</span>
          </div>
        );
    }
  };

  const getRankColor = (rank: number, isUser: boolean = false) => {
    if (isUser) {
      return 'bg-gradient-to-r from-blue-500 to-purple-600 text-white border-blue-300 ring-2 ring-blue-200';
    }
    
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white border-yellow-300';
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-500 text-white border-gray-300';
      case 3:
        return 'bg-gradient-to-r from-orange-400 to-orange-600 text-white border-orange-300';
      default:
        return 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50';
    }
  };

  const getAvatarColor = (rank: number, isUser: boolean = false) => {
    if (isUser) {
      return 'bg-gradient-to-r from-blue-600 to-purple-600 text-white ring-4 ring-blue-200';
    }
    
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

  return (
    <div className="bg-gradient-to-br from-white via-blue-50 to-purple-50 rounded-2xl shadow-xl p-6 border border-purple-100 hover:shadow-2xl transition-all duration-500 hover:scale-[1.01] relative overflow-hidden h-full flex flex-col">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-4 right-4 w-16 h-16 bg-yellow-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-4 left-4 w-12 h-12 bg-blue-500 rounded-full animate-bounce delay-1000"></div>
      </div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 hover:scale-110 hover:rotate-12">
            <FaTrophy className="text-white" size={20} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800">
              Liderlik Tablosu
            </h3>
            <p className="text-sm text-gray-600">Arkadaşlarınla yarış!</p>
          </div>
        </div>
        
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
      </div>

      <div className="space-y-3 flex-1">
        {currentData.map((student, index) => {
          const isUser = student.name === 'Sen';
          return (
            <div
              key={student.id}
              className={`p-4 rounded-xl border-2 transition-all duration-500 hover:shadow-xl transform hover:scale-[1.03] animate-in slide-in-from-left-10 duration-1000 ${getRankColor(student.rank, isUser)} ${isUser ? 'animate-pulse hover:animate-bounce' : ''}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      {getRankIcon(student.rank)}
                    </div>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 hover:scale-110 ${getAvatarColor(student.rank, isUser)} ${isUser ? 'animate-pulse' : ''}`}>
                      {student.avatar}
                    </div>
                  </div>
                  <div>
                    <h4 className={`font-bold text-lg ${
                      student.rank <= 3 || isUser ? 'text-white' : 'text-gray-900'
                    }`}>
                      {student.name} {isUser && '(Sen)'}
                    </h4>
                    <div className={`flex items-center space-x-3 text-sm ${
                      student.rank <= 3 || isUser ? 'text-white opacity-90' : 'text-gray-600'
                    }`}>
                      <div className="flex items-center space-x-1 hover:scale-110 transition-all duration-300">
                        <FaClock size={12} className="animate-pulse" />
                        <span>{student.studyTime}h</span>
                      </div>
                      <div className="flex items-center space-x-1 hover:scale-110 transition-all duration-300">
                        <FaFire size={12} className="animate-bounce" />
                        <span>{student.streak} gün</span>
                      </div>
                      <div className="flex items-center space-x-1 hover:scale-110 transition-all duration-300">
                        <FaChartLine size={12} className="animate-pulse" />
                        <span>+{student.improvement}%</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className={`text-3xl font-bold ${
                    student.rank <= 3 || isUser ? 'text-white' : 'text-gray-900'
                  }`}>
                    {student.studyTime}h
                  </div>
                  <div className={`text-sm ${
                    student.rank <= 3 || isUser ? 'text-white opacity-75' : 'text-gray-500'
                  }`}>
                    çalışma
                  </div>
                </div>
              </div>
              
              {/* Enhanced Progress bar */}
              <div className="mt-4">
                <div className={`w-full rounded-full h-3 overflow-hidden hover:h-4 transition-all duration-300 ${
                  student.rank <= 3 || isUser ? 'bg-white bg-opacity-30' : 'bg-gray-200'
                }`}>
                  <div
                    className={`rounded-full h-3 transition-all duration-1000 ease-out hover:shadow-lg ${
                      student.rank <= 3 || isUser ? 'bg-white' : 'bg-gradient-to-r from-blue-500 to-purple-500'
                    } ${isUser ? 'animate-pulse' : ''}`}
                    style={{
                      width: `${(student.studyTime / currentData[0].studyTime) * 100}%`
                    }}
                  >
                    <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
                  </div>
                </div>
                <div className={`text-right text-xs mt-1 ${
                  student.rank <= 3 || isUser ? 'text-white opacity-75' : 'text-gray-500'
                }`}>
                  Liderin %{Math.round((student.studyTime / currentData[0].studyTime) * 100)}'i
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* User Position Highlight */}
      {userRank && (
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200 hover:from-blue-100 hover:to-purple-100 transition-all duration-500 hover:scale-105 hover:shadow-lg animate-in slide-in-from-bottom-10 duration-1000 delay-500">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <FaTrophy className="text-blue-600 animate-bounce" size={20} />
              <span className="font-bold text-slate-800">Senin Durumun</span>
            </div>
            <p className="text-sm text-gray-700">
              {userRank.rank}. sıradasın! Bir üst sıraya çıkmak için 
              <span className="font-bold text-blue-600"> {currentData[userRank.rank - 2]?.studyTime - userRank.studyTime} saat</span> daha çalışman gerekiyor.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;