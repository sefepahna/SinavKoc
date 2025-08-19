import React from 'react';
import { 
  FaHome, 
  FaCalendarAlt, 
  FaChartBar, 
  FaUsers, 
  FaVideo, 
  FaComments, 
  FaFileAlt, 
  FaUser,
  FaTimes,
  FaChalkboardTeacher,
  FaBell
} from 'react-icons/fa';

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  activeSection, 
  setActiveSection, 
  sidebarOpen, 
  setSidebarOpen 
}) => {
  const menuItems = [
    { id: 'overview', label: 'Genel Bakış', icon: FaHome, badge: null },
    { id: 'my-students', label: 'Öğrencilerim', icon: FaUsers, badge: '24' },
    { id: 'session-calendar', label: 'Oturum Takvimi', icon: FaCalendarAlt, badge: '3' },
    { id: 'messages', label: 'Mesajlar', icon: FaComments, badge: '5' },
    { id: 'reports', label: 'Raporlar', icon: FaChartBar, badge: 'Yeni' },
    { id: 'resources', label: 'Kaynaklar', icon: FaFileAlt, badge: null },
    { id: 'profile', label: 'Profil', icon: FaUser, badge: null },
  ];

  const handleItemClick = (id: string) => {
    setActiveSection(id);
    setSidebarOpen(false);
  };

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-[55] lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Enhanced Sidebar */}
      <div className={`fixed top-0 left-0 z-[60] h-full w-72 bg-white shadow-2xl transform transition-all duration-500 ease-in-out lg:translate-x-0 border-r border-gray-200 ${
        sidebarOpen ? 'translate-x-0 scale-100 opacity-100' : '-translate-x-full scale-95 opacity-0'
      } lg:scale-100 lg:opacity-100`}>
        {/* Enhanced Header */}
        <div className="flex items-center justify-between p-6 border-b border-blue-200 bg-gradient-to-r from-purple-600 to-indigo-600">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
              <FaChalkboardTeacher className="text-white" size={24} />
            </div>
            <div>
              <div className="text-xl font-bold text-white">Koç Paneli</div>
              <div className="text-xs text-purple-100">SınavKoç Platform</div>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white hover:text-purple-200 transition-colors duration-300 p-2 hover:bg-white/10 rounded-lg"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Coach Info */}
        <div className="p-6 border-b border-purple-200">
          <div className="flex items-center space-x-3">
            <img
              src="https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=100"
              alt="Profil"
              className="w-12 h-12 rounded-full object-cover ring-4 ring-purple-200"
            />
            <div>
              <div className="font-bold text-slate-800">Mehmet Yılmaz</div>
              <div className="text-sm text-gray-600">Matematik & Fizik Uzmanı</div>
              <div className="flex items-center space-x-2 mt-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-600 font-medium">Çevrimiçi</span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Navigation */}
        <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`w-full flex items-center justify-between px-4 py-4 rounded-xl text-left transition-all duration-300 group transform hover:scale-[1.02] ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg scale-[1.02]'
                    : 'text-gray-700 hover:bg-purple-50 hover:text-purple-600'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon 
                    size={20} 
                    className={`transition-all duration-300 ${
                      isActive ? 'text-white' : 'text-gray-500 group-hover:text-purple-600 group-hover:scale-110'
                    }`} 
                  />
                  <span className="font-semibold">{item.label}</span>
                </div>
                
                {item.badge && (
                  <span className={`inline-flex items-center justify-center min-w-[20px] h-5 text-xs font-bold rounded-full transition-all duration-300 ${
                    isActive 
                      ? 'bg-white/20 text-white' 
                      : item.badge === 'Yeni' 
                        ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white'
                        : 'bg-red-500 text-white'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Enhanced Bottom section */}
        <div className="p-4 border-t border-purple-200">
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-4 border border-purple-200">
            <div className="flex items-center space-x-3 mb-3">
              <FaBell className="text-purple-600" size={20} />
              <div className="text-sm font-bold text-slate-800">
                Destek Merkezi
              </div>
            </div>
            <p className="text-xs text-gray-600 mb-3">
              Öğrencilerinizle ilgili sorularınız için 7/24 buradayız!
            </p>
            <button className="w-full text-xs text-purple-600 hover:text-purple-700 transition-colors duration-300 bg-white hover:bg-purple-50 py-2 px-3 rounded-lg font-medium">
              Teknik destek al →
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;