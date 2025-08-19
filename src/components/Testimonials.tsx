import React, { useState, useEffect } from 'react';
import { FaStar, FaQuoteLeft, FaChevronLeft, FaChevronRight, FaGraduationCap } from 'react-icons/fa';

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: 'Ayşe Yılmaz',
      university: 'İstanbul Üniversitesi Tıp Fakültesi',
      score: '485',
      package: 'SınavKoç Plus',
      content: 'SınavKoç Plus programı ile sağlam bir temel attım. Kişiselleştirilmiş çalışma planım ve grup derslerindeki rekabet ortamı sayesinde matematik konularında büyük ilerleme kaydettim ve tıp fakültesine yerleştim.',
      rating: 5,
      image: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Mehmet Kaya',
      university: 'ODTÜ Bilgisayar Mühendisliği',
      score: '468',
      package: 'SınavKoç Pro',
      content: 'SınavKoç Pro\'nun premium destekleri sayesinde sadece 6 ayda hedefe ulaştım. Kişisel danışmanım, sınırsız birebir dersler ve 7/24 WhatsApp desteği ile sürekli motive kaldım.',
      rating: 5,
      image: 'https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Zeynep Demir',
      university: 'Boğaziçi Üniversitesi Psikoloji',
      score: '456',
      package: 'SınavKoç Plus',
      content: 'SınavKoç Plus\'ın sistematik yaklaşımı ve performans analizleri sayesinde eksik olduğum konuları belirledim. 6 aylık programla Boğaziçi\'ne yerleşmeyi başardım.',
      rating: 5,
      image: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Can Özkan',
      university: 'İTÜ Makine Mühendisliği',
      score: '472',
      package: 'SınavKoç Pro',
      content: 'SınavKoç Pro\'nun garantili başarı programı harika! Hedef odaklı özel program, sınav teknikleri eğitimi ve psikolojik destek ile İTÜ\'ye yerleştim. Gerçekten premium bir deneyim.',
      rating: 5,
      image: 'https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev: number) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev: number) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev: number) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-40 h-40 bg-blue-500/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-purple-500/10 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-indigo-500/10 rounded-full animate-pulse delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 animate-in slide-in-from-top-10 duration-1000">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
            <FaGraduationCap className="text-yellow-400" size={20} />
            <span className="text-white font-medium">Başarı Hikayeleri</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Öğrencilerimiz 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500"> Diyor Ki</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Binlerce öğrencimizin başarı hikayelerinden sadece birkaçı. 
            Sen de bu başarılı ailenin bir parçası ol!
          </p>
        </div>

        {/* Main Testimonial */}
        <div className="relative max-w-4xl mx-auto mb-12">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20 animate-in slide-in-from-bottom-10 duration-1000 delay-300 hover:bg-white/15 transition-all duration-500">
            <FaQuoteLeft className="text-yellow-400 mb-6 opacity-50" size={48} />
            
            <div className="flex items-center mb-6">
              {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                <FaStar key={i} className="text-yellow-400 fill-current animate-pulse hover:scale-125 transition-transform duration-300" size={24} style={{ animationDelay: `${i * 200}ms` }} />
              ))}
            </div>
            
            <p className="text-white text-xl md:text-2xl mb-8 italic leading-relaxed">
              "{testimonials[currentTestimonial].content}"
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img
                  src={testimonials[currentTestimonial].image}
                  alt={testimonials[currentTestimonial].name}
                  loading="lazy"
                  className="w-16 h-16 rounded-full object-cover border-2 border-white/30"
                />
                <div>
                  <h4 className="font-bold text-white text-lg">{testimonials[currentTestimonial].name}</h4>
                  <p className="text-gray-300">{testimonials[currentTestimonial].university}</p>
                  <div className={`inline-block px-2 py-1 rounded-full text-xs font-bold mt-1 ${
                    testimonials[currentTestimonial].package === 'SınavKoç Plus' 
                      ? 'bg-blue-500/30 text-blue-200' 
                      : 'bg-yellow-500/30 text-yellow-200'
                  }`}>
                    {testimonials[currentTestimonial].package}
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-3xl font-bold text-yellow-400">{testimonials[currentTestimonial].score}</div>
                <div className="text-gray-300 text-sm">YKS Puanı</div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-xl"
          >
            <FaChevronLeft size={24} />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-xl"
          >
            <FaChevronRight size={24} />
          </button>
        </div>

        {/* Testimonial Indicators */}
        <div className="flex justify-center space-x-3 mb-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentTestimonial 
                  ? 'bg-yellow-400 scale-125' 
                  : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* Success Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-in slide-in-from-bottom-10 duration-1000 delay-700">
          <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
            <div className="text-4xl font-bold text-yellow-400 mb-2">2500+</div>
            <div className="text-white">Başarılı Öğrenci</div>
          </div>
          <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
            <div className="text-4xl font-bold text-yellow-400 mb-2">95%</div>
            <div className="text-white">Hedef Başarı Oranı</div>
          </div>
          <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
            <div className="text-4xl font-bold text-yellow-400 mb-2">4.9/5</div>
            <div className="text-white">Ortalama Memnuniyet</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;