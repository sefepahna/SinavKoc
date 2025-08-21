import { useState, useEffect } from 'react';
import { FaPlay, FaPause, FaRedo, FaClock, FaFire, FaExpand, FaCompress, FaTimes, FaCog, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

const PomodoroTimer = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [cycle, setCycle] = useState(1);
  const [totalStudyTime, setTotalStudyTime] = useState(0);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [workDuration, setWorkDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && (minutes > 0 || seconds > 0)) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            // Pomodoro tamamlandı
            setIsActive(false);
            if (soundEnabled) {
              // Ses çalma simülasyonu
              console.log('🔔 Pomodoro tamamlandı!');
            }
            
            if (!isBreak) {
              // Çalışma süresi bitti, mola zamanı
              setIsBreak(true);
              setMinutes(breakDuration);
              setSeconds(0);
              setCycle(cycle + 1);
              setTotalStudyTime(prev => prev + workDuration);
            } else {
              // Mola bitti, yeni pomodoro
              setIsBreak(false);
              setMinutes(workDuration);
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
  }, [isActive, minutes, seconds, isBreak, cycle, soundEnabled, workDuration, breakDuration]);

  const toggle = () => {
    setIsActive(!isActive);
  };

  const reset = () => {
    setIsActive(false);
    setIsBreak(false);
    setMinutes(workDuration);
    setSeconds(0);
    setCycle(1);
  };

  const formatTime = (mins: number, secs: number) => {
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = isBreak 
    ? ((breakDuration * 60 - (minutes * 60 + seconds)) / (breakDuration * 60)) * 100
    : ((workDuration * 60 - (minutes * 60 + seconds)) / (workDuration * 60)) * 100;

  const toggleFocusMode = () => {
    setIsFocusMode(!isFocusMode);
  };

  const NormalTimer = () => (
    <div className="bg-gradient-to-br from-white via-red-50 to-orange-50 rounded-2xl shadow-xl p-6 border border-red-100 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] relative overflow-hidden h-full flex flex-col">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-2 right-2 w-12 h-12 bg-red-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-2 left-2 w-8 h-8 bg-orange-500 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-6 h-6 bg-yellow-400 rounded-full animate-pulse delay-2000"></div>
      </div>
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl hover:from-red-600 hover:to-orange-600 transition-all duration-300 hover:scale-110 hover:rotate-12 shadow-lg">
            <FaClock className="text-white" size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800">
              Pomodoro Sayacı
            </h3>
            <p className="text-sm text-gray-600">Odaklanmak için 25 dakika</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl transition-all duration-300 hover:scale-110 hover:rotate-90"
            title="Ayarlar"
          >
            <FaCog size={16} />
          </button>
          <button
            onClick={toggleFocusMode}
            className="p-2 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-xl transition-all duration-300 hover:scale-110 hover:rotate-12 shadow-lg"
            title="Odak Modu"
          >
            <FaExpand size={16} />
          </button>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="mb-6 p-4 bg-white rounded-xl border border-gray-200 shadow-inner animate-in slide-in-from-top-5 duration-300">
          <h4 className="font-semibold text-gray-800 mb-3">Ayarlar</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <label className="block text-gray-600 mb-1">Çalışma (dk)</label>
              <input
                type="number"
                min="1"
                max="60"
                value={workDuration}
                onChange={(e) => setWorkDuration(parseInt(e.target.value) || 25)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Mola (dk)</label>
              <input
                type="number"
                min="1"
                max="30"
                value={breakDuration}
                onChange={(e) => setBreakDuration(parseInt(e.target.value) || 5)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>
          <div className="flex items-center justify-between mt-3">
            <span className="text-gray-600">Ses bildirimleri</span>
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-2 rounded-lg transition-all duration-300 ${
                soundEnabled ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
              }`}
            >
              {soundEnabled ? <FaVolumeUp size={16} /> : <FaVolumeMute size={16} />}
            </button>
          </div>
        </div>
      )}
      
      {/* Status Badge */}
      <div className="text-center mb-6">
        <div className={`inline-flex items-center space-x-3 px-6 py-3 rounded-full text-lg font-bold mb-4 transition-all duration-500 hover:scale-105 shadow-lg ${
          isBreak 
            ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white animate-pulse border-2 border-green-300' 
            : 'bg-gradient-to-r from-red-500 to-orange-500 text-white animate-bounce border-2 border-red-300'
        }`}>
          <span className="text-2xl">{isBreak ? '☕' : '📚'}</span>
          <span>{isBreak ? 'Mola Zamanı!' : 'Çalışma Zamanı!'}</span>
        </div>
        
        <div className="flex items-center justify-center space-x-6 text-sm text-gray-600 mb-6">
          <div className="flex items-center space-x-2 bg-white rounded-full px-3 py-2 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
            <FaFire className="text-orange-500 animate-pulse" size={16} />
            <span className="font-semibold">Döngü: {cycle}/8</span>
          </div>
          <div className="flex items-center space-x-2 bg-white rounded-full px-3 py-2 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
            <FaClock className="text-blue-500 animate-bounce" size={16} />
            <span className="font-semibold">Bugün: {Math.floor(totalStudyTime / 60)}s {totalStudyTime % 60}dk</span>
          </div>
        </div>
      </div>

      {/* Enhanced Circular Progress */}
      <div className="flex-1 flex items-center justify-center mb-6">
        <div className="relative w-48 h-48 hover:scale-105 transition-all duration-500">
          <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 200 200">
            {/* Background circle */}
            <circle
              cx="100"
              cy="100"
              r="85"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-gray-200"
            />
            {/* Progress circle */}
            <circle
              cx="100"
              cy="100"
              r="85"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={`${2 * Math.PI * 85}`}
              strokeDashoffset={`${2 * Math.PI * 85 * (1 - progress / 100)}`}
              className={`${isBreak ? 'text-green-500' : 'text-red-500'} drop-shadow-lg transition-all duration-500`}
              style={{
                filter: 'drop-shadow(0 0 8px currentColor)',
              }}
            />
            {/* Pulse effect */}
            {isActive && (
              <circle
                cx="100"
                cy="100"
                r="85"
                stroke="currentColor"
                strokeWidth="2"
                fill="transparent"
                className={`${isBreak ? 'text-green-300' : 'text-red-300'} animate-ping opacity-75`}
              />
            )}
          </svg>
          
          {/* Timer Display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className={`text-5xl font-bold mb-2 transition-all duration-300 hover:scale-110 ${
              isBreak ? 'text-green-600' : 'text-red-600'
            } ${isActive ? 'animate-pulse' : ''}`}>
              {formatTime(minutes, seconds)}
            </div>
            <div className="text-lg text-gray-500 font-medium">
              {Math.round(progress)}% tamamlandı
            </div>
            <div className={`text-sm mt-2 px-3 py-1 rounded-full font-medium ${
              isBreak 
                ? 'bg-green-100 text-green-700' 
                : 'bg-red-100 text-red-700'
            }`}>
              {isBreak ? `${breakDuration} dk mola` : `${workDuration} dk çalışma`}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Control Buttons */}
      <div className="flex items-center justify-center space-x-4 mb-6">
        <button
          onClick={toggle}
          className={`p-4 rounded-2xl text-white font-bold transition-all duration-500 hover:scale-125 shadow-xl hover:shadow-2xl text-xl ${
            isActive
              ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 animate-pulse'
              : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 animate-bounce'
          }`}
        >
          {isActive ? <FaPause size={24} /> : <FaPlay size={24} />}
        </button>
        
        <button
          onClick={reset}
          className="p-4 rounded-2xl bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white font-bold transition-all duration-500 hover:scale-125 shadow-xl hover:shadow-2xl text-xl hover:rotate-180"
        >
          <FaRedo size={24} />
        </button>
      </div>

      {/* Enhanced Stats Grid */}
      <div className="grid grid-cols-3 gap-3">
        <div className="text-center bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-100">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-2 hover:from-blue-600 hover:to-blue-700 transition-all duration-300 hover:scale-110 animate-pulse">
            <span className="text-white font-bold">{cycle}</span>
          </div>
          <div className="text-xs text-gray-600 font-medium">Pomodoro</div>
        </div>
        
        <div className="text-center bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-100">
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-2 hover:from-green-600 hover:to-green-700 transition-all duration-300 hover:scale-110 animate-bounce">
            <span className="text-white font-bold">{Math.floor(cycle / 2)}</span>
          </div>
          <div className="text-xs text-gray-600 font-medium">Mola</div>
        </div>
        
        <div className="text-center bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-100">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-2 hover:from-purple-600 hover:to-purple-700 transition-all duration-300 hover:scale-110 animate-pulse">
            <span className="text-white font-bold text-xs">{totalStudyTime}</span>
          </div>
          <div className="text-xs text-gray-600 font-medium">Dakika</div>
        </div>
      </div>

      {/* Motivational Quote */}
      <div className="mt-4 text-center">
        <div className="text-sm text-gray-600 italic bg-white/50 rounded-lg p-3 border border-gray-200">
          {isActive ? (
            isBreak ? (
              "🌟 Harika! Şimdi biraz dinlen ve enerjini topla."
            ) : (
              "🎯 Mükemmel! Odaklan ve hedefine doğru ilerle."
            )
          ) : (
            "💪 Başlamaya hazır mısın? Her pomodoro bir adım daha!"
          )}
        </div>
      </div>
    </div>
  );

  const FocusModeTimer = () => (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-red-900 to-orange-900 z-50 flex items-center justify-center animate-in fade-in duration-1000">
      {/* Floating background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-red-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-orange-400 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-yellow-400 rounded-full animate-pulse delay-2000"></div>
      </div>
      
      <div className="text-center text-white relative z-10">
        {/* Close Button */}
        <button
          onClick={toggleFocusMode}
          className="absolute -top-20 right-0 p-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full transition-all duration-500 hover:scale-110 hover:rotate-180"
        >
          <FaTimes size={28} />
        </button>

        {/* Enhanced Mode Indicator */}
        <div className={`inline-flex items-center space-x-4 px-8 py-4 rounded-full text-2xl font-bold mb-12 transition-all duration-500 hover:scale-105 shadow-2xl ${
          isBreak 
            ? 'bg-green-500/20 text-green-300 border-2 border-green-400/30 animate-pulse' 
            : 'bg-red-500/20 text-red-300 border-2 border-red-400/30 animate-bounce'
        } backdrop-blur-sm`}>
          <span className="text-4xl">{isBreak ? '☕' : '📚'}</span>
          <span>{isBreak ? 'Mola Zamanı!' : 'Çalışma Zamanı!'}</span>
        </div>

        {/* Large Timer Display with Enhanced Animation */}
        <div className="relative mb-16 hover:scale-105 transition-all duration-500">
          <div className="relative w-96 h-96 mx-auto">
            <svg className="w-96 h-96 transform -rotate-90" viewBox="0 0 400 400">
              {/* Background circle */}
              <circle
                cx="200"
                cy="200"
                r="180"
                stroke="currentColor"
                strokeWidth="16"
                fill="transparent"
                className="text-white/20"
              />
              {/* Progress circle with glow effect */}
              <circle
                cx="200"
                cy="200"
                r="180"
                stroke="currentColor"
                strokeWidth="16"
                fill="transparent"
                strokeDasharray={`${2 * Math.PI * 180}`}
                strokeDashoffset={`${2 * Math.PI * 180 * (1 - progress / 100)}`}
                className={`${isBreak ? 'text-green-400' : 'text-red-400'} drop-shadow-2xl`}
                style={{
                  transition: 'stroke-dashoffset 0.5s ease-in-out',
                  filter: 'drop-shadow(0 0 20px currentColor)',
                }}
              />
              {/* Pulse effect for active state */}
              {isActive && (
                <circle
                  cx="200"
                  cy="200"
                  r="180"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="transparent"
                  className={`${isBreak ? 'text-green-300' : 'text-red-300'} animate-ping opacity-50`}
                />
              )}
            </svg>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className={`text-9xl font-bold mb-6 transition-all duration-300 hover:scale-110 ${
                isBreak ? 'text-green-400' : 'text-red-400'
              } ${isActive ? 'animate-pulse' : ''}`}>
                {formatTime(minutes, seconds)}
              </div>
              <div className="text-3xl text-white/70 mb-4">
                {Math.round(progress)}% tamamlandı
              </div>
              <div className={`text-xl px-6 py-2 rounded-full font-medium ${
                isBreak 
                  ? 'bg-green-500/20 text-green-300 border border-green-400/30' 
                  : 'bg-red-500/20 text-red-300 border border-red-400/30'
              } backdrop-blur-sm`}>
                {isBreak ? `${breakDuration} dakika mola` : `${workDuration} dakika çalışma`}
              </div>
            </div>
          </div>
        </div>

        {/* Large Control Buttons */}
        <div className="flex items-center justify-center space-x-12 mb-12">
          <button
            onClick={toggle}
            className={`p-8 rounded-full text-white font-bold transition-all duration-500 hover:scale-125 shadow-2xl text-3xl hover:shadow-3xl ${
              isActive
                ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 animate-pulse'
                : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 animate-bounce'
            }`}
          >
            {isActive ? <FaPause size={40} /> : <FaPlay size={40} />}
          </button>
          
          <button
            onClick={reset}
            className="p-8 rounded-full bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold transition-all duration-500 hover:scale-125 shadow-2xl text-3xl hover:shadow-3xl hover:rotate-180"
          >
            <FaRedo size={40} />
          </button>
        </div>

        {/* Enhanced Focus Mode Stats */}
        <div className="flex items-center justify-center space-x-16 text-xl">
          <div className="text-center hover:scale-110 transition-all duration-300">
            <div className="flex items-center space-x-3 mb-3">
              <FaFire className="text-orange-400 animate-pulse" size={28} />
              <span className="text-white/90 font-semibold">Döngü</span>
            </div>
            <div className="text-4xl font-bold text-white">{cycle}/8</div>
          </div>
          
          <div className="w-px h-16 bg-white/20"></div>
          
          <div className="text-center hover:scale-110 transition-all duration-300">
            <div className="flex items-center space-x-3 mb-3">
              <FaClock className="text-blue-400 animate-bounce" size={28} />
              <span className="text-white/90 font-semibold">Bugün</span>
            </div>
            <div className="text-4xl font-bold text-white">
              {Math.floor(totalStudyTime / 60)}s {totalStudyTime % 60}dk
            </div>
          </div>
        </div>

        {/* Enhanced Motivational Text */}
        <div className="mt-16 text-white/60 text-2xl max-w-2xl mx-auto animate-in slide-in-from-bottom-10 duration-1000 delay-500">
          {isActive ? (
            isBreak ? (
              <p className="text-green-300">🌟 Harika iş çıkardın! Şimdi dinlen ve enerjini topla.</p>
            ) : (
              <p className="text-red-300">🎯 Mükemmel! Odaklan, her saniye değerli.</p>
            )
          ) : (
            <p>🚀 Başlamaya hazır mısın? Hedefine bir adım daha yaklaş!</p>
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