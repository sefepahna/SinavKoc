import React from 'react';
import { FaStar, FaGraduationCap, FaAward, FaUsers } from 'react-icons/fa';

const Coaches = () => {
  const coaches = [
    {
      name: 'Dr. Mehmet Yılmaz',
      experience: '12 Yıl',
      specialty: 'Matematik & Fizik',
      success: '500+ öğrenci üniversiteye yerleştirdi',
      tagline: 'Matematik korkusunu sevgiye dönüştürüyorum',
      image: 'https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=400',
      achievements: ['YKS Matematik Uzmanı', 'Fizik Doktorası', '95% Başarı Oranı']
    },
    {
      name: 'Ayşe Demir',
      experience: '8 Yıl',
      specialty: 'Türkçe & Edebiyat',
      success: '350+ öğrenci hedefine ulaştı',
      tagline: 'Kelimelerle köprüler kurarak başarıya götürüyorum',
      image: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=400',
      achievements: ['Türkçe Öğretmeni', 'Edebiyat Uzmanı', '92% Başarı Oranı']
    },
    {
      name: 'Prof. Dr. Can Özkan',
      experience: '15 Yıl',
      specialty: 'Kimya & Biyoloji',
      success: '600+ öğrenci tıp fakültesinde',
      tagline: 'Fen bilimlerinde zirveye çıkarıyorum',
      image: 'https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=400',
      achievements: ['Kimya Profesörü', 'Tıp Fakültesi Mezunu', '98% Başarı Oranı']
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-purple-500 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-indigo-500 rounded-full animate-pulse delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 animate-in slide-in-from-top-10 duration-1000">
          <div className="inline-flex items-center space-x-2 bg-blue-100 rounded-full px-4 py-2 mb-4">
            <FaGraduationCap className="text-blue-600" size={20} />
            <span className="text-blue-800 font-medium">Uzman Kadromuz</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Başarının Mimarları:
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Koçlarımız</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Alanında uzman, deneyimli ve başarı odaklı öğretmenlerimizle tanış. 
            Her biri binlerce öğrencinin hayallerini gerçeğe dönüştürdü.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coaches.map((coach, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 p-8 group transform hover:-translate-y-4 animate-in slide-in-from-bottom-10 duration-1000"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Photo */}
              <div className="relative mb-6">
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden ring-4 ring-blue-100 group-hover:ring-blue-300 transition-all duration-300">
                  <img
                    src={coach.image}
                    alt={coach.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                  {coach.experience}
                </div>
              </div>

              {/* Info */}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                  {coach.name}
                </h3>
                <p className="text-blue-600 font-semibold mb-2">{coach.specialty}</p>
                <p className="text-gray-600 italic">"{coach.tagline}"</p>
              </div>

              {/* Success Stats */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 mb-6 group-hover:from-blue-100 group-hover:to-purple-100 transition-all duration-300">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <FaUsers className="text-blue-600" size={20} />
                  <span className="font-bold text-slate-800">{coach.success}</span>
                </div>
              </div>

              {/* Achievements */}
              <div className="space-y-2">
                {coach.achievements.map((achievement, idx) => (
                  <div key={idx} className="flex items-center space-x-2 text-sm text-gray-700">
                    <FaStar className="text-yellow-500 flex-shrink-0" size={14} />
                    <span>{achievement}</span>
                  </div>
                ))}
              </div>

              {/* Rating */}
              <div className="flex items-center justify-center space-x-1 mt-6 pt-6 border-t border-gray-100">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 fill-current" size={20} />
                ))}
                <span className="text-gray-600 ml-2 font-medium">5.0</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 animate-in slide-in-from-bottom-10 duration-1000 delay-800">
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-3xl p-8 text-white">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <FaAward className="text-yellow-400" size={28} />
              <h3 className="text-2xl font-bold">Uzman Koçlarımızla Tanış!</h3>
            </div>
            <p className="text-gray-300 mb-6 text-lg max-w-2xl mx-auto">
              Her koçumuz kendi alanında uzman ve öğrenci başarısına odaklı. 
              Sana en uygun koçu belirlemek için ücretsiz danışmanlık al.
            </p>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105"
            >
              Koçunla Tanışmak İçin Randevu Al
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Coaches;