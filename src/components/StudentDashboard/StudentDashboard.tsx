import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import Overview from './pages/Overview';
import StudyPlan from './pages/StudyPlan';
import ExamAnalysis from './pages/ExamAnalysis';
import Tasks from './pages/Tasks';
import Sessions from './pages/Sessions';
import Messages from './pages/Messages';
import Documents from './pages/Documents';
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
      case 'tasks':
        return <Tasks />;
      case 'sessions':
        return <Sessions />;
      case 'messages':
        return <Messages />;
      case 'documents':
        return <Documents />;
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
        
        <main className="flex-1 lg:ml-64 pt-16">
          <div className="p-4 lg:p-8">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;