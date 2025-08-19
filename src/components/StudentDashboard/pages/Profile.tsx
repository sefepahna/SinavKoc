import React, { useState } from 'react';
import { 
  FaUser, 
  FaSchool, 
  FaBell, 
  FaCrown, 
  FaShieldAlt, 
  FaTrash,
  FaSave,
  FaEdit,
  FaPhone,
  FaEnvelope
} from 'react-icons/fa';

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  school: string;
  grade: string;
  targetScore: string;
  targetFaculty: string;
  parentName: string;
  parentPhone: string;
}

interface NotificationSettings {
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  weeklyReports: boolean;
  examReminders: boolean;
}

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: 'Ayşe',
    lastName: 'Yılmaz',
    email: 'ayse.yilmaz@email.com',
    phone: '+90 555 123 4567',
    school: 'Ankara Fen Lisesi',
    grade: '12',
    targetScore: '450',
    targetFaculty: 'İstanbul Üniversitesi Tıp Fakültesi',
    parentName: 'Mehmet Yılmaz',
    parentPhone: '+90 555 987 6543'
  });

  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,
    weeklyReports: true,
    examReminders: true
  });

  const [privacyConsents, setPrivacyConsents] = useState({
    dataProcessing: true,
    marketing: false,
    analytics: true
  });

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate save operation
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    setIsEditing(false);
    alert('Profil bilgileri başarıyla güncellendi! 🎉');
  };

  const handleDataDeletion = () => {
    if (window.confirm('Tüm verilerinizi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.')) {
      alert('Veri silme talebiniz alındı. 48 saat içinde işleme alınacaktır.');
    }
  };

  const handleUpgrade = () => {
    alert('Pro paketine yükseltme sayfasına yönlendiriliyorsunuz...');
  };

  const handleManageSubscription = () => {
    alert('Üyelik yönetimi sayfasına yönlendiriliyorsunuz...');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6 animate-in slide-in-from-top-10 duration-1000">
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 mb-2">Profil & Üyelik</h1>
            <p className="text-gray-600">Kişisel bilgilerin ve üyelik ayarların</p>
          </div>
          
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
          >
            <FaEdit size={16} />
            <span>{isEditing ? 'İptal Et' : 'Düzenle'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Info */}
          <div className="bg-white rounded-2xl shadow-lg p-6 animate-in slide-in-from-left-10 duration-1000 delay-200">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center space-x-2">
              <FaUser className="text-blue-600" />
              <span>Kişisel Bilgiler</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ad</label>
                <input
                  type="text"
                  value={profileData.firstName}
                  onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Soyad</label>
                <input
                  type="text"
                  value={profileData.lastName}
                  onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">E-posta</label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Telefon</label>
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Okul</label>
                <input
                  type="text"
                  value={profileData.school}
                  onChange={(e) => setProfileData(prev => ({ ...prev, school: e.target.value }))}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sınıf</label>
                <select
                  value={profileData.grade}
                  onChange={(e) => setProfileData(prev => ({ ...prev, grade: e.target.value }))}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                >
                  <option value="9">9. Sınıf</option>
                  <option value="10">10. Sınıf</option>
                  <option value="11">11. Sınıf</option>
                  <option value="12">12. Sınıf</option>
                  <option value="mezun">Mezun</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hedef Puan</label>
                <input
                  type="number"
                  value={profileData.targetScore}
                  onChange={(e) => setProfileData(prev => ({ ...prev, targetScore: e.target.value }))}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                  min="200"
                  max="500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Hedef Fakülte</label>
                <input
                  type="text"
                  value={profileData.targetFaculty}
                  onChange={(e) => setProfileData(prev => ({ ...prev, targetFaculty: e.target.value }))}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>
            </div>

            {isEditing && (
              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex items-center space-x-2 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                >
                  {isSaving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Kaydediliyor...</span>
                    </>
                  ) : (
                    <>
                      <FaSave size={16} />
                      <span>Kaydet</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Parent Contact */}
          <div className="bg-white rounded-2xl shadow-lg p-6 animate-in slide-in-from-left-10 duration-1000 delay-400">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center space-x-2">
              <FaPhone className="text-green-600" />
              <span>Veli İletişim Bilgileri</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Veli Adı Soyadı</label>
                <input
                  type="text"
                  value={profileData.parentName}
                  onChange={(e) => setProfileData(prev => ({ ...prev, parentName: e.target.value }))}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Veli Telefonu</label>
                <input
                  type="tel"
                  value={profileData.parentPhone}
                  onChange={(e) => setProfileData(prev => ({ ...prev, parentPhone: e.target.value }))}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white rounded-2xl shadow-lg p-6 animate-in slide-in-from-left-10 duration-1000 delay-600">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center space-x-2">
              <FaBell className="text-yellow-600" />
              <span>Bildirim Tercihleri</span>
            </h3>

            <div className="space-y-4">
              {Object.entries(notifications).map(([key, value]) => {
                const labels = {
                  emailNotifications: 'E-posta Bildirimleri',
                  smsNotifications: 'SMS Bildirimleri',
                  pushNotifications: 'Push Bildirimleri',
                  weeklyReports: 'Haftalık Raporlar',
                  examReminders: 'Sınav Hatırlatmaları'
                };

                return (
                  <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <span className="font-medium text-gray-700">
                      {labels[key as keyof typeof labels]}
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => setNotifications(prev => ({ ...prev, [key]: e.target.checked }))}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="bg-white rounded-2xl shadow-lg p-6 animate-in slide-in-from-left-10 duration-1000 delay-800">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center space-x-2">
              <FaShieldAlt className="text-red-600" />
              <span>KVKK & Gizlilik</span>
            </h3>

            <div className="space-y-4 mb-6">
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="dataProcessing"
                  checked={privacyConsents.dataProcessing}
                  onChange={(e) => setPrivacyConsents(prev => ({ ...prev, dataProcessing: e.target.checked }))}
                  className="mt-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="dataProcessing" className="text-sm text-gray-700">
                  Kişisel verilerimin eğitim hizmetleri için işlenmesine onay veriyorum.
                </label>
              </div>

              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="marketing"
                  checked={privacyConsents.marketing}
                  onChange={(e) => setPrivacyConsents(prev => ({ ...prev, marketing: e.target.checked }))}
                  className="mt-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="marketing" className="text-sm text-gray-700">
                  Pazarlama ve tanıtım amaçlı iletişim kurulmasına onay veriyorum.
                </label>
              </div>

              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="analytics"
                  checked={privacyConsents.analytics}
                  onChange={(e) => setPrivacyConsents(prev => ({ ...prev, analytics: e.target.checked }))}
                  className="mt-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="analytics" className="text-sm text-gray-700">
                  Hizmet kalitesini artırmak için analitik verilerimin kullanılmasına onay veriyorum.
                </label>
              </div>
            </div>

            <button
              onClick={handleDataDeletion}
              className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
            >
              <FaTrash size={16} />
              <span>Verilerimi Sil</span>
            </button>
          </div>
        </div>

        {/* Membership Card */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-2xl p-6 text-white animate-in slide-in-from-right-10 duration-1000 delay-300">
            <div className="flex items-center space-x-3 mb-6">
              <FaCrown className="text-yellow-400" size={32} />
              <div>
                <h3 className="text-xl font-bold">SınavKoç Plus</h3>
                <p className="text-blue-100 text-sm">Aktif Üyelik</p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-blue-100">Başlangıç:</span>
                <span className="font-semibold">15 Ocak 2024</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-100">Yenileme:</span>
                <span className="font-semibold">15 Şubat 2024</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-100">Aylık Ücret:</span>
                <span className="font-semibold">₺1.200</span>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleUpgrade}
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white px-4 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
              >
                Pro'ya Geç
              </button>
              
              <button
                onClick={handleManageSubscription}
                className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
              >
                Üyeliği Yönet
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-2xl shadow-lg p-6 animate-in slide-in-from-right-10 duration-1000 delay-500">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Hızlı İstatistikler</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Toplam Ders Saati</span>
                <span className="font-bold text-blue-600">47 saat</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Çözülen Deneme</span>
                <span className="font-bold text-green-600">12 adet</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Ortalama Net</span>
                <span className="font-bold text-purple-600">385</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Üyelik Süresi</span>
                <span className="font-bold text-orange-600">3 ay</span>
              </div>
            </div>
          </div>

          {/* Support */}
          <div className="bg-white rounded-2xl shadow-lg p-6 animate-in slide-in-from-right-10 duration-1000 delay-700">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Destek</h3>
            
            <div className="space-y-3">
              <button className="w-full text-left p-3 bg-gray-50 hover:bg-blue-50 rounded-xl transition-all duration-300 hover:scale-105">
                <div className="flex items-center space-x-3">
                  <FaEnvelope className="text-blue-600" size={16} />
                  <span className="font-medium text-slate-800">E-posta Desteği</span>
                </div>
              </button>
              
              <button className="w-full text-left p-3 bg-gray-50 hover:bg-green-50 rounded-xl transition-all duration-300 hover:scale-105">
                <div className="flex items-center space-x-3">
                  <FaPhone className="text-green-600" size={16} />
                  <span className="font-medium text-slate-800">Telefon Desteği</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;