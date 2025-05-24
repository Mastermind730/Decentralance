import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailsPage from './pages/ProjectDetailsPage';
import ProfilePage from './pages/ProfilePage';
import MessagesPage from './pages/MessagesPage';
import { useWallet } from './contexts/WalletContext';
import ConnectWalletModal from './components/modals/ConnectWalletModal';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const { isConnected, connect } = useWallet();

  useEffect(() => {
    // Check user preference for dark mode
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDark);
    
    if (prefersDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => {
      const newMode = !prev;
      if (newMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return newMode;
    });
  };

  const handleConnectWallet = async () => {
    try {
      await connect();
      setShowConnectModal(false);
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header 
        isDarkMode={isDarkMode} 
        toggleDarkMode={toggleDarkMode} 
        isWalletConnected={isConnected}
        onConnectWallet={() => setShowConnectModal(true)}
      />
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:id" element={<ProjectDetailsPage />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
          <Route path="/messages" element={<MessagesPage />} />
        </Routes>
      </main>
      
      <Footer />
      
      {showConnectModal && (
        <ConnectWalletModal 
          onClose={() => setShowConnectModal(false)}
          onConnect={handleConnectWallet}
        />
      )}
    </div>
  );
}

export default App;