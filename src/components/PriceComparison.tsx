import React from 'react';
import { FaCheck, FaTimes, FaCrown, FaUsers, FaStar } from 'react-icons/fa';

const PriceComparison = () => {
  const features = [
    { name: 'Bireysel Ders Programı', anaEkip: true, dereceEkibi: true },
    { name: 'Grup Dersleri (4-6 kişi)', anaEkip: true, dereceEkibi: true },
    { name: 'Performans Analizi ve Raporlama', anaEkip: true, dereceEkibi: true },
    { name: 'Konu Bazlı Çalışma Planı', anaEkip: true, dereceEkibi: true },
    { name: 'Haftalık İlerleme Takibi', anaEkip: true, dereceEkibi: true },
    { name: 'Deneme Sınavları', anaEkip: true, dereceEkibi: true },
    { name: 'Online Destek Sistemi', anaEkip: true, dereceEkibi: true },
    { name: 'Hedef Odaklı Özel Program', anaEkip: false, dereceEkibi: true },
    { name: 'Son Dakika Yoğun Hazırlık', anaEkip: false, dereceEkibi: true },
    { name: 'Kişisel Başarı Danışmanı', anaEkip: false, dereceEkibi: true },
    { name: 'Sınırsız Birebir Ders', anaEkip: false, dereceEkibi: true },
    { name: '7/24 WhatsApp Destek', anaEkip: false, dereceEkibi: true },
    { name: 'Garantili Başarı Sözü', anaEkip: false, dereceEkibi: true },
    { name: 'Sınav Teknikleri Eğitimi', anaEkip: false, dereceEkibi: true },
    { name: 'Psikolojik Destek', anaEkip: false, dereceEkibi: true }
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600 to-purple-600"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 animate-in slide-in-from-top-10 duration-1000">
          <div className="inline-flex items-center space-x-2 bg-blue-100 rounded-full px-4 py-2 mb-4">
            <FaStar className="text-blue-600" size={20} />
            <span className="text-blue-800 font-medium">Paket Karşılaştırması</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Hangi Paket 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Sana Uygun?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            İki paketimizin özelliklerini karşılaştır, ihtiyacına en uygun olanı seç.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-10 duration-1000 delay-300">
            {/* Header */}
            <div className="grid grid-cols-3 bg-gradient-to-r from-gray-50 to-blue-50">
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-800">Özellikler</h3>
              </div>
              <div className="p-6 text-center border-l border-gray-200">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <FaUsers className="text-blue-600" size={24} />
                  <h3 className="text-xl font-bold text-slate-800">SınavKoç Plus</h3>
                </div>
                <div className="text-3xl font-bold text-blue-600 mb-1">₺1.200/ay</div>
                <div className="text-sm text-gray-500 line-through">₺1.500/ay</div>
                <div className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-bold mt-2">
                  En Popüler
                </div>
              </div>
              <div className="p-6 text-center border-l border-gray-200 bg-gradient-to-r from-yellow-50 to-orange-50">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <FaCrown className="text-yellow-600" size={24} />
                  <h3 className="text-xl font-bold text-slate-800">SınavKoç Pro</h3>
                </div>
                <div className="text-3xl font-bold text-yellow-600 mb-1">₺2.400/ay</div>
                <div className="text-sm text-gray-500 line-through">₺3.000/ay</div>
                <div className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-bold mt-2">
                  Premium
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="divide-y divide-gray-100">
              {features.map((feature, index) => (
                <div key={index} className="grid grid-cols-3 hover:bg-gray-50 transition-colors duration-200">
                  <div className="p-4 font-medium text-gray-700">
                    {feature.name}
                  </div>
                  <div className="p-4 text-center border-l border-gray-100">
                    {feature.anaEkip ? (
                      <FaCheck className="text-green-600 mx-auto" size={20} />
                    ) : (
                      <FaTimes className="text-gray-300 mx-auto" size={20} />
                    )}
                  </div>
                  <div className="p-4 text-center border-l border-gray-100">
                    {feature.dereceEkibi ? (
                      <FaCheck className="text-green-600 mx-auto" size={20} />
                    ) : (
                      <FaTimes className="text-gray-300 mx-auto" size={20} />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="grid grid-cols-2 bg-gray-50">
              <div className="p-6 border-r border-gray-200">
                <button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105"
                >
                  SınavKoç Plus'ı Seç
                </button>
              </div>
              <div className="p-6">
                <button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105"
                >
                  SınavKoç Pro'yu Seç
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PriceComparison;