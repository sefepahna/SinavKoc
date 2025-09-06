import React, { useState } from 'react';
import { 
  FaUsers, 
  FaCalendarWeek, 
  FaChartBar, 
  FaEnvelope, 
  FaDownload,
  FaEye,
  FaEdit,
  FaPaperPlane,
  FaRobot,
  FaClock
} from 'react-icons/fa';

interface ParentReport {
  id: string;
  studentName: string;
  parentEmail: string;
  weekOf: string;
  status: 'Hazırlanıyor' | 'Gönderildi' | 'Okundu';
  studyHours: number;
  completedTasks: number;
  examScores: number[];
  improvements: string[];
  recommendations: string[];
}

const ParentReports = () => {
  const [selectedWeek, setSelectedWeek] = useState('2024-01-15');
  const [isGenerating, setIsGenerating] = useState(false);
  
  const [reports, setReports] = useState<ParentReport[]>([
    {
      id: '1',
      studentName: 'Ahmet Yılmaz',
      parentEmail: 'ahmet.baba@email.com',
      weekOf: '2024-01-15',
      status: 'Gönderildi',
      studyHours: 28,
      completedTasks: 12,
      examScores: [385, 392, 378],
      improvements: ['Matematik netinde +5 artış', 'Düzenli çalışma alışkanlığı kazandı'],
      recommendations: ['Fizik konularına daha fazla odaklanmalı', 'Deneme sıklığını artırmalı']
    },
    {
      id: '2',
      studentName: 'Elif Kaya',
      parentEmail: 'elif.anne@email.com',
      weekOf: '2024-01-15',
      status: 'Okundu',
      studyHours: 32,
      completedTasks: 15,
      examScores: [372, 368, 385],
      improvements: ['Türkçe paragraf başarısında artış', 'Motivasyon seviyesi yükseldi'],
      recommendations: ['Matematik temel konuları tekrar etmeli', 'Grup çalışmalarına katılmalı']
    },
    {
      id: '3',
      studentName: 'Mehmet Özkan',
      parentEmail: 'mehmet.veli@email.com',
      weekOf: '2024-01-08',
      status: 'Hazırlanıyor',
      studyHours: 24,
      completedTasks: 8,
      examScores: [358, 365],
      improvements: ['Çalışma disiplini gelişti'],
      recommendations: ['Daha fazla deneme çözmeli', 'Zaman yönetimi konusunda destek almalı']
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Hazırlanıyor':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Gönderildi':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Okundu':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const generateWeeklyReports = async () => {
    setIsGenerating(true);
    
    // Simulate AI report generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Update all reports to "Gönderildi" status
    setReports(prev => prev.map(report => ({
      ...report,
      status: 'Gönderildi' as const
    })));
    
    setIsGenerating(false);
    alert('Haftalık veli raporları başarıyla oluşturuldu ve gönderildi! 📧');
  };

  const previewReport = (report: ParentReport) => {
    alert(`"${report.studentName}" için veli raporu önizleniyor...`);
  };

  const editReport = (report: ParentReport) => {
    alert(`"${report.studentName}" için rapor düzenleme sayfası açılıyor...`);
  };

  const sendReport = (report: ParentReport) => {
    setReports(prev => prev.map(r => 
      r.id === report.id 
        ? { ...r, status: 'Gönderildi' as const }
        : r
    ));
    alert(`"${report.studentName}" için veli raporu gönderildi! 📧`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getWeekRange = (dateString: string) => {
    const date = new Date(dateString);
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay() + 1);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    
    return `${startOfWeek.getDate()}-${endOfWeek.getDate()} ${endOfWeek.toLocaleDateString('tr-TR', { month: 'long' })}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
              <FaUsers size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">Veli Raporları</h1>
              <p className="text-indigo-100 text-lg">Haftalık performans raporları</p>
            </div>
          </div>
          
          <button
            onClick={generateWeeklyReports}
            disabled={isGenerating}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 flex items-center space-x-2"
          >
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Oluşturuluyor...</span>
              </>
            ) : (
              <>
                <FaRobot size={16} />
                <span>AI ile Raporları Oluştur</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Week Selection */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center space-x-4">
          <FaCalendarWeek className="text-blue-600" size={24} />
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Rapor Haftası</label>
            <input
              type="date"
              value={selectedWeek}
              onChange={(e) => setSelectedWeek(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600">Seçilen Hafta</div>
            <div className="font-bold text-slate-800">{getWeekRange(selectedWeek)}</div>
          </div>
        </div>
      </div>

      {/* Reports List */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-slate-800 mb-6">Haftalık Raporlar</h3>
        
        {reports.length > 0 ? (
          <div className="space-y-4">
            {reports.map((report, index) => (
              <div
                key={report.id}
                className="bg-gray-50 hover:bg-gray-100 rounded-xl p-6 transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-bold text-slate-800 text-lg">{report.studentName}</h4>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(report.status)}`}>
                        {report.status}
                      </span>
                    </div>
                    
                    <div className="text-sm text-gray-600 mb-3">
                      <span className="font-medium">Veli:</span> {report.parentEmail}
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="bg-white rounded-lg p-3 text-center">
                        <div className="font-bold text-blue-600 text-lg">{report.studyHours}h</div>
                        <div className="text-gray-600">Çalışma</div>
                      </div>
                      <div className="bg-white rounded-lg p-3 text-center">
                        <div className="font-bold text-green-600 text-lg">{report.completedTasks}</div>
                        <div className="text-gray-600">Görev</div>
                      </div>
                      <div className="bg-white rounded-lg p-3 text-center">
                        <div className="font-bold text-purple-600 text-lg">{report.examScores.length}</div>
                        <div className="text-gray-600">Deneme</div>
                      </div>
                      <div className="bg-white rounded-lg p-3 text-center">
                        <div className="font-bold text-orange-600 text-lg">
                          {report.examScores.length > 0 ? Math.max(...report.examScores) : 0}
                        </div>
                        <div className="text-gray-600">En Yüksek</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => previewReport(report)}
                    className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                  >
                    <FaEye size={16} />
                    <span>Önizle</span>
                  </button>
                  
                  <button
                    onClick={() => editReport(report)}
                    className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                  >
                    <FaEdit size={16} />
                    <span>Düzenle</span>
                  </button>
                  
                  {report.status === 'Hazırlanıyor' && (
                    <button
                      onClick={() => sendReport(report)}
                      className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                    >
                      <FaPaperPlane size={16} />
                      <span>Gönder</span>
                    </button>
                  )}
                  
                  <button
                    onClick={() => alert('Rapor PDF olarak indiriliyor...')}
                    className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                  >
                    <FaDownload size={16} />
                    <span>İndir</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <FaChartBar className="mx-auto text-gray-300 mb-4" size={64} />
            <h4 className="text-xl font-bold text-gray-600 mb-2">Henüz rapor yok</h4>
            <p className="text-gray-500">
              Seçilen hafta için henüz veli raporu oluşturulmamış.
            </p>
          </div>
        )}
      </div>

      {/* Report Template Info */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-blue-600 rounded-xl">
            <FaRobot className="text-white" size={24} />
          </div>
          <div>
            <h4 className="font-bold text-slate-800 mb-2">🤖 AI Destekli Rapor İçeriği</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
              <div className="space-y-2">
                <p>• Haftalık çalışma saatleri ve analizi</p>
                <p>• Tamamlanan görevler ve başarı oranı</p>
                <p>• Deneme sınav sonuçları ve trend analizi</p>
                <p>• Güçlü ve zayıf yönlerin değerlendirmesi</p>
              </div>
              <div className="space-y-2">
                <p>• Koç gözlemleri ve önerileri</p>
                <p>• Gelecek hafta için hedefler</p>
                <p>• Veli için özel tavsiyeler</p>
                <p>• Motivasyon ve destek önerileri</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-600 mb-1">
            {reports.filter(r => r.status === 'Gönderildi').length}
          </div>
          <div className="text-sm text-gray-600">Bu Hafta Gönderilen</div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-600 mb-1">
            {reports.filter(r => r.status === 'Okundu').length}
          </div>
          <div className="text-sm text-gray-600">Okunan Raporlar</div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-4 text-center">
          <div className="text-2xl font-bold text-orange-600 mb-1">
            {Math.round(reports.reduce((sum, r) => sum + r.studyHours, 0) / reports.length)}h
          </div>
          <div className="text-sm text-gray-600">Ortalama Çalışma</div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-4 text-center">
          <div className="text-2xl font-bold text-purple-600 mb-1">
            {reports.reduce((sum, r) => sum + r.completedTasks, 0)}
          </div>
          <div className="text-sm text-gray-600">Toplam Görev</div>
        </div>
      </div>
    </div>
  );
};

export default ParentReports;