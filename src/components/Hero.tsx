import React, { useEffect, useState } from 'react';
import { FaArrowRight, FaCheckCircle, FaTrophy, FaUsers, FaBullseye, FaBookOpen } from 'react-icons/fa';

const Hero = () => {
  const [currentStat, setCurrentStat] = useState(0);
  const [animatedNumbers, setAnimatedNumbers] = useState({ students: 0, success: 0, experience: 0 });

  const stats = [
    { icon: FaUsers, number: 2500, label: 'Başarılı Öğrenci', suffix: '+' },
    { icon: FaTrophy, number: 95, label: 'Başarı Oranı', suffix: '%' },
    { icon: FaBookOpen, number: 8, label: 'Yıllık Deneyim', suffix: '+' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev: number) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const animateNumbers = () => {
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;
      
      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;
        const easeOut = 1 - Math.pow(1 - progress, 3);
        
        setAnimatedNumbers({
          students: Math.floor(2500 * easeOut),
          success: Math.floor(95 * easeOut),
          experience: Math.floor(8 * easeOut)
        });
        
        if (step >= steps) clearInterval(timer);
      }, stepDuration);
    };

    const timer = setTimeout(animateNumbers, 1000);
    return () => clearTimeout(timer);
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToServices = () => {
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900"></div>
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280')] bg-cover bg-center opacity-20"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/20 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-purple-500/20 rounded-full animate-bounce delay-2000"></div>
        <div className="absolute bottom-40 left-20 w-12 h-12 bg-indigo-500/20 rounded-full animate-bounce delay-3000"></div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-purple-900/80 to-indigo-900/90"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-in slide-in-from-left-10 duration-1000">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 animate-pulse">
              <FaBullseye className="text-yellow-400" size={20} />
              <span className="text-white text-sm font-medium">2 Güçlü Paket: SınavKoç Plus & SınavKoç Pro</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 animate-pulse">SınavKoç Plus</span> ile Başla
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 animate-pulse">SınavKoç Pro</span> ile Zirveye Çık!
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed animate-in slide-in-from-left-10 duration-1000 delay-300">
              Seviyene uygun paketi seç, uzman kadromuzla üniversite hayallerini gerçeğe dönüştür.
            </p>

            {/* Key Benefits */}
            <div className="space-y-4 mb-10 animate-in slide-in-from-left-10 duration-1000 delay-500">
              {[
                'SınavKoç Plus: Sağlam Temel + Sistematik İlerleme',
                'SınavKoç Pro: Premium Destek + Garantili Başarı',
                'Kişiselleştirilmiş Çalışma Programları'
              ].map((benefit, index) => (
                <div key={benefit} className="flex items-center space-x-3 group">
                  <div className="p-1 bg-green-500/20 rounded-full group-hover:bg-green-500/30 transition-colors duration-300">
                    <FaCheckCircle className="text-green-400" size={20} />
                  </div>
                  <span className="text-white font-medium group-hover:text-green-200 transition-colors duration-300">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 animate-in slide-in-from-left-10 duration-1000 delay-700">
              <button
                onClick={scrollToContact}
                className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-all duration-500 shadow-2xl hover:shadow-blue-500/25 transform hover:-translate-y-2 hover:scale-105 animate-pulse hover:animate-none"
              >
                <span>Ücretsiz Danışmanlık Al</span>
                <FaArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              
              <button
                onClick={scrollToServices}
                className="group border-2 border-white/50 text-white hover:bg-white hover:text-slate-800 px-8 py-4 rounded-xl font-semibold transition-all duration-500 hover:scale-105 backdrop-blur-sm hover:shadow-xl"
              >
                <span className="group-hover:scale-110 inline-block transition-transform duration-300">Programlarımız</span>
              </button>
            </div>
          </div>

          {/* Stats Card */}
          <div className="animate-in slide-in-from-right-10 duration-1000 delay-500">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20 hover:bg-white/15 transition-all duration-500">
              <h3 className="text-2xl font-bold text-white mb-8 text-center">Başarı Rakamlarımız</h3>
              
              <div className="grid grid-cols-1 gap-6">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  const animatedValue = index === 0 ? animatedNumbers.students : 
                                     index === 1 ? animatedNumbers.success : 
                                     animatedNumbers.experience;
                  
                  return (
                    <div 
                      key={index} 
                      className={`text-center p-6 rounded-2xl transition-all duration-500 transform hover:scale-105 ${
                        currentStat === index 
                          ? 'bg-gradient-to-r from-blue-500/30 to-purple-500/30 scale-105 shadow-xl' 
                          : 'bg-white/5 hover:bg-white/10 hover:shadow-lg'
                      }`}
                    >
                      <Icon className={`mx-auto mb-3 transition-colors duration-500 ${
                        currentStat === index ? 'text-yellow-400' : 'text-blue-400'
                      }`} size={32} />
                      <div className={`text-4xl font-bold mb-2 transition-colors duration-500 ${
                        currentStat === index ? 'text-yellow-400' : 'text-white'
                      }`}>
                        {animatedValue}{stat.suffix}
                      </div>
                      <div className="text-gray-300 text-sm font-medium">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;