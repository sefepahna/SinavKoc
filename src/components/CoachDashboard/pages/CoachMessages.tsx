import React from 'react';

const CoachMessages = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Mesajlar</h1>
        <p className="text-gray-600 mb-6">Öğrencilerinizle iletişim kurun ve mesajlarınızı yönetin.</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sohbetler</h3>
            <div className="space-y-2">
              <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer border-blue-200 bg-blue-50">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-semibold">
                    AY
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">Ahmet Yılmaz</p>
                    <p className="text-xs text-gray-500 truncate">Matematik soruları hakkında...</p>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      2
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-sm font-semibold">
                    EK
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">Elif Kaya</p>
                    <p className="text-xs text-gray-500 truncate">Fizik dersinde zorlanıyorum</p>
                  </div>
                </div>
              </div>
              
              <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-500 flex items-center justify-center text-white text-sm font-semibold">
                    MÖ
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">Mehmet Özkan</p>
                    <p className="text-xs text-gray-500 truncate">Yarınki sınav için hazırlık</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <div className="border rounded-lg h-96 flex flex-col">
              <div className="p-4 border-b bg-gray-50">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-semibold">
                    AY
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Ahmet Yılmaz</p>
                    <p className="text-xs text-gray-500">Çevrimiçi</p>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                <div className="flex justify-end">
                  <div className="bg-blue-500 text-white p-3 rounded-lg max-w-xs">
                    <p className="text-sm">Merhaba Ahmet, bugünkü dersimizde limit konusunu işleyeceğiz.</p>
                    <p className="text-xs opacity-75 mt-1">14:30</p>
                  </div>
                </div>
                
                <div className="flex justify-start">
                  <div className="bg-gray-200 text-gray-900 p-3 rounded-lg max-w-xs">
                    <p className="text-sm">Merhaba hocam, limit sorularında hala zorlanıyorum. Özellikle belirsizlik durumlarında.</p>
                    <p className="text-xs text-gray-500 mt-1">14:32</p>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <div className="bg-blue-500 text-white p-3 rounded-lg max-w-xs">
                    <p className="text-sm">Sorun değil, bugün özellikle belirsizlik durumlarına odaklanacağız. Hazır olduğunda bana haber ver.</p>
                    <p className="text-xs opacity-75 mt-1">14:35</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border-t">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Mesajınızı yazın..."
                    className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                  />
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600">
                    Gönder
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachMessages;
