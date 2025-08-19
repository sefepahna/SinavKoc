import React from 'react';
import { 
  FaHome, 
  FaCalendarAlt, 
  FaChartBar, 
  FaTasks, 
  FaVideo, 
  FaComments, 
  FaFileAlt, 
  FaUser,
  FaTimes,
  FaGraduationCap,
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
    { id: 'study-plan', label: 'Çalışma Planım', icon: FaCalendarAlt, badge: null },
    { id: 'exam-analysis', label: 'Deneme Analizi', icon: FaChartBar, badge: 'AI' },
    { id: 'tasks', label: 'Ödevler / Görevler', icon: FaTasks, badge: '5' },
    { id: 'sessions', label: 'Oturumlar', icon: FaVideo, badge: null },
    { id: 'messages', label: 'Mesajlar', icon: FaComments, badge: '2' },
    { id: 'documents', label: 'Belgeler', icon: FaFileAlt, badge: null },
    { id: 'profile', label: 'Profil & Üyelik', icon: FaUser, badge: null },
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
          className="fixed inset-0 bg-black bg-opacity-50 z-[55] lg:hidden backdrop-blur-sm transition-opacity duration-500 ease-in-out animate-in fade-in"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Enhanced Sidebar */}
      <div className={`fixed top-0 left-0 z-[60] h-full w-72 bg-white shadow-2xl transform transition-all duration-500 ease-in-out lg:translate-x-0 border-r border-gray-200 ${
        sidebarOpen ? 'translate-x-0 scale-100 opacity-100' : '-translate-x-full scale-95 opacity-0'
      } lg:scale-100 lg:opacity-100`}>
        {/* Enhanced Header */}
        <div className="flex items-center justify-between p-6 border-b border-blue-200 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
              <FaGraduationCap className="text-white" size={24} />
            </div>
            <div>
              <div className="text-xl font-bold text-white">Öğrenci Paneli</div>
              <div className="text-xs text-blue-100">SınavKoç Platform</div>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white hover:text-blue-200 transition-all duration-300 p-2 hover:bg-white/10 rounded-lg hover:scale-110 hover:rotate-90"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* User Info */}
        <div className="p-6 border-b border-blue-200">
          <div className="flex items-center space-x-3">
            <img
              src="https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=100"
              alt="Profil"
              className="w-12 h-12 rounded-full object-cover ring-4 ring-blue-200"
            />
            <div>
              <div className="font-bold text-slate-800">Ayşe Yılmaz</div>
              <div className="text-sm text-gray-600">12. Sınıf • SınavKoç Plus</div>
              <div className="flex items-center space-x-2 mt-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-600 font-medium">Aktif</span>
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
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-[1.02]'
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon 
                    size={20} 
                    className={`transition-all duration-300 ${
                      isActive ? 'text-white' : 'text-gray-500 group-hover:text-blue-600 group-hover:scale-110'
                    }`} 
                  />
                  <span className="font-semibold">{item.label}</span>
                </div>
                
                {item.badge && (
                  <span className={`inline-flex items-center justify-center min-w-[20px] h-5 text-xs font-bold rounded-full transition-all duration-300 ${
                    isActive 
                      ? 'bg-white/20 text-white' 
                      : item.badge === 'AI' 
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
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
        <div className="p-4 border-t border-blue-200">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-200">
            <div className="flex items-center space-x-3 mb-3">
              <FaBell className="text-blue-600" size={20} />
              <div className="text-sm font-bold text-slate-800">
                Yardıma mı ihtiyacın var?
              </div>
            </div>
            <p className="text-xs text-gray-600 mb-3">
              7/24 destek ekibimiz senin için burada!
            </p>
            <button className="w-full text-xs text-blue-600 hover:text-blue-700 transition-colors duration-300 bg-white hover:bg-blue-50 py-2 px-3 rounded-lg font-medium">
              Destek ekibiyle iletişime geç →
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;