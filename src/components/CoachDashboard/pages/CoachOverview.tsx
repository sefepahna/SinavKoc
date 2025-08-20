import { FaChartBar } from 'react-icons/fa';
import CoachLeaderboard from '../components/CoachLeaderboard';

const CoachOverview = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="p-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl">
            <FaChartBar className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 animate-in slide-in-from-left-10 duration-1000">Koç Paneli - Genel Bakış</h1>
            <p className="text-gray-600 animate-in slide-in-from-left-10 duration-1000 delay-200">Öğrencilerinizin performansını takip edin ve yönetin</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6 hover:shadow-xl transition-all hover:scale-105 animate-in slide-in-from-left-10 duration-1000">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg hover:bg-blue-200 transition-all duration-300 hover:scale-110 hover:rotate-12">
              <svg className="w-6 h-6 text-blue-600 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Toplam Öğrenci</p>
              <p className="text-2xl font-semibold text-gray-900">24</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 hover:shadow-xl transition-all hover:scale-105 animate-in slide-in-from-bottom-10 duration-1000 delay-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg hover:bg-green-200 transition-all duration-300 hover:scale-110 hover:rotate-12">
              <svg className="w-6 h-6 text-green-600 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Bu Hafta Oturum</p>
              <p className="text-2xl font-semibold text-gray-900">12</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 hover:shadow-xl transition-all hover:scale-105 animate-in slide-in-from-right-10 duration-1000 delay-400">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg hover:bg-yellow-200 transition-all duration-300 hover:scale-110 hover:rotate-12">
              <svg className="w-6 h-6 text-yellow-600 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Bekleyen Görev</p>
              <p className="text-2xl font-semibold text-gray-900">8</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 hover:shadow-xl transition-all hover:scale-105 animate-in slide-in-from-top-10 duration-1000 delay-600">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg hover:bg-purple-200 transition-all duration-300 hover:scale-110 hover:rotate-12">
              <svg className="w-6 h-6 text-purple-600 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Yeni Mesaj</p>
              <p className="text-2xl font-semibold text-gray-900">5</p>
            </div>
          </div>
        </div>
      </div>

      {/* Leaderboard Section */}
      <CoachLeaderboard />
    </div>
  );
};

export default CoachOverview;
