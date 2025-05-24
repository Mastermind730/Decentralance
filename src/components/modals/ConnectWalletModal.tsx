import { X } from 'lucide-react';
import { MetaMaskLogo } from '../ui/WalletLogos';
import { WalletConnectLogo } from '../ui/WalletLogos';

interface ConnectWalletModalProps {
  onClose: () => void;
  onConnect: () => void;
}

const ConnectWalletModal: React.FC<ConnectWalletModalProps> = ({ onClose, onConnect }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div 
        className="relative bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-md animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Connect Wallet</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6">
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Connect your wallet to access the platform. Your wallet serves as your identity and allows you to interact with the blockchain.
          </p>
          
          <div className="space-y-4">
            <button
              onClick={onConnect}
              className="w-full flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="flex items-center">
                <MetaMaskLogo className="w-8 h-8 mr-3" />
                <span className="font-medium">MetaMask</span>
              </div>
              <span className="text-xs px-2 py-1 rounded bg-primary-100 dark:bg-primary-900/40 text-primary-800 dark:text-primary-300">
                Popular
              </span>
            </button>
            
            <button
              onClick={onConnect}
              className="w-full flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="flex items-center">
                <WalletConnectLogo className="w-8 h-8 mr-3" />
                <span className="font-medium">WalletConnect</span>
              </div>
              <span className="text-xs">Multi-chain</span>
            </button>
          </div>
          
          <div className="mt-6 text-xs text-gray-500 dark:text-gray-400">
            <p>
              By connecting your wallet, you agree to our{' '}
              <a href="#" className="text-primary-600 dark:text-primary-400 hover:underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-primary-600 dark:text-primary-400 hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectWalletModal;