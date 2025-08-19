import React from 'react';
import { useState } from 'react';
import Header from './components/Header';
import StickyCtaBar from './components/StickyCtaBar';
import Hero from './components/Hero';
import LimitedOffer from './components/LimitedOffer';
import Services from './components/Services';
import PriceComparison from './components/PriceComparison';
import About from './components/About';
import Coaches from './components/Coaches';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingChat from './components/FloatingChat';
import Login from './components/Login';
import StudentDashboard from './components/StudentDashboard/StudentDashboard';
import CoachDashboard from './components/CoachDashboard/CoachDashboard';

interface User {
  role: 'student' | 'coach';
  email: string;
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleLogin = (email: string, password: string) => {
    setLoginError(null);
    
    if (email === 'koc@sinavkoc.com') {
      setUser({ role: 'coach', email });
      setShowLogin(false);
    } else if (email === 'ogrenci@sinavkoc.com') {
      setUser({ role: 'student', email });
      setShowLogin(false);
    } else {
      setLoginError('Geçersiz email adresi. Lütfen test hesaplarından birini kullanın.');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setShowLogin(false);
  };

  if (showLogin) {
    return <Login onLogin={handleLogin} error={loginError || undefined} />;
  }

  if (user) {
    return user.role === 'coach' ? <CoachDashboard /> : <StudentDashboard />;
  }

  return (
    <div className="min-h-screen">
      <Header />
      <StickyCtaBar />
      <main>
        <Hero />
        <LimitedOffer />
        <Services />
        <PriceComparison />
        <About />
        <Coaches />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <FloatingChat />
      
      {/* Login Button */}
      <button
        onClick={() => setShowLogin(true)}
        className="fixed bottom-20 left-6 z-40 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-6 py-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 text-sm font-bold animate-pulse hover:animate-bounce border-2 border-white/20"
      >
        🔐 Giriş Yap
      </button>
    </div>
  );
}

export default App;