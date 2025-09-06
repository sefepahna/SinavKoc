import { useState } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import CoachOverview from './pages/CoachOverview';
import MyStudents from './pages/MyStudents';
import SessionCalendar from './pages/SessionCalendar';
import SessionTranscripts from './pages/SessionTranscripts';
import SessionTranscripts from './pages/SessionTranscripts';
import CoachMessages from './pages/CoachMessages';
import Reports from './pages/Reports';
import ParentReports from './pages/ParentReports';
import ParentReports from './pages/ParentReports';
import Resources from './pages/Resources';
import Profile from './pages/Profile';

const CoachDashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return <CoachOverview />;
      case 'my-students':
        return <MyStudents />;
      case 'session-calendar':
        return <SessionCalendar />;
      case 'session-transcripts':
        return <SessionTranscripts />;
      case 'session-transcripts':
        return <SessionTranscripts />;
      case 'messages':
        return <CoachMessages />;
      case 'reports':
        return <Reports />;
      case 'parent-reports':
        return <ParentReports />;
      case 'parent-reports':
        return <ParentReports />;
      case 'resources':
        return <Resources />;
      case 'profile':
        return <Profile />;
      default:
        return <CoachOverview />;
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

export default CoachDashboard;