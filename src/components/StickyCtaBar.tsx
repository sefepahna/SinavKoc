import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaTimes } from 'react-icons/fa';

const StickyCtaBar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('home');
      if (heroSection) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        setIsVisible(window.scrollY > heroBottom && !isDismissed);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  const handleBooking = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDismiss = () => {
    setIsDismissed(true);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 animate-in slide-in-from-top-5 duration-500">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center space-x-4">
              <div className="text-sm md:text-base font-medium">
                Hedefine ulaşmak için hemen başla!
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={handleBooking}
                className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center space-x-2 hover:scale-105 shadow-lg"
              >
                <FaCalendarAlt size={16} />
                <span>Randevu Al</span>
              </button>
              
              <button
                onClick={handleDismiss}
                className="text-white hover:text-blue-200 p-1 transition-colors duration-300"
              >
                <FaTimes size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyCtaBar;