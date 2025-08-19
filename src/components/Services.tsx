import React, { useState } from 'react';
import { FaBookOpen, FaUsers, FaChartBar, FaBullseye, FaClock, FaAward, FaChevronRight, FaStar, FaCrown, FaBolt } from 'react-icons/fa';

const Services = () => {
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  const services = [
    {
      icon: FaUsers,
      title: 'SınavKoç Plus',
      description: 'YKS\'ye sağlam bir temel atmanı sağlayan kapsamlı eğitim paketi. Temel konulardan ileri seviyeye kadar sistematik bir şekilde ilerle.',
      features: [
        'Bireysel Ders Programı (₺150/saat)',
        'Grup Dersleri (4-6 kişi)',
        'Performans Analizi ve Raporlama',
        'Konu Bazlı Çalışma Planı',
        'Haftalık İlerleme Takibi',
        'Deneme Sınavları',
        'Online Destek Sistemi',
        '6 Aylık Program'
      ],
      price: '₺1.200/ay',
      originalPrice: '₺1.500/ay',
      popular: true,
      badge: 'En Çok Tercih Edilen',
      badgeColor: 'from-blue-600 to-purple-600',
      iconColor: 'from-blue-600 to-purple-600'
    },
    {
      icon: FaCrown,
      title: 'SınavKoç Pro',
      description: 'Sadece dereceye odaklanan öğrenciler için tasarlanmış ultra-premium hazırlık paketi. Birinciliğe giden yolda her detay düşünülmüş.',
      features: [
        'Tüm SınavKoç Plus Hizmetleri',
        'Hedef Odaklı Özel Program',
        'Son Dakika Yoğun Hazırlık',
        'Kişisel Başarı Danışmanı',
        'Sınırsız Birebir Ders',
        '7/24 WhatsApp Destek',
        'Garantili Başarı Sözü',
        'Sınav Teknikleri Eğitimi',
        'Psikolojik Destek',
        '12 Aylık Premium Program'
      ],
      price: '₺2.400/ay',
      originalPrice: '₺3.000/ay',
      popular: false,
      badge: 'Premium',
      badgeColor: 'from-yellow-500 to-orange-600',
      iconColor: 'from-yellow-500 to-orange-600'
    }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-purple-500 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-20 h-20 bg-yellow-500 rounded-full animate-pulse delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 animate-in slide-in-from-top-10 duration-1000">
          <div className="inline-flex items-center space-x-2 bg-blue-100 rounded-full px-4 py-2 mb-4">
            <FaStar className="text-blue-600" size={20} />
            <span className="text-blue-800 font-medium">Eğitim Paketlerimiz</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Hangi Seviyede 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Başarı İstiyorsun?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hedefine uygun paketi seç, uzman öğretmenlerimizle YKS'de zirvede yer al.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className={`relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 p-8 group transform hover:-translate-y-4 animate-in slide-in-from-bottom-10 duration-1000 ${
                  service.popular ? 'ring-2 ring-blue-500 scale-[1.02] shadow-blue-200' : 'hover:scale-[1.02] hover:shadow-purple-200'
                }`}
                style={{ animationDelay: `${index * 300}ms` }}
                onMouseEnter={() => setHoveredService(index)}
                onMouseLeave={() => setHoveredService(null)}
              >
                {/* Badge */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className={`bg-gradient-to-r ${service.badgeColor} text-white px-6 py-2 rounded-full text-sm font-bold animate-pulse shadow-xl border-2 border-white`}>
                    {service.badge}
                  </div>
                </div>

                {/* Icon */}
                <div className={`flex items-center justify-center w-20 h-20 rounded-3xl mb-6 transition-all duration-500 ${
                  hoveredService === index 
                    ? `bg-gradient-to-r ${service.iconColor} scale-110 shadow-xl` 
                    : `bg-gradient-to-r ${service.iconColor} opacity-20 group-hover:opacity-100 group-hover:shadow-lg`
                }`}>
                  <Icon className={`transition-colors duration-500 ${
                    hoveredService === index ? 'text-white' : 'text-gray-700 group-hover:text-white'
                  }`} size={40} />
                </div>
                
                {/* Title */}
                <h3 className="text-3xl font-bold text-slate-800 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                  {service.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-600 mb-6 leading-relaxed text-lg">{service.description}</p>
                
                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start space-x-3 text-gray-700">
                      <div className={`w-2 h-2 rounded-full mt-2 transition-all duration-300 ${
                        hoveredService === index ? 'bg-purple-600 scale-150' : 'bg-blue-600'
                      }`}></div>
                      <span className="group-hover:text-slate-800 transition-colors duration-300 font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Pricing */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-4xl font-bold text-blue-600">{service.price}</div>
                    <div className="text-lg text-gray-500 line-through">{service.originalPrice}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Toplam Tasarruf</div>
                    <div className="text-xl font-bold text-green-600">
                      ₺{parseInt(service.originalPrice.replace('₺', '').replace('/ay', '')) - parseInt(service.price.replace('₺', '').replace('/ay', ''))}/ay
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <button className={`w-full flex items-center justify-center space-x-2 px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
                  service.popular 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:scale-105 shadow-lg hover:shadow-2xl hover:shadow-blue-500/25' 
                    : 'bg-gradient-to-r from-yellow-500 to-orange-600 text-white hover:scale-105 shadow-lg hover:shadow-2xl hover:shadow-yellow-500/25'
                }`}>
                  <span>Paketi Seç</span>
                  <FaChevronRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 animate-in slide-in-from-bottom-10 duration-1000 delay-1000">
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-3xl p-8 text-white">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <FaBolt className="text-yellow-400" size={24} />
              <h3 className="text-2xl font-bold">Hangi Paket Sana Uygun?</h3>
            </div>
            <p className="text-gray-300 mb-6 text-lg">
              Ücretsiz danışmanlık hizmetimizle hedefine en uygun paketi belirleyelim ve başarı yolculuğunu birlikte planlayalım.
            </p>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105"
            >
              Ücretsiz Danışmanlık Al
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;