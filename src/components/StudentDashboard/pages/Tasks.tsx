import { useState } from 'react';
import { 
  FaTasks, 
  FaClock, 
  FaBook, 
  FaCheck, 
  FaPlus,
  FaCalendarDay,
  FaCalendarWeek,
  FaCheckDouble
} from 'react-icons/fa';

interface Task {
  id: string;
  title: string;
  subject: string;
  estimatedTime: string;
  resource: string;
  status: 'Bekliyor' | 'Devam' | 'Bitti';
  dueDate: string;
}

const Tasks = () => {
  const [activeTab, setActiveTab] = useState<'today' | 'week'>('today');
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Polinomlar Konu Tekrarı',
      subject: 'Matematik',
      estimatedTime: '45 dk',
      resource: 'Ders Kitabı Sayfa 120-135',
      status: 'Bekliyor',
      dueDate: 'Bugün'
    },
    {
      id: '2',
      title: 'Paragraf Soruları Çözümü',
      subject: 'Türkçe',
      estimatedTime: '30 dk',
      resource: 'Test Kitabı Bölüm 3',
      status: 'Devam',
      dueDate: 'Bugün'
    },
    {
      id: '3',
      title: 'Fotosentez Konusu Video İzle',
      subject: 'Biyoloji',
      estimatedTime: '25 dk',
      resource: 'Online Video Serisi',
      status: 'Bitti',
      dueDate: 'Bugün'
    },
    {
      id: '4',
      title: 'TYT Deneme Sınavı',
      subject: 'Genel',
      estimatedTime: '3 saat',
      resource: 'Deneme Kitabı Test 15',
      status: 'Bekliyor',
      dueDate: 'Bugün'
    },
    {
      id: '5',
      title: 'Limit Konusu Soru Çözümü',
      subject: 'Matematik',
      estimatedTime: '1 saat',
      resource: 'Soru Bankası Bölüm 8',
      status: 'Bekliyor',
      dueDate: 'Yarın'
    },
    {
      id: '6',
      title: 'Osmanlı Tarihi Özet Çıkarma',
      subject: 'Tarih',
      estimatedTime: '40 dk',
      resource: 'Ders Notları',
      status: 'Bekliyor',
      dueDate: 'Bu Hafta'
    },
    {
      id: '7',
      title: 'Kimyasal Bağlar Test Çözümü',
      subject: 'Kimya',
      estimatedTime: '35 dk',
      resource: 'Test Kitabı Bölüm 5',
      status: 'Devam',
      dueDate: 'Bu Hafta'
    }
  ]);

  const [showAddTask, setShowAddTask] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    subject: '',
    estimatedTime: '',
    resource: ''
  });

  const todayTasks = tasks.filter(task => task.dueDate === 'Bugün' || task.dueDate === 'Yarın');
  const weekTasks = tasks.filter(task => task.dueDate === 'Bu Hafta' || task.dueDate === 'Bugün' || task.dueDate === 'Yarın');

  const currentTasks = activeTab === 'today' ? todayTasks : weekTasks;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Bekliyor':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Devam':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Bitti':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSubjectColor = (subject: string) => {
    const colors = {
      'Matematik': 'bg-blue-500',
      'Türkçe': 'bg-green-500',
      'Biyoloji': 'bg-purple-500',
      'Kimya': 'bg-yellow-500',
      'Fizik': 'bg-red-500',
      'Tarih': 'bg-indigo-500',
      'Genel': 'bg-gray-500'
    };
    return colors[subject as keyof typeof colors] || 'bg-gray-500';
  };

  const updateTaskStatus = (taskId: string, newStatus: 'Bekliyor' | 'Devam' | 'Bitti') => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  const markAllCompleted = () => {
    setTasks(prev => prev.map(task => 
      currentTasks.some(ct => ct.id === task.id) 
        ? { ...task, status: 'Bitti' as const }
        : task
    ));
  };

  const addNewTask = () => {
    if (newTask.title && newTask.subject) {
      const task: Task = {
        id: Date.now().toString(),
        title: newTask.title,
        subject: newTask.subject,
        estimatedTime: newTask.estimatedTime || '30 dk',
        resource: newTask.resource || 'Belirtilmedi',
        status: 'Bekliyor',
        dueDate: activeTab === 'today' ? 'Bugün' : 'Bu Hafta'
      };
      
      setTasks(prev => [...prev, task]);
      setNewTask({ title: '', subject: '', estimatedTime: '', resource: '' });
      setShowAddTask(false);
    }
  };

  const completedCount = currentTasks.filter(task => task.status === 'Bitti').length;
  const totalCount = currentTasks.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6 animate-in slide-in-from-top-10 duration-700">
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 mb-2">Ödevler / Görevler</h1>
            <p className="text-gray-600">Günlük ve haftalık görevlerini takip et</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={markAllCompleted}
              className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
            >
              <FaCheckDouble size={16} />
              <span>Tümünü Tamamla</span>
            </button>
            
            <button
              onClick={() => setShowAddTask(true)}
              className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
            >
              <FaPlus size={16} />
              <span>Yeni Görev</span>
            </button>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white rounded-2xl shadow-lg p-6 animate-in slide-in-from-left-10 duration-700 delay-200">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-700">İlerleme</span>
          <span className="text-sm font-bold text-slate-800">{completedCount}/{totalCount}</span>
        </div>
        <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%` }}
          ></div>
        </div>
        <div className="text-xs text-gray-500 mt-2">
          {totalCount > 0 ? `%${Math.round((completedCount / totalCount) * 100)} tamamlandı` : 'Henüz görev yok'}
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-lg animate-in slide-in-from-right-10 duration-700 delay-400">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('today')}
            className={`flex-1 flex items-center justify-center space-x-2 px-6 py-4 font-semibold transition-all duration-300 ${
              activeTab === 'today'
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
            }`}
          >
            <FaCalendarDay size={20} />
            <span>Bugün</span>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
              {todayTasks.length}
            </span>
          </button>
          
          <button
            onClick={() => setActiveTab('week')}
            className={`flex-1 flex items-center justify-center space-x-2 px-6 py-4 font-semibold transition-all duration-300 ${
              activeTab === 'week'
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
            }`}
          >
            <FaCalendarWeek size={20} />
            <span>Bu Hafta</span>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
              {weekTasks.length}
            </span>
          </button>
        </div>

        {/* Task List */}
        <div className="p-6">
          {currentTasks.length > 0 ? (
            <div className="space-y-4">
              {currentTasks.map((task, index) => (
                <div
                  key={task.id}
                  className="bg-gray-50 hover:bg-gray-100 rounded-xl p-4 transition-all duration-500 hover:scale-[1.02] animate-in slide-in-from-left-10"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start space-x-4">
                    <button
                      onClick={() => {
                        const nextStatus = task.status === 'Bekliyor' ? 'Devam' : 
                                         task.status === 'Devam' ? 'Bitti' : 'Bekliyor';
                        updateTaskStatus(task.id, nextStatus);
                      }}
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                        task.status === 'Bitti' 
                          ? 'bg-green-500 border-green-500' 
                          : 'border-gray-300 hover:border-blue-500'
                      }`}
                    >
                      {task.status === 'Bitti' && <FaCheck className="text-white" size={12} />}
                    </button>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className={`font-semibold text-slate-800 ${
                          task.status === 'Bitti' ? 'line-through opacity-60' : ''
                        }`}>
                          {task.title}
                        </h3>
                        
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(task.status)}`}>
                          {task.status}
                        </span>
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center space-x-1">
                          <div className={`w-3 h-3 rounded-full ${getSubjectColor(task.subject)}`}></div>
                          <span>{task.subject}</span>
                        </div>
                        
                        <div className="flex items-center space-x-1">
                          <FaClock size={12} />
                          <span>{task.estimatedTime}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-1 text-sm text-blue-600">
                        <FaBook size={12} />
                        <span>{task.resource}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FaTasks className="mx-auto text-gray-300 mb-4" size={64} />
              <h3 className="text-xl font-bold text-gray-600 mb-2">
                {activeTab === 'today' ? 'Bugün için görev yok' : 'Bu hafta için görev yok'}
              </h3>
              <p className="text-gray-500 mb-6">
                {activeTab === 'today' 
                  ? 'Bugün için henüz bir görev planlanmamış. Yeni görev ekleyebilirsin.'
                  : 'Bu hafta için henüz bir görev planlanmamış. Yeni görev ekleyebilirsin.'
                }
              </p>
              <button
                onClick={() => setShowAddTask(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
              >
                İlk Görevi Ekle
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Add Task Modal */}
      {showAddTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in zoom-in-50 duration-300">
            <h3 className="text-xl font-bold text-slate-800 mb-6">Yeni Görev Ekle</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Görev Başlığı *</label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Örn: Matematik soru çözümü"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ders *</label>
                <select
                  value={newTask.subject}
                  onChange={(e) => setNewTask(prev => ({ ...prev, subject: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Ders seçin</option>
                  <option value="Matematik">Matematik</option>
                  <option value="Türkçe">Türkçe</option>
                  <option value="Fizik">Fizik</option>
                  <option value="Kimya">Kimya</option>
                  <option value="Biyoloji">Biyoloji</option>
                  <option value="Tarih">Tarih</option>
                  <option value="Coğrafya">Coğrafya</option>
                  <option value="Genel">Genel</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tahmini Süre</label>
                <input
                  type="text"
                  value={newTask.estimatedTime}
                  onChange={(e) => setNewTask(prev => ({ ...prev, estimatedTime: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Örn: 45 dk"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Kaynak</label>
                <input
                  type="text"
                  value={newTask.resource}
                  onChange={(e) => setNewTask(prev => ({ ...prev, resource: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Örn: Ders kitabı sayfa 120-135"
                />
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowAddTask(false)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-3 rounded-xl font-semibold transition-all duration-300"
              >
                İptal
              </button>
              <button
                onClick={addNewTask}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-3 rounded-xl font-semibold transition-all duration-300"
              >
                Ekle
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;