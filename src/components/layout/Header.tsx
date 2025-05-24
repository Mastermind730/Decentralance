import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Sun, Moon, Wallet, User, LogOut, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useWallet } from '../../contexts/WalletContext';
import { useUser } from '../../contexts/UserContext';

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  isWalletConnected: boolean;
  onConnectWallet: () => void;
}

const Header: React.FC<HeaderProps> = ({
  isDarkMode,
  toggleDarkMode,
  isWalletConnected,
  onConnectWallet,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { address, disconnect, balance } = useWallet();
  const { currentUser, isProfileComplete } = useUser();
  const navigate = useNavigate();

  const handleDisconnect = () => {
    disconnect();
    setIsProfileMenuOpen(false);
    navigate('/');
  };

  const formatAddress = (address: string | null) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 text-transparent bg-clip-text">
                DecentraLance
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/projects"
              className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium"
            >
              Find Work
            </Link>
            <Link
              to="/projects"
              className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium"
            >
              Post a Job
            </Link>
            {isWalletConnected && (
              <Link
                to="/dashboard"
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium"
              >
                Dashboard
              </Link>
            )}
            {isWalletConnected && (
              <Link
                to="/messages"
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium"
              >
                Messages
              </Link>
            )}
          </nav>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 focus:outline-none"
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {isWalletConnected ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center space-x-2 px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <Wallet size={16} className="text-primary-500" />
                  <span className="wallet-address text-sm font-medium">
                    {formatAddress(address)}
                  </span>
                  <ChevronDown size={16} className="text-gray-500" />
                </button>

                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 animate-fade-in">
                    <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Balance</p>
                      <p className="font-medium">{parseFloat(balance).toFixed(4)} ETH</p>
                    </div>
                    <Link
                      to={`/profile/${address}`}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      <User size={16} className="mr-2" />
                      {isProfileComplete ? 'My Profile' : 'Complete Profile'}
                    </Link>
                    <button
                      onClick={handleDisconnect}
                      className="flex items-center w-full px-4 py-2 text-sm text-error-600 dark:text-error-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <LogOut size={16} className="mr-2" />
                      Disconnect
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onConnectWallet}
                className="connect-wallet-btn"
              >
                <Wallet size={16} className="mr-2" />
                Connect Wallet
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 animate-slide-up">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/projects"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setIsMenuOpen(false)}
            >
              Find Work
            </Link>
            <Link
              to="/projects"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setIsMenuOpen(false)}
            >
              Post a Job
            </Link>
            {isWalletConnected && (
              <Link
                to="/dashboard"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
            )}
            {isWalletConnected && (
              <Link
                to="/messages"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setIsMenuOpen(false)}
              >
                Messages
              </Link>
            )}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between px-5">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 focus:outline-none"
                aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {isWalletConnected ? (
                <div className="flex flex-col items-end">
                  <div className="flex items-center space-x-2">
                    <Wallet size={16} className="text-primary-500" />
                    <span className="text-sm font-medium">
                      {formatAddress(address)}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {parseFloat(balance).toFixed(4)} ETH
                  </div>
                </div>
              ) : (
                <button
                  onClick={onConnectWallet}
                  className="connect-wallet-btn"
                >
                  <Wallet size={16} className="mr-2" />
                  Connect Wallet
                </button>
              )}
            </div>
            {isWalletConnected && (
              <div className="mt-3 px-2 space-y-1">
                <Link
                  to={`/profile/${address}`}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User size={16} className="inline mr-2" />
                  {isProfileComplete ? 'My Profile' : 'Complete Profile'}
                </Link>
                <button
                  onClick={handleDisconnect}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-error-600 dark:text-error-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <LogOut size={16} className="inline mr-2" />
                  Disconnect
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;