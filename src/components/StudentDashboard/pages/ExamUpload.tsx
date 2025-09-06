import React, { useState } from 'react';
import { 
  FaUpload, 
  FaCamera, 
  FaFileImage, 
  FaRobot, 
  FaChartBar,
  FaCheckCircle,
  FaSpinner,
  FaEye,
  FaDownload
} from 'react-icons/fa';

interface UploadedExam {
  id: string;
  name: string;
  type: 'TYT' | 'AYT';
  uploadDate: string;
  status: 'Analiz Ediliyor' | 'Tamamlandı' | 'Hata';
  analysisUrl?: string;
}

const ExamUpload = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [examType, setExamType] = useState<'TYT' | 'AYT'>('TYT');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedExams, setUploadedExams] = useState<UploadedExam[]>([
    {
      id: '1',
      name: 'TYT Deneme - Ocak 2024',
      type: 'TYT',
      uploadDate: '2024-01-15',
      status: 'Tamamlandı',
      analysisUrl: '#'
    },
    {
      id: '2',
      name: 'AYT Matematik - Aralık 2023',
      type: 'AYT',
      uploadDate: '2024-01-10',
      status: 'Tamamlandı',
      analysisUrl: '#'
    }
  ]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = (files: File[]) => {
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    setUploadedFiles(prev => [...prev, ...imageFiles]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (uploadedFiles.length === 0) return;
    
    setIsUploading(true);
    
    // Simulate upload and AI analysis
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const newExam: UploadedExam = {
      id: Date.now().toString(),
      name: `${examType} Deneme - ${new Date().toLocaleDateString('tr-TR')}`,
      type: examType,
      uploadDate: new Date().toISOString().split('T')[0],
      status: 'Analiz Ediliyor'
    };
    
    setUploadedExams(prev => [newExam, ...prev]);
    setUploadedFiles([]);
    setIsUploading(false);
    
    // Simulate analysis completion
    setTimeout(() => {
      setUploadedExams(prev => prev.map(exam => 
        exam.id === newExam.id 
          ? { ...exam, status: 'Tamamlandı', analysisUrl: '#' }
          : exam
      ));
    }, 5000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Analiz Ediliyor':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Tamamlandı':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Hata':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl p-6 text-white">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
            <FaUpload size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">Deneme Sınavı Yükle</h1>
            <p className="text-blue-100 text-lg">AI destekli analiz için deneme sonuçlarını yükle</p>
          </div>
        </div>
      </div>

      {/* Upload Section */}
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">Sınav Türü</label>
          <div className="flex space-x-4">
            <button
              onClick={() => setExamType('TYT')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                examType === 'TYT'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              TYT
            </button>
            <button
              onClick={() => setExamType('AYT')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                examType === 'AYT'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              AYT
            </button>
          </div>
        </div>

        {/* Drag & Drop Area */}
        <div
          className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
            dragActive
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          
          <div className="space-y-4">
            <div className="flex justify-center space-x-4">
              <div className="p-4 bg-blue-100 rounded-full">
                <FaCamera className="text-blue-600" size={32} />
              </div>
              <div className="p-4 bg-green-100 rounded-full">
                <FaFileImage className="text-green-600" size={32} />
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Deneme Fotoğraflarını Yükle
              </h3>
              <p className="text-gray-600">
                Deneme kağıdının fotoğrafını çek veya dosyalarını sürükle bırak
              </p>
            </div>
            
            <div className="text-sm text-gray-500">
              JPG, PNG, HEIC formatları desteklenir • Maksimum 10 MB
            </div>
          </div>
        </div>

        {/* Uploaded Files Preview */}
        {uploadedFiles.length > 0 && (
          <div className="mt-6">
            <h4 className="font-semibold text-gray-800 mb-4">Yüklenen Dosyalar ({uploadedFiles.length})</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {uploadedFiles.map((file, index) => (
                <div key={index} className="relative group">
                  <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Upload ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    onClick={() => removeFile(index)}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    ×
                  </button>
                  <div className="mt-2 text-xs text-gray-600 truncate">
                    {file.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upload Button */}
        {uploadedFiles.length > 0 && (
          <div className="mt-6 text-center">
            <button
              onClick={handleUpload}
              disabled={isUploading}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 flex items-center space-x-3 mx-auto"
            >
              {isUploading ? (
                <>
                  <FaSpinner className="animate-spin" size={20} />
                  <span>AI Analiz Ediyor...</span>
                </>
              ) : (
                <>
                  <FaRobot size={20} />
                  <span>AI Analizi Başlat</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Previous Uploads */}
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <h3 className="text-xl font-bold text-slate-800 mb-6">Geçmiş Analizler</h3>
        
        {uploadedExams.length > 0 ? (
          <div className="space-y-4">
            {uploadedExams.map((exam, index) => (
              <div
                key={exam.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <FaChartBar className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800">{exam.name}</h4>
                    <div className="flex items-center space-x-3 text-sm text-gray-600">
                      <span>{new Date(exam.uploadDate).toLocaleDateString('tr-TR')}</span>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(exam.status)}`}>
                        {exam.status === 'Analiz Ediliyor' && <FaSpinner className="animate-spin mr-1" size={10} />}
                        {exam.status === 'Tamamlandı' && <FaCheckCircle className="mr-1" size={10} />}
                        {exam.status}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {exam.status === 'Tamamlandı' && (
                    <>
                      <button
                        onClick={() => alert('Analiz raporu görüntüleniyor...')}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300"
                        title="Analizi Görüntüle"
                      >
                        <FaEye size={16} />
                      </button>
                      <button
                        onClick={() => alert('Rapor indiriliyor...')}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-all duration-300"
                        title="Raporu İndir"
                      >
                        <FaDownload size={16} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <FaChartBar className="mx-auto text-gray-300 mb-4" size={48} />
            <p className="text-gray-500">Henüz deneme analizi yok</p>
          </div>
        )}
      </div>

      {/* AI Analysis Info */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-200">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-purple-600 rounded-xl">
            <FaRobot className="text-white" size={24} />
          </div>
          <div>
            <h4 className="font-bold text-slate-800 mb-2">🤖 AI Analiz Süreci</h4>
            <div className="space-y-2 text-sm text-gray-700">
              <p>• Yanlış ve boş sorular otomatik tespit edilir</p>
              <p>• Eksik konular belirlenir ve kişisel soru havuzuna eklenir</p>
              <p>• Koçunla paylaşılır ve detaylı analiz raporu hazırlanır</p>
              <p>• Çalışma planın otomatik güncellenir</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamUpload;