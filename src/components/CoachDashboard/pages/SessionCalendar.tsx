import React from 'react';

const SessionCalendar = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Oturum Takvimi</h1>
        <p className="text-gray-600 mb-6">Öğrencilerinizle planlanan oturumları görüntüleyin ve yönetin.</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Bugünkü Oturumlar</h3>
            <div className="space-y-4">
              <div className="border rounded-lg p-4 bg-blue-50 border-blue-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-gray-900">Matematik - Ahmet Yılmaz</h4>
                    <p className="text-sm text-gray-600">Limit ve Süreklilik</p>
                    <p className="text-sm text-blue-600 font-medium">14:00 - 15:00</p>
                  </div>
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                    Yaklaşıyor
                  </span>
                </div>
              </div>
              
              <div className="border rounded-lg p-4 bg-green-50 border-green-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-gray-900">Fizik - Elif Kaya</h4>
                    <p className="text-sm text-gray-600">Elektrik ve Manyetizma</p>
                    <p className="text-sm text-green-600 font-medium">16:00 - 17:00</p>
                  </div>
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    Planlandı
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Bu Hafta</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Pazartesi</p>
                  <p className="text-sm text-gray-600">3 oturum</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">9:00 - 17:00</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Çarşamba</p>
                  <p className="text-sm text-gray-600">2 oturum</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">14:00 - 18:00</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Cuma</p>
                  <p className="text-sm text-gray-600">4 oturum</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">10:00 - 18:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionCalendar;
