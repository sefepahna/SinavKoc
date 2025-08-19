import React, { useState } from 'react';
import { 
  FaChartBar, 
  FaCalculator, 
  FaSave, 
  FaRobot, 
  FaLightbulb,
  FaPlus,
  FaMinus
} from 'react-icons/fa';

interface ExamResult {
  subject: string;
  correct: number;
  wrong: number;
  empty: number;
  net: number;
}

interface WeakTopic {
  subject: string;
  topics: string[];
}

const ExamAnalysis = () => {
  const [examType, setExamType] = useState('TYT');
  const [results, setResults] = useState<ExamResult[]>([
    { subject: 'Türkçe', correct: 0, wrong: 0, empty: 0, net: 0 },
    { subject: 'Matematik', correct: 0, wrong: 0, empty: 0, net: 0 },
    { subject: 'Fen', correct: 0, wrong: 0, empty: 0, net: 0 },
    { subject: 'Sosyal', correct: 0, wrong: 0, empty: 0, net: 0 }
  ]);
  
  const [aytResults, setAytResults] = useState<ExamResult[]>([
    { subject: 'Mat-2', correct: 0, wrong: 0, empty: 0, net: 0 },
    { subject: 'Fizik', correct: 0, wrong: 0, empty: 0, net: 0 },
    { subject: 'Kimya', correct: 0, wrong: 0, empty: 0, net: 0 },
    { subject: 'Biyoloji', correct: 0, wrong: 0, empty: 0, net: 0 },
    { subject: 'Edebiyat', correct: 0, wrong: 0, empty: 0, net: 0 },
    { subject: 'Tarih', correct: 0, wrong: 0, empty: 0, net: 0 },
    { subject: 'Coğrafya', correct: 0, wrong: 0, empty: 0, net: 0 },
    { subject: 'Felsefe', correct: 0, wrong: 0, empty: 0, net: 0 }
  ]);

  const [weakTopics, setWeakTopics] = useState<WeakTopic[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);

  const topicOptions = {
    'Türkçe': ['Paragraf', 'Dil Bilgisi', 'Sözcük Türleri', 'Cümle Bilgisi'],
    'Matematik': ['Polinomlar', 'Limit-Türev', 'İntegral', 'Logaritma', 'Trigonometri'],
    'Fen': ['Fotosentez', 'Solunum', 'Boşaltım', 'Dolaşım', 'Sinir Sistemi'],
    'Sosyal': ['Osmanlı Kuruluş', 'Cumhuriyet Dönemi', 'Coğrafi Konum', 'İklim'],
    'Mat-2': ['Limit', 'Türev', 'İntegral', 'Diziler', 'Seriler'],
    'Fizik': ['Hareket', 'Kuvvet', 'Enerji', 'Elektrik', 'Manyetizma'],
    'Kimya': ['Atomun Yapısı', 'Periyodik Sistem', 'Bağlar', 'Asit-Baz'],
    'Biyoloji': ['Hücre', 'Kalıtım', 'Ekoloji', 'Evrim'],
    'Edebiyat': ['Şiir', 'Roman', 'Hikaye', 'Tiyatro'],
    'Tarih': ['Osmanlı', 'Cumhuriyet', 'Dünya Tarihi'],
    'Coğrafya': ['Fiziki Coğrafya', 'Beşeri Coğrafya', 'Türkiye Coğrafyası'],
    'Felsefe': ['Mantık', 'Bilgi Felsefesi', 'Ahlak Felsefesi']
  };

  const currentResults = examType === 'TYT' ? results : aytResults;
  const setCurrentResults = examType === 'TYT' ? setResults : setAytResults;

  const updateResult = (index: number, field: 'correct' | 'wrong' | 'empty', value: number) => {
    const newResults = [...currentResults];
    newResults[index] = {
      ...newResults[index],
      [field]: Math.max(0, value),
      net: field === 'correct' ? value - newResults[index].wrong : 
           field === 'wrong' ? newResults[index].correct - value : 
           newResults[index].net
    };
    setCurrentResults(newResults);
  };

  const getTotalStats = () => {
    const total = currentResults.reduce((acc, result) => ({
      correct: acc.correct + result.correct,
      wrong: acc.wrong + result.wrong,
      empty: acc.empty + result.empty,
      net: acc.net + result.net
    }), { correct: 0, wrong: 0, empty: 0, net: 0 });

    const estimatedScore = Math.round(total.net * 4.5 + 150); // Mock calculation
    return { ...total, estimatedScore };
  };

  const addWeakTopic = (subject: string, topic: string) => {
    setWeakTopics(prev => {
      const existing = prev.find(w => w.subject === subject);
      if (existing) {
        if (!existing.topics.includes(topic)) {
          return prev.map(w => 
            w.subject === subject 
              ? { ...w, topics: [...w.topics, topic] }
              : w
          );
        }
        return prev;
      } else {
        return [...prev, { subject, topics: [topic] }];
      }
    });
  };

  const removeWeakTopic = (subject: string, topic: string) => {
    setWeakTopics(prev => 
      prev.map(w => 
        w.subject === subject 
          ? { ...w, topics: w.topics.filter(t => t !== topic) }
          : w
      ).filter(w => w.topics.length > 0)
    );
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    await new Promise(resolve => setTimeout(resolve, 1200));
    setIsAnalyzing(false);
    setShowAnalysis(true);
  };

  const totalStats = getTotalStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6 animate-in slide-in-from-top-10 duration-1000">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Deneme Analizi</h1>
        <p className="text-gray-600">Deneme sonuçlarını gir, detaylı analizini gör</p>
      </div>

      {/* Exam Type Selection */}
      <div className="bg-white rounded-2xl shadow-lg p-6 animate-in slide-in-from-left-10 duration-1000 delay-200">
        <label className="block text-sm font-medium text-gray-700 mb-3">Sınav Türü</label>
        <select
          value={examType}
          onChange={(e) => setExamType(e.target.value)}
          className="w-full md:w-auto px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
        >
          <option value="TYT">TYT (Temel Yeterlilik Testi)</option>
          <option value="AYT">AYT (Alan Yeterlilik Testi)</option>
          <option value="LGS">LGS (Liselere Geçiş Sınavı)</option>
          <option value="KPSS">KPSS (Kamu Personeli Seçme Sınavı)</option>
        </select>
      </div>

      {/* Results Input */}
      <div className="bg-white rounded-2xl shadow-lg p-6 animate-in slide-in-from-right-10 duration-1000 delay-400">
        <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center space-x-2">
          <FaCalculator className="text-blue-600" />
          <span>Sonuçları Gir</span>
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {currentResults.map((result, index) => (
            <div key={result.subject} className="space-y-4 p-4 bg-gray-50 rounded-xl">
              <h4 className="font-semibold text-slate-800 text-center">{result.subject}</h4>
              
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Doğru</label>
                  <input
                    type="number"
                    min="0"
                    value={result.correct || ''}
                    onChange={(e) => updateResult(index, 'correct', parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-center"
                    placeholder="0"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Yanlış</label>
                  <input
                    type="number"
                    min="0"
                    value={result.wrong || ''}
                    onChange={(e) => updateResult(index, 'wrong', parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-center"
                    placeholder="0"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Boş</label>
                  <input
                    type="number"
                    min="0"
                    value={result.empty || ''}
                    onChange={(e) => updateResult(index, 'empty', parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent text-center"
                    placeholder="0"
                  />
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-sm text-gray-600">Net</div>
                <div className="text-2xl font-bold text-blue-600">{result.net}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Cards */}
      {totalStats.correct > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-in slide-in-from-bottom-10 duration-1000 delay-600">
          <div className="bg-white rounded-xl shadow-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{totalStats.correct}</div>
            <div className="text-sm text-gray-600">Toplam Doğru</div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{totalStats.wrong}</div>
            <div className="text-sm text-gray-600">Toplam Yanlış</div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{totalStats.net}</div>
            <div className="text-sm text-gray-600">Toplam Net</div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{totalStats.estimatedScore}</div>
            <div className="text-sm text-gray-600">Tahmini Puan</div>
          </div>
        </div>
      )}

      {/* Weak Topics Selection */}
      {totalStats.correct > 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-6 animate-in slide-in-from-left-10 duration-1000 delay-800">
          <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center space-x-2">
            <FaLightbulb className="text-yellow-600" />
            <span>Eksik Konu Seç</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentResults.map((result) => (
              <div key={result.subject} className="space-y-3">
                <h4 className="font-semibold text-gray-700">{result.subject}</h4>
                
                <select
                  onChange={(e) => {
                    if (e.target.value) {
                      addWeakTopic(result.subject, e.target.value);
                      e.target.value = '';
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Zorlandığın konuyu seç...</option>
                  {topicOptions[result.subject as keyof typeof topicOptions]?.map((topic) => (
                    <option key={topic} value={topic}>{topic}</option>
                  ))}
                </select>

                <div className="flex flex-wrap gap-2">
                  {weakTopics.find(w => w.subject === result.subject)?.topics.map((topic) => (
                    <span
                      key={topic}
                      className="inline-flex items-center space-x-1 bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm"
                    >
                      <span>{topic}</span>
                      <button
                        onClick={() => removeWeakTopic(result.subject, topic)}
                        className="text-red-600 hover:text-red-800 transition-colors duration-300"
                      >
                        <FaMinus size={10} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Analysis Button */}
      {totalStats.correct > 0 && (
        <div className="text-center animate-in slide-in-from-bottom-10 duration-1000 delay-1000">
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg flex items-center space-x-2 mx-auto"
          >
            {isAnalyzing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Analiz Ediliyor...</span>
              </>
            ) : (
              <>
                <FaChartBar size={20} />
                <span>Detaylı Analiz Yap</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Analysis Results */}
      {showAnalysis && (
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200 animate-in slide-in-from-bottom-10 duration-1000">
          <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center space-x-2">
            <FaRobot className="text-blue-600" />
            <span>AI Analiz Sonucu</span>
          </h3>

          {weakTopics.length > 0 && (
            <div className="mb-6">
              <h4 className="font-semibold text-gray-700 mb-3">Zorlandığın Konular:</h4>
              <div className="space-y-2">
                {weakTopics.map((weak) => (
                  <div key={weak.subject} className="flex items-center space-x-2">
                    <span className="font-medium text-gray-600">{weak.subject}:</span>
                    <div className="flex flex-wrap gap-1">
                      {weak.topics.map((topic) => (
                        <span key={topic} className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-white rounded-xl p-4 mb-4">
            <h4 className="font-semibold text-gray-700 mb-2">🤖 AI Önerisi:</h4>
            <p className="text-gray-600 leading-relaxed">
              Analiz sonuçlarına göre, gelecek hafta <strong>Matematik</strong> ve <strong>Fen</strong> konularına 
              daha fazla odaklanmanı öneriyoruz. Özellikle seçtiğin eksik konularda günde en az 2 saat çalışma yapman 
              performansını %15-20 artırabilir.
            </p>
          </div>

          <button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 flex items-center space-x-2">
            <FaRobot size={16} />
            <span>Çalışma Planını Güncelle (AI)</span>
          </button>
        </div>
      )}

      {/* Empty State */}
      {totalStats.correct === 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center animate-in slide-in-from-bottom-10 duration-1000">
          <FaChartBar className="mx-auto text-gray-300 mb-4" size={64} />
          <h3 className="text-xl font-bold text-gray-600 mb-2">Henüz deneme sonucu yok</h3>
          <p className="text-gray-500 mb-6">
            İlk deneme sonucunu girerek detaylı analizine ulaşabilirsin. 
            AI destekli öneriler ile eksik konularını belirle ve çalışma planını optimize et.
          </p>
          <div className="text-sm text-blue-600 bg-blue-50 rounded-lg p-4 max-w-md mx-auto">
            💡 <strong>İpucu:</strong> Düzenli deneme çözümü ve analizi, YKS başarının için kritik öneme sahip!
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamAnalysis;