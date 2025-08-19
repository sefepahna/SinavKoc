import React, { useState } from 'react';
import { 
  FaChartBar, 
  FaCalculator, 
  FaSave, 
  FaRobot, 
  FaLightbulb,
  FaPlus,
  FaMinus,
  FaUpload,
  FaArrowUp,
  FaBullseye
} from 'react-icons/fa';

interface ExamResult {
  subject: string;
  correct: number;
  wrong: number;
  empty: number;
  net: number;
  totalQuestions: number;
}

interface WeakTopic {
  subject: string;
  topics: string[];
}

const ExamAnalysis = () => {
  const [examType, setExamType] = useState('TYT');
  const [examDate, setExamDate] = useState('');
  const [results, setResults] = useState<ExamResult[]>([
    { subject: 'Türkçe', correct: 0, wrong: 0, empty: 0, net: 0, totalQuestions: 40 },
    { subject: 'Matematik', correct: 0, wrong: 0, empty: 0, net: 0, totalQuestions: 40 },
    { subject: 'Fen', correct: 0, wrong: 0, empty: 0, net: 0, totalQuestions: 20 },
    { subject: 'Sosyal', correct: 0, wrong: 0, empty: 0, net: 0, totalQuestions: 20 }
  ]);
  
  const [aytResults, setAytResults] = useState<ExamResult[]>([
    { subject: 'Mat-2', correct: 0, wrong: 0, empty: 0, net: 0, totalQuestions: 30 },
    { subject: 'Fizik', correct: 0, wrong: 0, empty: 0, net: 0, totalQuestions: 14 },
    { subject: 'Kimya', correct: 0, wrong: 0, empty: 0, net: 0, totalQuestions: 13 },
    { subject: 'Biyoloji', correct: 0, wrong: 0, empty: 0, net: 0, totalQuestions: 13 }
  ]);

  const [weakTopics, setWeakTopics] = useState<WeakTopic[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [previousResults, setPreviousResults] = useState<ExamResult[]>([
    { subject: 'Türkçe', correct: 28, wrong: 8, empty: 4, net: 26, totalQuestions: 40 },
    { subject: 'Matematik', correct: 22, wrong: 12, empty: 6, net: 16, totalQuestions: 40 },
    { subject: 'Fen', correct: 14, wrong: 4, empty: 2, net: 12, totalQuestions: 20 },
    { subject: 'Sosyal', correct: 16, wrong: 3, empty: 1, net: 14.5, totalQuestions: 20 }
  ]);

  const topicOptions = {
    'Türkçe': ['Paragraf', 'Dil Bilgisi', 'Sözcük Türleri', 'Cümle Bilgisi'],
    'Matematik': ['Polinomlar', 'Limit-Türev', 'İntegral', 'Logaritma', 'Trigonometri'],
    'Fen': ['Fotosentez', 'Solunum', 'Boşaltım', 'Dolaşım', 'Sinir Sistemi'],
    'Sosyal': ['Osmanlı Kuruluş', 'Cumhuriyet Dönemi', 'Coğrafi Konum', 'İklim'],
    'Mat-2': ['Limit', 'Türev', 'İntegral', 'Diziler', 'Seriler'],
    'Fizik': ['Hareket', 'Kuvvet', 'Enerji', 'Elektrik', 'Manyetizma'],
    'Kimya': ['Atomun Yapısı', 'Periyodik Sistem', 'Bağlar', 'Asit-Baz'],
    'Biyoloji': ['Hücre', 'Kalıtım', 'Ekoloji', 'Evrim']
  };

  const currentResults = examType === 'TYT' ? results : aytResults;
  const setCurrentResults = examType === 'TYT' ? setResults : setAytResults;

  const updateResult = (index: number, field: 'correct' | 'wrong' | 'empty', value: number) => {
    const newResults = [...currentResults];
    const maxValue = newResults[index].totalQuestions;
    const clampedValue = Math.max(0, Math.min(value, maxValue));
    
    newResults[index] = {
      ...newResults[index],
      [field]: clampedValue,
      net: field === 'correct' ? clampedValue - newResults[index].wrong * 0.25 : 
           field === 'wrong' ? newResults[index].correct - clampedValue * 0.25 : 
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

    const estimatedScore = Math.round(total.net * 4.5 + 150);
    return { ...total, estimatedScore };
  };

  const getSubjectComparison = (subject: string) => {
    const current = currentResults.find(r => r.subject === subject);
    const previous = previousResults.find(r => r.subject === subject);
    
    if (!current || !previous) return null;
    
    const improvement = current.net - previous.net;
    return {
      improvement,
      percentage: previous.net > 0 ? Math.round((improvement / previous.net) * 100) : 0
    };
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
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-6 text-white animate-in slide-in-from-top-10 duration-1000">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
            <FaChartBar size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">Deneme Analizi</h1>
            <p className="text-blue-100 text-lg">AI destekli performans değerlendirmesi</p>
          </div>
        </div>
      </div>

      {/* Exam Configuration */}
      <div className="bg-white rounded-2xl shadow-xl p-6 animate-in slide-in-from-left-10 duration-1000 delay-200 border border-gray-100">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Sınav Bilgileri</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sınav Türü</label>
            <select
              value={examType}
              onChange={(e) => setExamType(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            >
              <option value="TYT">TYT (Temel Yeterlilik Testi)</option>
              <option value="AYT">AYT (Alan Yeterlilik Testi)</option>
              <option value="LGS">LGS (Liselere Geçiş Sınavı)</option>
              <option value="KPSS">KPSS (Kamu Personeli Seçme Sınavı)</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sınav Tarihi</label>
            <input
              type="date"
              value={examDate}
              onChange={(e) => setExamDate(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            />
          </div>
        </div>
      </div>

      {/* Enhanced Results Input */}
      <div className="bg-white rounded-2xl shadow-xl p-6 animate-in slide-in-from-right-10 duration-1000 delay-400 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl">
              <FaCalculator className="text-white" size={20} />
            </div>
            <h3 className="text-xl font-bold text-slate-800">Sonuçları Gir</h3>
          </div>
          
          <button className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105">
            <FaUpload size={16} />
            <span>Fotoğraf Yükle</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {currentResults.map((result, index) => {
            const comparison = getSubjectComparison(result.subject);
            const accuracy = result.correct > 0 ? Math.round((result.correct / (result.correct + result.wrong)) * 100) : 0;
            
            return (
              <div key={result.subject} className="space-y-4 p-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl border border-gray-200">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-bold text-slate-800">{result.subject}</h4>
                  <div className="text-xs text-gray-600">
                    {result.totalQuestions} soru
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-2">
                    <label className="block text-xs font-medium text-green-700">Doğru</label>
                    <input
                      type="number"
                      min="0"
                      max={result.totalQuestions}
                      value={result.correct || ''}
                      onChange={(e) => updateResult(index, 'correct', parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-center font-bold text-lg"
                      placeholder="0"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-xs font-medium text-red-700">Yanlış</label>
                    <input
                      type="number"
                      min="0"
                      max={result.totalQuestions}
                      value={result.wrong || ''}
                      onChange={(e) => updateResult(index, 'wrong', parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-center font-bold text-lg"
                      placeholder="0"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-xs font-medium text-gray-700">Boş</label>
                    <input
                      type="number"
                      min="0"
                      max={result.totalQuestions}
                      value={result.empty || ''}
                      onChange={(e) => updateResult(index, 'empty', parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent text-center font-bold text-lg"
                      placeholder="0"
                    />
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-4 border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">Net Puan</span>
                    {comparison && (
                      <div className={`flex items-center space-x-1 text-xs font-bold ${
                        comparison.improvement >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        <FaArrowUp size={10} className={comparison.improvement < 0 ? 'rotate-180' : ''} />
                        <span>{comparison.improvement >= 0 ? '+' : ''}{comparison.improvement.toFixed(1)}</span>
                      </div>
                    )}
                  </div>
                  <div className="text-3xl font-bold text-blue-600 mb-1">{result.net.toFixed(1)}</div>
                  {accuracy > 0 && (
                    <div className="text-sm text-gray-600">
                      Doğruluk: %{accuracy}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Enhanced Summary Cards */}
      {totalStats.correct > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-in slide-in-from-bottom-10 duration-1000 delay-600">
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-xl p-6 text-white text-center transform hover:scale-105 transition-all duration-300">
            <div className="text-3xl font-bold mb-2">{totalStats.correct}</div>
            <div className="text-sm text-green-100">Toplam Doğru</div>
          </div>
          
          <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl shadow-xl p-6 text-white text-center transform hover:scale-105 transition-all duration-300">
            <div className="text-3xl font-bold mb-2">{totalStats.wrong}</div>
            <div className="text-sm text-red-100">Toplam Yanlış</div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-xl p-6 text-white text-center transform hover:scale-105 transition-all duration-300">
            <div className="text-3xl font-bold mb-2">{totalStats.net.toFixed(1)}</div>
            <div className="text-sm text-blue-100">Toplam Net</div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-xl p-6 text-white text-center transform hover:scale-105 transition-all duration-300">
            <div className="text-3xl font-bold mb-2">{totalStats.estimatedScore}</div>
            <div className="text-sm text-purple-100">Tahmini Puan</div>
          </div>
        </div>
      )}

      {/* Enhanced Weak Topics Selection */}
      {totalStats.correct > 0 && (
        <div className="bg-white rounded-2xl shadow-xl p-6 animate-in slide-in-from-left-10 duration-1000 delay-800 border border-gray-100">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl">
              <FaLightbulb className="text-white" size={20} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800">Eksik Konuları Belirle</h3>
              <p className="text-sm text-gray-600">Hangi konularda zorlandığını seç</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentResults.map((result) => (
              <div key={result.subject} className="space-y-4 p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-gray-700">{result.subject}</h4>
                  <div className="text-xs text-gray-600">
                    Net: {result.net.toFixed(1)}
                  </div>
                </div>
                
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
                      className="inline-flex items-center space-x-2 bg-red-100 text-red-800 px-3 py-2 rounded-full text-sm font-medium"
                    >
                      <span>{topic}</span>
                      <button
                        onClick={() => removeWeakTopic(result.subject, topic)}
                        className="text-red-600 hover:text-red-800 transition-colors duration-300 hover:scale-110"
                      >
                        <FaMinus size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Enhanced Analysis Button */}
      {totalStats.correct > 0 && (
        <div className="text-center animate-in slide-in-from-bottom-10 duration-1000 delay-1000">
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 shadow-2xl flex items-center space-x-3 mx-auto"
          >
            {isAnalyzing ? (
              <>
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                <span>AI Analiz Ediyor...</span>
              </>
            ) : (
              <>
                <FaRobot size={24} />
                <span>Detaylı AI Analizi Yap</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Enhanced Analysis Results */}
      {showAnalysis && (
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border-2 border-blue-200 animate-in slide-in-from-bottom-10 duration-1000 shadow-xl">
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
              <FaRobot className="text-white" size={24} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-800">AI Analiz Raporu</h3>
              <p className="text-gray-600">Kişiselleştirilmiş öneriler ve stratejiler</p>
            </div>
          </div>

          {/* Performance Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 text-center shadow-lg">
              <FaBullseye className="text-blue-600 mx-auto mb-3" size={32} />
              <div className="text-2xl font-bold text-slate-800 mb-1">{totalStats.estimatedScore}</div>
              <div className="text-sm text-gray-600">Tahmini YKS Puanı</div>
            </div>
            
            <div className="bg-white rounded-xl p-6 text-center shadow-lg">
              <FaArrowUp className="text-green-600 mx-auto mb-3" size={32} />
              <div className="text-2xl font-bold text-slate-800 mb-1">+15</div>
              <div className="text-sm text-gray-600">Net Artış (Önceki Deneme)</div>
            </div>
            
            <div className="bg-white rounded-xl p-6 text-center shadow-lg">
              <FaLightbulb className="text-yellow-600 mx-auto mb-3" size={32} />
              <div className="text-2xl font-bold text-slate-800 mb-1">{weakTopics.reduce((sum, w) => sum + w.topics.length, 0)}</div>
              <div className="text-sm text-gray-600">Çalışılacak Konu</div>
            </div>
          </div>

          {/* Weak Topics Display */}
          {weakTopics.length > 0 && (
            <div className="bg-white rounded-xl p-6 mb-6 shadow-lg">
              <h4 className="font-bold text-gray-700 mb-4 flex items-center space-x-2">
                <FaBullseye className="text-red-500" />
                <span>Öncelikli Çalışma Konuları</span>
              </h4>
              <div className="space-y-3">
                {weakTopics.map((weak) => (
                  <div key={weak.subject} className="flex items-start space-x-3">
                    <div className="font-medium text-gray-600 min-w-[80px]">{weak.subject}:</div>
                    <div className="flex flex-wrap gap-2">
                      {weak.topics.map((topic) => (
                        <span key={topic} className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI Recommendations */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white mb-6">
            <h4 className="font-bold text-lg mb-4 flex items-center space-x-2">
              <FaRobot size={20} />
              <span>AI Önerileri</span>
            </h4>
            <div className="space-y-3 text-blue-100">
              <p>• <strong>Matematik</strong> konularına günde 2 saat odaklan (Net artış beklentisi: +8)</p>
              <p>• <strong>Fen</strong> bilimleri için görsel materyaller kullan (Kavrama artışı: %25)</p>
              <p>• Haftalık 3 deneme çöz ve analiz et (Sınav tecrübesi artışı)</p>
              <p>• Zayıf konularda birebir ders al (Hedeflenen net artış: +12)</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-6 py-4 rounded-xl font-bold transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2 shadow-lg">
              <FaRobot size={20} />
              <span>Çalışma Planını Güncelle</span>
            </button>
            
            <button className="flex-1 bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-4 rounded-xl font-bold transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2">
              <FaSave size={20} />
              <span>Analizi Kaydet</span>
            </button>
          </div>
        </div>
      )}

      {/* Enhanced Empty State */}
      {totalStats.correct === 0 && (
        <div className="bg-white rounded-2xl shadow-xl p-12 text-center animate-in slide-in-from-bottom-10 duration-1000 border border-gray-100">
          <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaChartBar className="text-white" size={40} />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">İlk Deneme Analizin</h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
            İlk deneme sonucunu girerek AI destekli detaylı analizine ulaş. 
            Eksik konularını belirle ve çalışma planını optimize et.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto mb-8">
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <FaRobot className="text-blue-600 mx-auto mb-2" size={24} />
              <div className="text-sm font-medium text-blue-800">AI Analizi</div>
            </div>
            <div className="bg-green-50 rounded-xl p-4 border border-green-200">
              <FaBullseye className="text-green-600 mx-auto mb-2" size={24} />
              <div className="text-sm font-medium text-green-800">Hedef Belirleme</div>
            </div>
            <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
              <FaLightbulb className="text-purple-600 mx-auto mb-2" size={24} />
              <div className="text-sm font-medium text-purple-800">Kişisel Öneriler</div>
            </div>
          </div>
          
          <div className="text-sm text-blue-600 bg-blue-50 rounded-xl p-6 max-w-lg mx-auto border border-blue-200">
            <div className="flex items-center space-x-2 mb-2">
              <FaLightbulb size={16} />
              <strong>Pro İpucu:</strong>
            </div>
            <p>Düzenli deneme çözümü ve analizi, YKS başarının için kritik öneme sahip! Haftada en az 2 deneme çözmeyi hedefle.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamAnalysis;