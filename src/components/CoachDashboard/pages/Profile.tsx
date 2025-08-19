import { useState } from 'react';
import { 
  FaUser, 
  FaGraduationCap, 
  FaBell, 
  FaCrown, 
  FaShieldAlt, 
  FaTrash,
  FaSave,
  FaEdit,
  FaPhone,
  FaEnvelope,
  FaCertificate,
  FaUsers,
  FaStar,
  FaClock,
  FaCalendarAlt,
  FaAward,
  FaChartLine
} from 'react-icons/fa';

interface CoachProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialization: string;
  experience: string;
  education: string;
  certification: string;
  bio: string;
  hourlyRate: string;
  availability: string;
  languages: string[];
}

interface NotificationSettings {
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  weeklyReports: boolean;
  studentUpdates: boolean;
  sessionReminders: boolean;
}

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const [profileData, setProfileData] = useState<CoachProfileData>({
    firstName: 'Dr. Mehmet',
    lastName: 'Özkan',
    email: 'mehmet.ozkan@sinavkoc.com',
    phone: '+90 555 987 1234',
    specialization: 'Matematik, Fizik',
    experience: '8 yıl',
    education: 'İTÜ Matematik Mühendisliği (Doktora)',
    certification: 'Sertifikalı Özel Ders Koçu',
    bio: 'YKS matematik ve fizik alanında uzman koç. 500+ öğrenci ile çalıştım, ortalama 150 puan artış sağladım.',
    hourlyRate: '250 TL',
    availability: 'Hafta içi 15:00-22:00, Hafta sonu 10:00-18:00',
    languages: ['Türkçe', 'İngilizce']
  });

  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    weeklyReports: true,
    studentUpdates: true,
    sessionReminders: true
  });

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
    setIsEditing(false);
    // Show success message
    alert('Profil başarıyla güncellendi! 🎉');
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data if needed
  };

  const handleInputChange = (field: keyof CoachProfileData, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNotificationChange = (setting: keyof NotificationSettings) => {
    setNotifications(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const stats = [
    { label: 'Toplam Öğrenci', value: '24', icon: FaUsers, color: 'from-blue-500 to-blue-600' },
    { label: 'Ortalama Rating', value: '4.9', icon: FaStar, color: 'from-yellow-500 to-yellow-600' },
    { label: 'Toplam Saat', value: '1,240', icon: FaClock, color: 'from-green-500 to-green-600' },
    { label: 'Bu Ay Oturum', value: '68', icon: FaCalendarAlt, color: 'from-purple-500 to-purple-600' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 text-white">
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
          <div className="relative">
            <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-4xl font-bold border-4 border-white/30">
              {profileData.firstName.charAt(0)}{profileData.lastName.charAt(0)}
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
              <FaCrown className="text-white" size={12} />
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h1 className="text-3xl font-bold">
                {profileData.firstName} {profileData.lastName}
              </h1>
              <div className="px-3 py-1 bg-yellow-500 rounded-full">
                <span className="text-yellow-900 text-sm font-bold">Premium Koç</span>
              </div>
            </div>
            <p className="text-blue-100 text-lg mb-3">{profileData.specialization} Uzmanı</p>
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center space-x-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                <FaGraduationCap size={12} />
                <span>{profileData.experience} deneyim</span>
              </div>
              <div className="flex items-center space-x-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                <FaCertificate size={12} />
                <span>Sertifikalı</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-white/20 backdrop-blur-sm hover:bg-white/30 px-6 py-3 rounded-xl font-bold transition-all duration-300 flex items-center space-x-2"
          >
            <FaEdit size={16} />
            <span>{isEditing ? 'İptal Et' : 'Düzenle'}</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
              <stat.icon className="text-white" size={20} />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl">
              <FaUser className="text-white" size={20} />
            </div>
            <h2 className="text-xl font-bold text-slate-800">Kişisel Bilgiler</h2>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ad</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="px-4 py-3 bg-gray-50 rounded-xl font-medium text-slate-800">
                    {profileData.firstName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Soyad</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="px-4 py-3 bg-gray-50 rounded-xl font-medium text-slate-800">
                    {profileData.lastName}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">E-posta</label>
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-gray-400" size={16} />
                {isEditing ? (
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="flex-1 px-4 py-3 bg-gray-50 rounded-xl font-medium text-slate-800">
                    {profileData.email}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Telefon</label>
              <div className="flex items-center space-x-3">
                <FaPhone className="text-gray-400" size={16} />
                {isEditing ? (
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="flex-1 px-4 py-3 bg-gray-50 rounded-xl font-medium text-slate-800">
                    {profileData.phone}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Uzmanlık Alanı</label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.specialization}
                  onChange={(e) => handleInputChange('specialization', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <p className="px-4 py-3 bg-gray-50 rounded-xl font-medium text-slate-800">
                  {profileData.specialization}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Eğitim</label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.education}
                  onChange={(e) => handleInputChange('education', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <p className="px-4 py-3 bg-gray-50 rounded-xl font-medium text-slate-800">
                  {profileData.education}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Biyografi</label>
              {isEditing ? (
                <textarea
                  value={profileData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <p className="px-4 py-3 bg-gray-50 rounded-xl font-medium text-slate-800">
                  {profileData.bio}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Professional Information & Settings */}
        <div className="space-y-6">
          {/* Professional Info */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-green-500 to-green-600 rounded-xl">
                <FaAward className="text-white" size={20} />
              </div>
              <h2 className="text-xl font-bold text-slate-800">Profesyonel Bilgiler</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Deneyim</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.experience}
                    onChange={(e) => handleInputChange('experience', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="px-4 py-3 bg-gray-50 rounded-xl font-medium text-slate-800">
                    {profileData.experience}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Saatlik Ücret</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.hourlyRate}
                    onChange={(e) => handleInputChange('hourlyRate', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="px-4 py-3 bg-gray-50 rounded-xl font-medium text-slate-800">
                    {profileData.hourlyRate}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Müsaitlik</label>
                {isEditing ? (
                  <textarea
                    value={profileData.availability}
                    onChange={(e) => handleInputChange('availability', e.target.value)}
                    rows={2}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="px-4 py-3 bg-gray-50 rounded-xl font-medium text-slate-800">
                    {profileData.availability}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl">
                <FaBell className="text-white" size={20} />
              </div>
              <h2 className="text-xl font-bold text-slate-800">Bildirim Ayarları</h2>
            </div>

            <div className="space-y-4">
              {Object.entries(notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    {key === 'emailNotifications' ? 'E-posta Bildirimleri' :
                     key === 'smsNotifications' ? 'SMS Bildirimleri' :
                     key === 'pushNotifications' ? 'Push Bildirimleri' :
                     key === 'weeklyReports' ? 'Haftalık Raporlar' :
                     key === 'studentUpdates' ? 'Öğrenci Güncellemeleri' :
                     'Oturum Hatırlatmaları'}
                  </label>
                  <button
                    onClick={() => handleNotificationChange(key as keyof NotificationSettings)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                      value ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                        value ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Save/Cancel Buttons */}
      {isEditing && (
        <div className="flex justify-end space-x-4">
          <button
            onClick={handleCancel}
            className="px-6 py-3 border border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-colors duration-300"
          >
            İptal Et
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center space-x-2 disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
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
  );
};

export default Profile;