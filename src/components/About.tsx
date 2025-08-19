import React, { useEffect, useState } from 'react';
import { FaAward, FaUsers, FaBookOpen, FaCheckCircle, FaHeart, FaBolt, FaShieldAlt, FaTrophy } from 'react-icons/fa';

const About = () => {
  const [counters, setCounters] = useState({ students: 0, success: 0, experience: 0, teachers: 0 });
  const [isVisible, setIsVisible] = useState(false);

  const stats = [
    { icon: FaUsers, number: 2500, label: 'Başarılı Öğrenci', key: 'students' },
    { icon: FaTrophy, number: 95, label: 'Başarı Oranı (%)', key: 'success' },
    { icon: FaBookOpen, number: 8, label: 'Yıllık Deneyim', key: 'experience' },
    { icon: FaAward, number: 25, label: 'Uzman Öğretmen', key: 'teachers' }
  ];

  const values = [
    {
      icon: FaHeart,
      title: 'Öğrenci Odaklılık',
      description: 'Her öğrencimizin benzersiz olduğunu biliyor, kişiselleştirilmiş yaklaşımlar geliştiriyoruz.'
    },
    {
      icon: FaBolt,
      title: 'Yenilikçilik',
      description: 'En güncel eğitim teknolojilerini ve metodlarını kullanarak etkili öğrenme deneyimi sunuyoruz.'
    },
    {
      icon: FaShieldAlt,
      title: 'Güvenilirlik',
      description: 'Şeffaf süreçler ve ölçülebilir sonuçlarla aileler ve öğrencilerimizin güvenini kazanıyoruz.'
    },
    {
      icon: FaTrophy,
      title: 'Başarı Odaklılık',
      description: 'Sadece ders vermekle kalmıyor, öğrencilerimizin hedeflerine ulaşmasını sağlıyoruz.'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('about');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;
      
      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;
        const easeOut = 1 - Math.pow(1 - progress, 3);
        
        setCounters({
          students: Math.floor(2500 * easeOut),
          success: Math.floor(95 * easeOut),
          experience: Math.floor(8 * easeOut),
          teachers: Math.floor(25 * easeOut)
        });
        
        if (step >= steps) clearInterval(timer);
      }, stepDuration);

      return () => clearInterval(timer);
    }
  }, [isVisible]);

  return (
    <section id="about" className="py-20 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600 to-purple-600"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-in slide-in-from-top-10 duration-1000">
          <div className="inline-flex items-center space-x-2 bg-blue-100 rounded-full px-4 py-2 mb-4">
            <FaHeart className="text-blue-600" size={20} />
            <span className="text-blue-800 font-medium">Hakkımızda</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Sınav Koç</span> Ailesi
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            8 yıldır binlerce öğrencinin üniversite hayallerini gerçeğe dönüştürüyoruz. 
            Uzman kadromuz ve kanıtlanmış metodlarımızla yanınızdayız.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="animate-in slide-in-from-left-10 duration-1000 delay-300">
            <h3 className="text-3xl font-bold text-slate-800 mb-6">
              Güvenilir Eğitim Partneriniz
            </h3>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              Sınav Koç olarak, her öğrencinin potansiyelini keşfetmesi ve hedeflerine 
              ulaşması için 2 güçlü paket sistemi geliştirdik: SınavKoç Plus ve SınavKoç Pro. 
              Deneyimli öğretmen kadromuz ve modern eğitim teknolojilerimizle fark yaratıyoruz.
            </p>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              SınavKoç Plus ile sağlam temel at, SınavKoç Pro ile zirveye çık! Her iki paketimiz de 
              kişiselleştirilmiş yaklaşımlar sunarak öğrencilerimizi başarıya götürüyor.
            </p>
            
            <div className="space-y-4">
              {[
                'SınavKoç Plus: Kapsamlı temel eğitim paketi',
                'SınavKoç Pro: Premium başarı garantili paket',
                'Sürekli performans takibi ve analizi',
                'Motivasyon ve rehberlik desteği'
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-3 group">
                  <div className="p-1 bg-green-100 rounded-full group-hover:bg-green-200 transition-colors duration-300">
                    <FaCheckCircle className="text-green-600" size={20} />
                  </div>
                  <span className="text-gray-700 group-hover:text-green-700 transition-colors duration-300">{item}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative animate-in slide-in-from-right-10 duration-1000 delay-500">
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Öğrenciler çalışırken"
                loading="lazy"
                className="rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-500 hover:shadow-blue-500/25"
              />
              <div className="absolute -bottom-8 -right-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-2xl shadow-2xl animate-bounce hover:animate-pulse border-4 border-white">
                <div className="text-3xl font-bold">8+</div>
                <div className="text-sm opacity-90">Yıllık Deneyim</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const currentValue = counters[stat.key as keyof typeof counters];
            
            return (
              <div 
                key={index} 
                className="text-center group animate-in slide-in-from-bottom-10 duration-1000"
                style={{ animationDelay: `${index * 200 + 800}ms` }}
              >
                <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl mx-auto mb-4 group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-500 transform group-hover:scale-110 group-hover:shadow-xl">
                  <Icon className="text-blue-600 group-hover:text-white transition-colors duration-500" size={36} />
                </div>
                <div className="text-4xl font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                  {currentValue}{stat.key === 'success' ? '%' : '+'}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Values */}
        <div className="animate-in slide-in-from-bottom-10 duration-1000 delay-1200">
          <h3 className="text-3xl font-bold text-center text-slate-800 mb-12">Değerlerimiz</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div 
                  key={index} 
                  className="text-center p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-blue-50 hover:from-blue-50 hover:to-purple-50 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-xl group"
                >
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="text-white" size={28} />
                  </div>
                  <h4 className="text-xl font-bold text-slate-800 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                    {value.title}
                  </h4>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;