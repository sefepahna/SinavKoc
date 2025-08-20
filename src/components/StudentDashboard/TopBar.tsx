import React, { useState, useEffect } from 'react';
import { FaBars, FaCalendarAlt, FaChartBar, FaBell, FaSearch, FaCog, FaSignOutAlt, FaUsers } from 'react-icons/fa';

interface TopBarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const TopBar: React.FC<TopBarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const notifications = [
    { id: 1, title: 'Yeni deneme sonucu', message: 'Matematik denemin analizi hazır', time: '5 dk önce', unread: true },
    { id: 2, title: 'Randevu hatırlatması', message: 'Yarın 14:00 matematik dersin var', time: '1 saat önce', unread: true },
    { id: 3, title: 'Görev tamamlandı', message: 'Polinomlar konusu başarıyla tamamlandı', time: '3 saat önce', unread: false }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <>
      {/* Enhanced Main Top Bar */}
      <header className="fixed top-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md shadow-xl border-b border-gray-200 animate-in slide-in-from-top-5 duration-1000">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-500 transform hover:scale-110 hover:rotate-180"
            >
              <FaBars size={20} />
            </button>
            
            <div className="hidden lg:block">
              <h1 className="text-2xl font-bold text-slate-800 animate-in slide-in-from-left-10 duration-1000">SınavKoç Öğrenci Paneli</h1>
              <p className="text-sm text-gray-600 animate-in slide-in-from-left-10 duration-1000 delay-200">Başarıya giden yolda yanındayız</p>
            </div>
          </div>

          {/* Enhanced Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 transition-all duration-300 hover:text-blue-500 hover:scale-110" size={16} />
              <input
                type="text"
                placeholder="Ders, görev veya belge ara..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-500 hover:shadow-lg focus:shadow-xl"
              />
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Notifications */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-500 transform hover:scale-110 hover:rotate-12"
              >
                <FaBell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-bounce">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 animate-in slide-in-from-top-5 duration-500 hover:shadow-3xl">
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center space-x-2">
                      <FaBell className="text-blue-600 animate-pulse" size={16} />
                      <h3 className="font-bold text-slate-800">Bildirimler</h3>
                      {unreadCount > 0 && (
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-bold animate-pulse">
                          {unreadCount} yeni
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map((notification, index) => (
                      <div 
                        key={notification.id} 
                        className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-all duration-300 hover:scale-[1.02] animate-in slide-in-from-right-5 duration-500 ${notification.unread ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''}`}
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`w-3 h-3 rounded-full mt-2 ${notification.unread ? 'bg-blue-500 animate-ping' : 'bg-gray-300'}`}></div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-slate-800 text-sm">{notification.title}</h4>
                            <p className="text-gray-600 text-sm">{notification.message}</p>
                            <p className="text-gray-500 text-xs mt-1">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 text-center">
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-all duration-300 hover:scale-105">
                      Tümünü gör
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Settings */}
            <button className="p-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-500 transform hover:scale-110 hover:rotate-90">
              <FaCog size={20} />
            </button>
            
            {/* Enhanced Profile */}
            <div className="relative">
              <button 
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center space-x-3 pl-3 border-l border-gray-200 hover:bg-gray-50 rounded-r-xl transition-all duration-300 py-2 pr-3"
              >
                <img
                  src="https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=100"
                  alt="Profil"
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-200"
                />
                <div className="hidden sm:block text-left">
                  <div className="text-sm font-bold text-slate-800">Mehmet Yılmaz</div>
                  <div className="text-xs text-gray-500">Matematik Uzmanı</div>
                </div>
              </button>

              {/* Profile Dropdown */}
              {showProfile && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 animate-in slide-in-from-top-5 duration-300">
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                      <img
                        src="https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=100"
                        alt="Profil"
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-bold text-slate-800">Mehmet Yılmaz</div>
                        <div className="text-sm text-gray-600">mehmet@sinavkoc.com</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-2">
                    <button className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors duration-300 flex items-center space-x-2">
                      <FaUser size={16} className="text-gray-500" />
                      <span className="text-sm text-gray-700">Profili Düzenle</span>
                    </button>
                    <button className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors duration-300 flex items-center space-x-2">
                      <FaCog size={16} className="text-gray-500" />
                      <span className="text-sm text-gray-700">Ayarlar</span>
                    </button>
                    <button className="w-full text-left px-3 py-2 hover:bg-red-50 rounded-lg transition-colors duration-300 flex items-center space-x-2 text-red-600">
                      <FaSignOutAlt size={16} />
                      <span className="text-sm">Çıkış Yap</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Sticky Action Bar */}
      {showStickyBar && (
        <div className="fixed top-20 left-0 right-0 z-20 bg-gradient-to-r from-blue-600 to-purple-600 shadow-xl animate-in slide-in-from-top-5 duration-300">
          <div className="flex items-center justify-center space-x-6 px-4 py-4">
            <button className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 flex items-center space-x-2 hover:scale-105 shadow-lg">
              <FaCalendarAlt size={16} />
              <span>📅 Randevu Planla</span>
            </button>
            
            <button className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 flex items-center space-x-2 hover:scale-105">
              <FaChartBar size={16} />
              <span>📊 Rapor Oluştur</span>
            </button>
            
            <button className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 flex items-center space-x-2 hover:scale-105">
              <FaUsers size={16} />
              <span>👥 Öğrenci Ekle</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default TopBar;