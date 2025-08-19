import React, { useState, useEffect } from 'react';
import { FaClock, FaFire, FaGift } from 'react-icons/fa';

const LimitedOffer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Set target date to August 20th
    const targetDate = new Date('2024-08-20T23:59:59');
    
    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;
      
      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-bounce"></div>
        <div className="absolute top-20 right-20 w-16 h-16 bg-yellow-400/20 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute bottom-10 left-1/3 w-12 h-12 bg-white/10 rounded-full animate-bounce delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center animate-in slide-in-from-top-10 duration-1000">
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <FaFire className="text-yellow-400 animate-pulse" size={20} />
            <span className="text-white font-bold">Sınırlı Süre Fırsatı!</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 animate-pulse">
            🔥 20 Ağustos'a kadar %10 indirim fırsatı! 🔥
          </h2>
          
          <p className="text-xl text-pink-100 mb-8 max-w-2xl mx-auto">
            Her iki paketimizde de geçerli olan bu özel indirimden yararlanmak için acele et!
          </p>

          {/* Countdown Timer */}
          <div className="flex justify-center space-x-4 mb-8 animate-in slide-in-from-bottom-10 duration-1000 delay-300">
            {[
              { label: 'Gün', value: timeLeft.days },
              { label: 'Saat', value: timeLeft.hours },
              { label: 'Dakika', value: timeLeft.minutes },
              { label: 'Saniye', value: timeLeft.seconds }
            ].map((item, index) => (
              <div key={index} className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 min-w-[80px] hover:bg-white/30 transition-all duration-300 transform hover:scale-110 hover:shadow-xl border border-white/30">
                <div className="text-3xl md:text-4xl font-bold text-white">{item.value.toString().padStart(2, '0')}</div>
                <div className="text-pink-200 text-sm font-medium">{item.label}</div>
              </div>
            ))}
          </div>

          {/* Savings Display */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8 animate-in slide-in-from-bottom-10 duration-1000 delay-500">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-center space-x-2 mb-3">
                <FaGift className="text-yellow-400" size={24} />
                <h3 className="text-xl font-bold text-white">SınavKoç Plus</h3>
              </div>
              <div className="text-2xl font-bold text-white mb-2">₺1.080/ay</div>
              <div className="text-pink-200 line-through text-lg">₺1.200/ay</div>
              <div className="text-yellow-400 font-bold">₺120 tasarruf!</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-center space-x-2 mb-3">
                <FaGift className="text-yellow-400" size={24} />
                <h3 className="text-xl font-bold text-white">SınavKoç Pro</h3>
              </div>
              <div className="text-2xl font-bold text-white mb-2">₺2.160/ay</div>
              <div className="text-pink-200 line-through text-lg">₺2.400/ay</div>
              <div className="text-yellow-400 font-bold">₺240 tasarruf!</div>
            </div>
          </div>

          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-white text-red-600 hover:bg-red-50 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-2xl hover:shadow-white/25 transform hover:-translate-y-2 hover:scale-105 animate-pulse hover:animate-bounce border-2 border-white/50"
          >
            <div className="flex items-center space-x-2">
              <FaClock size={20} />
              <span>Hemen İndirimden Yararlan!</span>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default LimitedOffer;