import { useState, useEffect } from 'react';
import { FaPlay, FaPause, FaRedo, FaClock, FaFire, FaExpand, FaCompress, FaTimes } from 'react-icons/fa';

const PomodoroTimer = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [cycle, setCycle] = useState(1);
  const [totalStudyTime, setTotalStudyTime] = useState(0);
  const [isFocusMode, setIsFocusMode] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && (minutes > 0 || seconds > 0)) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            // Pomodoro tamamlandı
            setIsActive(false);
            if (!isBreak) {
              // Çalışma süresi bitti, mola zamanı
              setIsBreak(true);
              setMinutes(5);
              setSeconds(0);
              setCycle(cycle + 1);
              setTotalStudyTime(prev => prev + 25);
            } else {
              // Mola bitti, yeni pomodoro
              setIsBreak(false);
              setMinutes(25);
              setSeconds(0);
            }
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      if (interval) clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, minutes, seconds, isBreak, cycle]);

  const toggle = () => {
    setIsActive(!isActive);
  };

  const reset = () => {
    setIsActive(false);
    setIsBreak(false);
    setMinutes(25);
    setSeconds(0);
    setCycle(1);
  };

  const formatTime = (mins: number, secs: number) => {
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = isBreak 
    ? ((5 * 60 - (minutes * 60 + seconds)) / (5 * 60)) * 100
    : ((25 * 60 - (minutes * 60 + seconds)) / (25 * 60)) * 100;

  const toggleFocusMode = () => {
    setIsFocusMode(!isFocusMode);
  };

  const NormalTimer = () => (
    <div className="bg-gradient-to-br from-white via-blue-50 to-purple-50 rounded-2xl shadow-xl p-4 border border-blue-100 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-2 right-2 w-12 h-12 bg-red-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-2 left-2 w-8 h-8 bg-blue-500 rounded-full animate-bounce delay-1000"></div>
      </div>
      <div className="text-center">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl hover:from-red-600 hover:to-orange-600 transition-all duration-300 hover:scale-110 hover:rotate-12">
              <FaClock className="text-white" size={20} />
            </div>
            <h3 className="text-xl font-bold text-slate-800">
              Pomodoro Sayacı
            </h3>
          </div>
          <button
            onClick={toggleFocusMode}
            className="p-2 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-xl transition-all duration-500 hover:scale-110 hover:rotate-12"
            title="Odak Modu"
          >
            <FaExpand size={16} />
          </button>
        </div>
        
        <div className="mb-4">
          <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-bold mb-4 transition-all duration-300 hover:scale-105 ${
            isBreak 
              ? 'bg-green-100 text-green-800 border border-green-200 animate-pulse' 
              : 'bg-blue-100 text-blue-800 border border-blue-200 animate-bounce'
          }`}>
            <span>{isBreak ? '☕' : '📚'}</span>
            <span>{isBreak ? 'Mola Zamanı' : 'Çalışma Zamanı'}</span>
          </div>
          
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-600 mb-4">
            <div className="flex items-center space-x-1">
              <FaFire className="text-orange-500 animate-pulse" size={14} />
              <span>Döngü: {cycle}/8</span>
            </div>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <div>Bugün: {Math.floor(totalStudyTime / 60)}s {totalStudyTime % 60}dk</div>
          </div>
        </div>

        {/* Circular Progress */}
        <div className="relative w-28 h-28 mx-auto mb-4 hover:scale-110 transition-all duration-500">
          <svg className="w-28 h-28 transform -rotate-90" viewBox="0 0 144 144">
            <circle
              cx="72"
              cy="72"
              r="60"
              stroke="currentColor"
              strokeWidth="6"
              fill="transparent"
              className="text-gray-200"
            />
            <circle
              cx="72"
              cy="72"
              r="60"
              stroke="currentColor"
              strokeWidth="6"
              fill="transparent"
              strokeDasharray={`${2 * Math.PI * 60}`}
              strokeDashoffset={`${2 * Math.PI * 60 * (1 - progress / 100)}`}
              className={`${isBreak ? 'text-green-500' : 'text-blue-500'} drop-shadow-lg`}
              style={{
                transition: 'stroke-dashoffset 0.5s ease-in-out',
              }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className={`text-2xl font-bold transition-all duration-300 hover:scale-110 ${isBreak ? 'text-green-600' : 'text-blue-600'}`}>
              {formatTime(minutes, seconds)}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {Math.round(progress)}%
            </div>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-center space-x-3 mb-4">
          <button
            onClick={toggle}
            className={`p-3 rounded-full text-white font-bold transition-all duration-500 hover:scale-125 shadow-lg hover:shadow-xl ${
              isActive
                ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 animate-pulse'
                : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 animate-bounce'
            }`}
          >
            {isActive ? <FaPause size={16} /> : <FaPlay size={16} />}
          </button>
          
          <button
            onClick={reset}
            className="p-3 rounded-full bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white font-bold transition-all duration-500 hover:scale-125 shadow-lg hover:shadow-xl hover:rotate-180"
          >
            <FaRedo size={16} />
          </button>
        </div>

        {/* Compact Stats */}
        <div className="grid grid-cols-3 gap-2">
          <div className="text-center hover:scale-110 transition-all duration-300">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-1 hover:from-blue-600 hover:to-blue-700 transition-all duration-300 hover:scale-110 animate-pulse">
              <span className="text-white font-bold text-sm">3</span>
            </div>
            <div className="text-xs text-gray-600">Pomodoro</div>
          </div>
          <div className="text-center hover:scale-110 transition-all duration-300">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-1 hover:from-green-600 hover:to-green-700 transition-all duration-300 hover:scale-110 animate-bounce">
              <span className="text-white font-bold text-sm">2</span>
            </div>
            <div className="text-xs text-gray-600">Mola</div>
          </div>
          <div className="text-center hover:scale-110 transition-all duration-300">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-1 hover:from-purple-600 hover:to-purple-700 transition-all duration-300 hover:scale-110 animate-pulse">
              <span className="text-white font-bold text-sm">75</span>
            </div>
            <div className="text-xs text-gray-600">Dakika</div>
          </div>
        </div>
      </div>
    </div>
  );

  const FocusModeTimer = () => (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 z-50 flex items-center justify-center animate-in fade-in duration-1000">
      {/* Floating background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-purple-400 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-pink-400 rounded-full animate-pulse delay-2000"></div>
      </div>
      <div className="text-center text-white">
        {/* Close Button */}
        <button
          onClick={toggleFocusMode}
          className="absolute top-8 right-8 p-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full transition-all duration-500 hover:scale-110 hover:rotate-180"
        >
          <FaTimes size={24} />
        </button>

        {/* Mode Indicator */}
        <div className={`inline-flex items-center space-x-3 px-6 py-3 rounded-full text-lg font-bold mb-8 transition-all duration-300 hover:scale-105 ${
          isBreak 
            ? 'bg-green-500/20 text-green-300 border border-green-400/30 animate-pulse' 
            : 'bg-blue-500/20 text-blue-300 border border-blue-400/30 animate-bounce'
        } backdrop-blur-sm`}>
          <span className="text-2xl">{isBreak ? '☕' : '📚'}</span>
          <span>{isBreak ? 'Mola Zamanı' : 'Çalışma Zamanı'}</span>
        </div>

        {/* Large Timer Display */}
        <div className="relative mb-12 hover:scale-105 transition-all duration-500">
          <div className="relative w-80 h-80 mx-auto">
            <svg className="w-80 h-80 transform -rotate-90" viewBox="0 0 320 320">
              <circle
                cx="160"
                cy="160"
                r="140"
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
                className="text-white/20"
              />
              <circle
                cx="160"
                cy="160"
                r="140"
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
                strokeDasharray={`${2 * Math.PI * 140}`}
                strokeDashoffset={`${2 * Math.PI * 140 * (1 - progress / 100)}`}
                className={`${isBreak ? 'text-green-400' : 'text-blue-400'} drop-shadow-2xl`}
                style={{
                  transition: 'stroke-dashoffset 0.5s ease-in-out',
                }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className={`text-8xl font-bold mb-4 transition-all duration-300 hover:scale-110 ${isBreak ? 'text-green-400' : 'text-blue-400'}`}>
                {formatTime(minutes, seconds)}
              </div>
              <div className="text-2xl text-white/70">
                {Math.round(progress)}% tamamlandı
              </div>
            </div>
          </div>
        </div>

        {/* Large Control Buttons */}
        <div className="flex items-center justify-center space-x-8 mb-8">
          <button
            onClick={toggle}
            className={`p-6 rounded-full text-white font-bold transition-all duration-500 hover:scale-125 shadow-2xl text-2xl hover:shadow-3xl ${
              isActive
                ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 animate-pulse'
                : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 animate-bounce'
            }`}
          >
            {isActive ? <FaPause size={32} /> : <FaPlay size={32} />}
          </button>
          
          <button
            onClick={reset}
            className="p-6 rounded-full bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold transition-all duration-500 hover:scale-125 shadow-2xl text-2xl hover:shadow-3xl hover:rotate-180"
          >
            <FaRedo size={32} />
          </button>
        </div>

        {/* Focus Mode Stats */}
        <div className="flex items-center justify-center space-x-12 text-lg">
          <div className="text-center hover:scale-110 transition-all duration-300">
            <div className="flex items-center space-x-2 mb-2">
              <FaFire className="text-orange-400 animate-pulse" size={20} />
              <span className="text-white/90">Döngü</span>
            </div>
            <div className="text-2xl font-bold text-white">{cycle}/8</div>
          </div>
          
          <div className="w-px h-12 bg-white/20"></div>
          
          <div className="text-center hover:scale-110 transition-all duration-300">
            <div className="flex items-center space-x-2 mb-2">
              <FaClock className="text-blue-400 animate-bounce" size={20} />
              <span className="text-white/90">Bugün</span>
            </div>
            <div className="text-2xl font-bold text-white">
              {Math.floor(totalStudyTime / 60)}s {totalStudyTime % 60}dk
            </div>
          </div>
        </div>

        {/* Motivational Text */}
        <div className="mt-12 text-white/60 text-lg max-w-md mx-auto animate-in slide-in-from-bottom-10 duration-1000 delay-500">
          {isActive ? (
            <p>🎯 Odaklan! Her dakika değerli.</p>
          ) : (
            <p>▶️ Başlamaya hazır mısın?</p>
          )}
        </div>
      </div>
    </div>
  );

  if (isFocusMode) {
    return <FocusModeTimer />;
  }

  return <NormalTimer />;
};

export default PomodoroTimer;