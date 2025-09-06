import React, { useState } from 'react';
import { 
  FaVideo, 
  FaFileAlt, 
  FaDownload, 
  FaPlay, 
  FaRobot,
  FaSearch,
  FaClock,
  FaUser,
  FaEdit,
  FaEye
} from 'react-icons/fa';

interface SessionRecord {
  id: string;
  studentName: string;
  date: string;
  time: string;
  duration: string;
  subject: string;
  hasTranscript: boolean;
  hasHighlights: boolean;
  transcriptUrl?: string;
  highlightsUrl?: string;
  keyTopics: string[];
  status: 'İşleniyor' | 'Hazır';
}

const SessionTranscripts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('Tümü');
  
  const [sessions] = useState<SessionRecord[]>([
    {
      id: '1',
      studentName: 'Ahmet Yılmaz',
      date: '2024-01-15',
      time: '14:00',
      duration: '60 dk',
      subject: 'Matematik',
      hasTranscript: true,
      hasHighlights: true,
      transcriptUrl: '#',
      highlightsUrl: '#',
      keyTopics: ['Polinomlar', 'Limit', 'Türev'],
      status: 'Hazır'
    },
    {
      id: '2',
      studentName: 'Elif Kaya',
      date: '2024-01-14',
      time: '16:00',
      duration: '45 dk',
      subject: 'Türkçe',
      hasTranscript: true,
      hasHighlights: false,
      transcriptUrl: '#',
      keyTopics: ['Paragraf', 'Dil Bilgisi'],
      status: 'İşleniyor'
    },
    {
      id: '3',
      studentName: 'Mehmet Özkan',
      date: '2024-01-13',
      time: '15:30',
      duration: '90 dk',
      subject: 'Fizik',
      hasTranscript: true,
      hasHighlights: true,
      transcriptUrl: '#',
      highlightsUrl: '#',
      keyTopics: ['Hareket', 'Kuvvet', 'Enerji'],
      status: 'Hazır'
    }
  ]);

  const students = ['Tümü', ...Array.from(new Set(sessions.map(s => s.studentName)))];

  const filteredSessions = sessions.filter(session => {
    const matchesSearch = session.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         session.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         session.keyTopics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStudent = selectedStudent === 'Tümü' || session.studentName === selectedStudent;
    return matchesSearch && matchesStudent;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'İşleniyor':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Hazır':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-6 text-white">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
            <FaVideo size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">Oturum Kayıtları</h1>
            <p className="text-blue-100 text-lg">AI destekli transkript ve önemli anlar</p>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Öğrenci, ders veya konu ara..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {students.map(student => (
              <option key={student} value={student}>{student}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Sessions List */}
      <div className="bg-white rounded-2xl shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-slate-800">
            Oturum Kayıtları ({filteredSessions.length})
          </h3>
        </div>

        {filteredSessions.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {filteredSessions.map((session, index) => (
              <div
                key={session.id}
                className="p-6 hover:bg-gray-50 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-bold text-slate-800 text-lg">{session.studentName}</h4>
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        {session.subject}
                      </span>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(session.status)}`}>
                        {session.status === 'İşleniyor' && <div className="animate-spin rounded-full h-3 w-3 border-b border-current mr-1"></div>}
                        {session.status}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                      <span>{formatDate(session.date)}</span>
                      <span>{session.time}</span>
                      <span>{session.duration}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {session.keyTopics.map((topic, idx) => (
                        <span
                          key={idx}
                          className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  {session.hasTranscript && (
                    <button
                      onClick={() => alert('Transkript görüntüleniyor...')}
                      className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                    >
                      <FaFileAlt size={16} />
                      <span>Transkript</span>
                    </button>
                  )}
                  
                  {session.hasHighlights && (
                    <button
                      onClick={() => alert('Önemli anlar videosu oynatılıyor...')}
                      className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                    >
                      <FaPlay size={16} />
                      <span>Önemli Anlar</span>
                    </button>
                  )}
                  
                  <button
                    onClick={() => alert('Tam kayıt oynatılıyor...')}
                    className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                  >
                    <FaVideo size={16} />
                    <span>Tam Kayıt</span>
                  </button>
                  
                  <button
                    onClick={() => alert('Oturum raporu indiriliyor...')}
                    className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                  >
                    <FaDownload size={16} />
                    <span>Rapor</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <FaVideo className="mx-auto text-gray-300 mb-4" size={64} />
            <h3 className="text-xl font-bold text-gray-600 mb-2">Kayıt bulunamadı</h3>
            <p className="text-gray-500">
              Arama kriterlerinize uygun oturum kaydı bulunamadı.
            </p>
          </div>
        )}
      </div>

      {/* AI Processing Info */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6 border border-blue-200">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-blue-600 rounded-xl">
            <FaRobot className="text-white" size={24} />
          </div>
          <div>
            <h4 className="font-bold text-slate-800 mb-2">🤖 AI Oturum İşleme Süreci</h4>
            <div className="space-y-2 text-sm text-gray-700">
              <p>• Oturum biter bitmez otomatik transkript oluşturulur</p>
              <p>• AI en önemli kısımları tespit eder ve kısa videolar hazırlar</p>
              <p>• Anahtar konular ve öğrenme noktaları belirlenir</p>
              <p>• Öğrenci ve veli için özet rapor hazırlanır</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionTranscripts;