import React, { useState, useEffect } from 'react';
import { HiMenu, HiX, HiPhone, HiMail, HiAcademicCap } from 'react-icons/hi';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-xl' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-3 group">
            <div className={`p-2 rounded-xl transition-all duration-300 ${
              isScrolled ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-white/20 backdrop-blur-sm'
            }`}>
              <HiAcademicCap className={`transition-colors duration-300 ${
                isScrolled ? 'text-white' : 'text-white'
              }`} size={28} />
            </div>
            <div className={`transition-colors duration-300 ${
              isScrolled ? 'text-slate-800' : 'text-white'
            }`}>
              <div className="text-2xl font-bold">Sınav Koç</div>
              <div className="text-xs opacity-80">SınavKoç Plus • SınavKoç Pro</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {[
              { name: 'Ana Sayfa', id: 'home' },
              { name: 'Paketler', id: 'services' },
              { name: 'Hakkımızda', id: 'about' },
              { name: 'Başarılar', id: 'testimonials' },
              { name: 'İletişim', id: 'contact' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-medium transition-all duration-300 hover:scale-105 relative group ${
                  isScrolled ? 'text-slate-700 hover:text-blue-600' : 'text-white hover:text-blue-200'
                }`}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </nav>

          {/* Contact Info */}
          <div className="hidden lg:flex items-center space-x-4">
            <a href="tel:+905551234567" className={`flex items-center space-x-2 text-sm transition-all duration-300 hover:scale-105 ${
              isScrolled ? 'text-slate-600 hover:text-blue-600' : 'text-white hover:text-blue-200'
            }`}>
              <HiPhone size={16} />
              <span>(555) 123-4567</span>
            </a>
            <a href="mailto:info@sinavkoc.com" className={`flex items-center space-x-2 text-sm transition-all duration-300 hover:scale-105 ${
              isScrolled ? 'text-slate-600 hover:text-blue-600' : 'text-white hover:text-blue-200'
            }`}>
              <HiMail size={16} />
              <span>info@sinavkoc.com</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2 rounded-md transition-all duration-300 hover:scale-110 ${
              isScrolled ? 'text-slate-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
            }`}
          >
            {isMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md shadow-xl rounded-2xl mt-2 py-6 animate-in slide-in-from-top-5 duration-300">
            {[
              { name: 'Ana Sayfa', id: 'home' },
              { name: 'Paketler', id: 'services' },
              { name: 'Hakkımızda', id: 'about' },
              { name: 'Başarılar', id: 'testimonials' },
              { name: 'İletişim', id: 'contact' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left px-6 py-3 text-slate-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 transition-all duration-300"
              >
                {item.name}
              </button>
            ))}
            <div className="border-t border-gray-200 mt-4 pt-4 px-6 space-y-3">
              <a href="tel:+905551234567" className="flex items-center space-x-3 text-slate-600 hover:text-blue-600 transition-colors duration-300">
                <HiPhone size={16} />
                <span>(555) 123-4567</span>
              </a>
              <a href="mailto:info@sinavkoc.com" className="flex items-center space-x-3 text-slate-600 hover:text-blue-600 transition-colors duration-300">
                <HiMail size={16} />
                <span>info@sinavkoc.com</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;