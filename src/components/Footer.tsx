import React from 'react';
import { Phone, Mail, MapPin, Instagram, Youtube, Facebook, GraduationCap, Heart } from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { name: 'Ana Sayfa', id: 'home' },
    { name: 'Hizmetler', id: 'services' },
    { name: 'Hakkımızda', id: 'about' },
    { name: 'İletişim', id: 'contact' }
  ];

  const services = [
    'Bireysel Ders Programı',
    'Grup Dersleri',
    'Performans Analizi',
    'Hedef Odaklı Program'
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-purple-500 rounded-full animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
                <GraduationCap className="text-white" size={32} />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">Sınav Koç</div>
                <div className="text-blue-200 text-sm">YKS Hazırlık Danışmanlığı</div>
              </div>
            </div>
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              8 yıldır binlerce öğrencinin üniversite hayallerini gerçeğe dönüştürüyoruz. 
              Uzman kadromuz ve kişiselleştirilmiş eğitim programlarımızla yanınızdayız.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3 group hover:text-blue-200 transition-colors duration-300">
                <Phone size={16} className="text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-gray-300">+90 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 group hover:text-blue-200 transition-colors duration-300">
                <Mail size={16} className="text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-gray-300">info@sinavkoc.com</span>
              </div>
              <div className="flex items-center space-x-3 group hover:text-blue-200 transition-colors duration-300">
                <MapPin size={16} className="text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-gray-300">Kızılay Mah. Eğitim Sok. No:15, Çankaya, Ankara</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span>Hızlı Linkler</span>
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-gray-300 hover:text-blue-400 transition-all duration-300 hover:translate-x-2 block"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span>Hizmetlerimiz</span>
            </h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-gray-300 hover:text-purple-400 transition-colors duration-300 cursor-pointer block hover:translate-x-2">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <span className="text-gray-300">Bizi takip edin:</span>
              <div className="flex items-center space-x-3">
                <a href="#" className="text-gray-300 hover:text-pink-400 transition-all duration-300 hover:scale-125 transform">
                  <Instagram size={24} />
                </a>
                <a href="#" className="text-gray-300 hover:text-red-400 transition-all duration-300 hover:scale-125 transform">
                  <Youtube size={24} />
                </a>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-all duration-300 hover:scale-125 transform">
                  <Facebook size={24} />
                </a>
              </div>
            </div>
            
            <div className="text-gray-300 text-sm flex items-center space-x-2">
              <span>© {new Date().getFullYear()} Sınav Koç. Tüm hakları saklıdır.</span>
              <Heart className="text-red-400 animate-pulse" size={16} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;