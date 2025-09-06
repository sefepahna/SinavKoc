import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import Overview from './pages/Overview';
import StudyPlan from './pages/StudyPlan';
import ExamAnalysis from './pages/ExamAnalysis';
import ExamUpload from './pages/ExamUpload';
import AIChat from './pages/AIChat';
import Tasks from './pages/Tasks';
import Homework from './pages/Homework';
import Sessions from './pages/Sessions';
import Messages from './pages/Messages';
import Documents from './pages/Documents';
import PsychologicalSupport from './pages/PsychologicalSupport';
import ExamTechniques from './pages/ExamTechniques';
import Profile from './pages/Profile';

const StudentDashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return <Overview />;
      case 'study-plan':
        return <StudyPlan />;
      case 'exam-analysis':
        return <ExamAnalysis />;
      case 'exam-upload':
        return <ExamUpload />;
      case 'ai-chat':
        return <AIChat />;
      case 'tasks':
        return <Tasks />;
      case 'homework':
        return <Homework />;
      case 'sessions':
        return <Sessions />;
      case 'messages':
        return <Messages />;
      case 'documents':
        return <Documents />;
      case 'psychological-support':
        return <PsychologicalSupport />;
      case 'exam-techniques':
        return <ExamTechniques />;
      case 'profile':
        return <Profile />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen}
      />
      
      <div className="flex">
        <Sidebar 
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        
        <main className="flex-1 lg:ml-72 pt-16">
          <div className="p-4 lg:p-8">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;