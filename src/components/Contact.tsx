import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaClock, FaCheckCircle, FaComments, FaCalendarAlt } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    grade: '',
    package: '',
    targetScore: '',
    subjects: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Form submitted:', formData);
    setIsLoading(false);
    setIsSubmitted(true);
    
    // Reset form after 4 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        grade: '',
        package: '',
        targetScore: '',
        subjects: '',
        message: ''
      });
    }, 4000);
  };

  const contactInfo = [
    {
      icon: FaPhone,
      title: 'Bizi Arayın',
      details: '+90 (555) 123-4567',
      subtitle: 'Pazartesi-Cuma 09:00-18:00'
    },
    {
      icon: FaEnvelope,
      title: 'E-posta Gönderin',
      details: 'info@sinavkoc.com',
      subtitle: '24 saat içinde yanıtlıyoruz'
    },
    {
      icon: FaMapMarkerAlt,
      title: 'Ofisimizi Ziyaret Edin',
      details: 'Kızılay Mah. Eğitim Sok. No:15',
      subtitle: 'Çankaya, Ankara'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-purple-500 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-indigo-500 rounded-full animate-pulse delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 animate-in slide-in-from-top-10 duration-1000">
          <div className="inline-flex items-center space-x-2 bg-blue-100 rounded-full px-4 py-2 mb-4">
            <FaComments className="text-blue-600" size={20} />
            <span className="text-blue-800 font-medium">İletişim</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Hayallerini 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Gerçekleştir!</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Uzman ekibimizle tanış, sana özel hazırlık programını keşfet. 
            Ücretsiz danışmanlık için hemen iletişime geç!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 animate-in slide-in-from-left-10 duration-1000 delay-300">
            <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center space-x-2">
              <FaCalendarAlt className="text-blue-600" size={28} />
              <span>Ücretsiz Danışmanlık Formu</span>
            </h3>
            
            {isSubmitted ? (
              <div className="text-center py-12 animate-in zoom-in-50 duration-500">
                <FaCheckCircle className="text-green-600 mx-auto mb-6 animate-bounce" size={80} />
                <h4 className="text-3xl font-bold text-green-600 mb-4">Mesajınız Alındı!</h4>
                <p className="text-gray-600 text-lg">
                  En kısa sürede sizinle iletişime geçeceğiz. 
                  YKS yolculuğunuzda yanınızdayız!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2 group-focus-within:text-blue-600 transition-colors duration-300">
                      Ad Soyad *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-300"
                      placeholder="Adınız ve soyadınız"
                    />
                  </div>
                  <div className="group">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 group-focus-within:text-blue-600 transition-colors duration-300">
                      E-posta Adresi *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-300"
                      placeholder="ornek@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2 group-focus-within:text-blue-600 transition-colors duration-300">
                      Telefon Numarası *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-300"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div className="group">
                    <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-2 group-focus-within:text-blue-600 transition-colors duration-300">
                      Sınıf *
                    </label>
                    <select
                      id="grade"
                      name="grade"
                      required
                      value={formData.grade}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-300"
                    >
                      <option value="">Sınıfınızı seçin</option>
                      <option value="9">9. Sınıf</option>
                      <option value="10">10. Sınıf</option>
                      <option value="11">11. Sınıf</option>
                      <option value="12">12. Sınıf</option>
                      <option value="mezun">Mezun</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group">
                    <label htmlFor="package" className="block text-sm font-medium text-gray-700 mb-2 group-focus-within:text-blue-600 transition-colors duration-300">
                      İlgilendiğiniz Paket *
                    </label>
                    <select
                      id="package"
                      name="package"
                      required
                      value={formData.package}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-300"
                    >
                      <option value="">Paket seçin</option>
                      <option value="ana-ekip">SınavKoç Plus (₺1.200/ay) - Temel Paket</option>
                      <option value="derece-ekibi">SınavKoç Pro (₺2.400/ay) - Premium Paket</option>
                      <option value="kararsızım">Henüz kararsızım, danışmanlık istiyorum</option>
                    </select>
                  </div>
                  <div className="group">
                    <label htmlFor="targetScore" className="block text-sm font-medium text-gray-700 mb-2 group-focus-within:text-blue-600 transition-colors duration-300">
                      Hedef Puan
                    </label>
                    <input
                      type="number"
                      id="targetScore"
                      name="targetScore"
                      value={formData.targetScore}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-300"
                      placeholder="450"
                      min="200"
                      max="500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group">
                    <label htmlFor="subjects" className="block text-sm font-medium text-gray-700 mb-2 group-focus-within:text-blue-600 transition-colors duration-300">
                      Zorlandığınız Dersler
                    </label>
                    <input
                      type="text"
                      id="subjects"
                      name="subjects"
                      value={formData.subjects}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-300"
                      placeholder="Matematik, Fizik..."
                    />
                  </div>
                  <div className="group">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2 group-focus-within:text-blue-600 transition-colors duration-300">
                      Mesajınız
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none hover:border-blue-300"
                      placeholder="Hedefleriniz ve beklentileriniz hakkında bize bilgi verin..."
                    ></textarea>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-all duration-500 shadow-2xl hover:shadow-blue-500/25 transform hover:-translate-y-1 hover:scale-105 disabled:transform-none disabled:hover:scale-100 animate-pulse hover:animate-none"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Gönderiliyor...</span>
                    </>
                  ) : (
                    <>
                      <FaPaperPlane size={20} />
                      <span>Ücretsiz Danışmanlık Al</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Contact Information */}
          <div className="space-y-8 animate-in slide-in-from-right-10 duration-1000 delay-500">
            <div className="bg-white rounded-3xl shadow-2xl p-8">
              <h3 className="text-2xl font-bold text-slate-800 mb-6">İletişim Bilgileri</h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <div key={index} className="flex items-start space-x-4 group hover:bg-blue-50 p-4 rounded-xl transition-all duration-300">
                      <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl flex-shrink-0 group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300 group-hover:shadow-lg group-hover:scale-110">
                        <Icon className="text-blue-600 group-hover:text-white transition-colors duration-300" size={24} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors duration-300">{info.title}</h4>
                        <p className="text-gray-600 font-medium">{info.details}</p>
                        <p className="text-sm text-gray-500">{info.subtitle}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-3xl shadow-2xl p-8">
              <div className="flex items-center space-x-3 mb-4">
                <FaClock size={28} className="animate-pulse" />
                <h3 className="text-2xl font-bold">Hemen Başla!</h3>
              </div>
              <p className="mb-6 text-blue-100 leading-relaxed">
                Ücretsiz 30 dakikalık danışmanlık seansında sana özel hazırlık 
                programını keşfet. Uzman öğretmenlerimizle tanış!
              </p>
              <div className="space-y-3 text-sm text-blue-100">
                <div className="flex items-center space-x-2">
                  <FaCheckCircle size={16} />
                  <span>Kişiselleştirilmiş program önerisi</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaCheckCircle size={16} />
                  <span>Hedef belirleme ve strateji</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaCheckCircle size={16} />
                  <span>Ücretsiz deneme dersi fırsatı</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;