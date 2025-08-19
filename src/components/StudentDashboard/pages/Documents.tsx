import React, { useState } from 'react';
import { 
  FaFileAlt, 
  FaDownload, 
  FaEye, 
  FaFolder, 
  FaFilePdf, 
  FaFileWord, 
  FaFileImage,
  FaSearch,
  FaFilter
} from 'react-icons/fa';

interface Document {
  id: string;
  name: string;
  type: 'pdf' | 'doc' | 'image';
  category: 'Ders Notları' | 'Deneme Sonuçları' | 'Çalışma Planları' | 'Ödevler' | 'Sertifikalar';
  size: string;
  date: string;
  downloadUrl: string;
}

const Documents = () => {
  const [documents] = useState<Document[]>([
    {
      id: '1',
      name: 'Matematik - Polinomlar Ders Notu',
      type: 'pdf',
      category: 'Ders Notları',
      size: '2.4 MB',
      date: '2024-01-15',
      downloadUrl: '#'
    },
    {
      id: '2',
      name: 'TYT Deneme Sonucu - Ocak 2024',
      type: 'pdf',
      category: 'Deneme Sonuçları',
      size: '1.8 MB',
      date: '2024-01-12',
      downloadUrl: '#'
    },
    {
      id: '3',
      name: 'Haftalık Çalışma Programı',
      type: 'doc',
      category: 'Çalışma Planları',
      size: '856 KB',
      date: '2024-01-10',
      downloadUrl: '#'
    },
    {
      id: '4',
      name: 'Türkçe Paragraf Ödevleri',
      type: 'pdf',
      category: 'Ödevler',
      size: '3.2 MB',
      date: '2024-01-08',
      downloadUrl: '#'
    },
    {
      id: '5',
      name: 'Fizik Formül Kartları',
      type: 'image',
      category: 'Ders Notları',
      size: '4.1 MB',
      date: '2024-01-05',
      downloadUrl: '#'
    },
    {
      id: '6',
      name: 'AYT Deneme Analizi',
      type: 'pdf',
      category: 'Deneme Sonuçları',
      size: '2.7 MB',
      date: '2024-01-03',
      downloadUrl: '#'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Tümü');

  const categories = ['Tümü', 'Ders Notları', 'Deneme Sonuçları', 'Çalışma Planları', 'Ödevler', 'Sertifikalar'];

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FaFilePdf className="text-red-500" size={24} />;
      case 'doc':
        return <FaFileWord className="text-blue-500" size={24} />;
      case 'image':
        return <FaFileImage className="text-green-500" size={24} />;
      default:
        return <FaFileAlt className="text-gray-500" size={24} />;
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Ders Notları': 'bg-blue-100 text-blue-800',
      'Deneme Sonuçları': 'bg-green-100 text-green-800',
      'Çalışma Planları': 'bg-purple-100 text-purple-800',
      'Ödevler': 'bg-yellow-100 text-yellow-800',
      'Sertifikalar': 'bg-red-100 text-red-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Tümü' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDownload = (doc: Document) => {
    // Mock download
    alert(`"${doc.name}" indiriliyor...`);
  };

  const handlePreview = (doc: Document) => {
    // Mock preview
    alert(`"${doc.name}" önizleme açılıyor...`);
  };

  const documentsByCategory = categories.slice(1).map(category => ({
    category,
    count: documents.filter(doc => doc.category === category).length
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6 animate-in slide-in-from-top-10 duration-1000">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Belgeler</h1>
        <p className="text-gray-600">Ders notları, deneme sonuçları ve diğer belgelerine ulaş</p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-2xl shadow-lg p-6 animate-in slide-in-from-left-10 duration-1000 delay-200">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Belge ara..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <FaFilter className="text-gray-400" size={16} />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Category Overview */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 animate-in slide-in-from-right-10 duration-1000 delay-400">
        {documentsByCategory.map((item, index) => (
          <div
            key={item.category}
            className="bg-white rounded-xl shadow-lg p-4 text-center hover:scale-105 transition-all duration-300 cursor-pointer animate-in slide-in-from-bottom-10 duration-1000"
            style={{ animationDelay: `${index * 100}ms` }}
            onClick={() => setSelectedCategory(item.category)}
          >
            <FaFolder className="mx-auto text-blue-600 mb-2" size={24} />
            <div className="text-sm font-medium text-slate-800 mb-1">{item.category}</div>
            <div className="text-xs text-gray-600">{item.count} belge</div>
          </div>
        ))}
      </div>

      {/* Documents List */}
      <div className="bg-white rounded-2xl shadow-lg animate-in slide-in-from-bottom-10 duration-1000 delay-600">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-slate-800">
            {selectedCategory === 'Tümü' ? 'Tüm Belgeler' : selectedCategory}
          </h3>
          <p className="text-gray-600 text-sm mt-1">
            {filteredDocuments.length} belge bulundu
          </p>
        </div>

        {filteredDocuments.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {filteredDocuments.map((doc, index) => (
              <div
                key={doc.id}
                className="p-6 hover:bg-gray-50 transition-all duration-300 animate-in slide-in-from-left-10 duration-1000"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1 min-w-0">
                    <div className="flex-shrink-0">
                      {getFileIcon(doc.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-slate-800 truncate">{doc.name}</h4>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(doc.category)}`}>
                          {doc.category}
                        </span>
                        <span className="text-sm text-gray-600">{doc.size}</span>
                        <span className="text-sm text-gray-600">{formatDate(doc.date)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => handlePreview(doc)}
                      className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300 hover:scale-110"
                      title="Önizle"
                    >
                      <FaEye size={16} />
                    </button>
                    
                    <button
                      onClick={() => handleDownload(doc)}
                      className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-300 hover:scale-110"
                      title="İndir"
                    >
                      <FaDownload size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <FaFileAlt className="mx-auto text-gray-300 mb-4" size={64} />
            <h3 className="text-xl font-bold text-gray-600 mb-2">
              {searchTerm ? 'Arama sonucu bulunamadı' : 'Bu kategoride belge yok'}
            </h3>
            <p className="text-gray-500">
              {searchTerm 
                ? `"${searchTerm}" için sonuç bulunamadı. Farklı anahtar kelimeler deneyin.`
                : 'Bu kategoriye ait henüz bir belge yüklenmemiş.'
              }
            </p>
          </div>
        )}
      </div>

      {/* Storage Info */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200 animate-in slide-in-from-bottom-10 duration-1000 delay-800">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-slate-800 mb-2">💾 Depolama Alanı</h4>
            <p className="text-gray-700 text-sm">
              Toplam <strong>15.2 MB</strong> kullanıldı • <strong>1 GB</strong> limit
            </p>
          </div>
          
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">%1.5</div>
            <div className="text-sm text-gray-600">Kullanım oranı</div>
          </div>
        </div>
        
        <div className="mt-4 bg-gray-200 rounded-full h-2 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full w-[1.5%] transition-all duration-1000"></div>
        </div>
      </div>
    </div>
  );
};

export default Documents;