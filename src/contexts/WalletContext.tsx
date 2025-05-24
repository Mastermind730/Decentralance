import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ethers } from 'ethers';

interface WalletContextType {
  isConnected: boolean;
  address: string | null;
  balance: string;
  provider: ethers.BrowserProvider | null;
  network: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  getSigner: () => Promise<ethers.JsonRpcSigner | null>;
  ensureNetwork: (chainId: string) => Promise<boolean>;
}

const WalletContext = createContext<WalletContextType>({
  isConnected: false,
  address: null,
  balance: '0',
  provider: null,
  network: null,
  connect: async () => {},
  disconnect: () => {},
  getSigner: async () => null,
  ensureNetwork: async () => false,
});

export const useWallet = () => useContext(WalletContext);

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState('0');
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [network, setNetwork] = useState<string | null>(null);

  // Initialize wallet from local storage on component mount
  useEffect(() => {
    const checkConnectedWallet = async () => {
      if (window.ethereum && localStorage.getItem('isWalletConnected') === 'true') {
        try {
          await connect();
        } catch (error) {
          console.error('Failed to reconnect wallet:', error);
          localStorage.removeItem('isWalletConnected');
        }
      }
    };

    checkConnectedWallet();
  }, []);

  // Handle account and chain changes
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnect();
        } else {
          setAddress(accounts[0]);
          updateBalance(accounts[0]);
        }
      });

      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeAllListeners('accountsChanged');
        window.ethereum.removeAllListeners('chainChanged');
      }
    };
  }, [provider]);

  const connect = async () => {
    if (!window.ethereum) {
      throw new Error('No Ethereum wallet found. Please install MetaMask or another compatible wallet.');
    }

    try {
      const browserProvider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await browserProvider.send('eth_requestAccounts', []);
      const network = await browserProvider.getNetwork();
      
      setProvider(browserProvider);
      setAddress(accounts[0]);
      setNetwork(network.name);
      setIsConnected(true);
      
      localStorage.setItem('isWalletConnected', 'true');
      
      await updateBalance(accounts[0]);
      
      return accounts[0];
    } catch (error) {
      console.error('Error connecting wallet:', error);
      throw error;
    }
  };

  const disconnect = () => {
    setIsConnected(false);
    setAddress(null);
    setBalance('0');
    setProvider(null);
    setNetwork(null);
    localStorage.removeItem('isWalletConnected');
  };

  const updateBalance = async (address: string) => {
    if (!provider) return;
    
    try {
      const balance = await provider.getBalance(address);
      setBalance(ethers.formatEther(balance));
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  const getSigner = async () => {
    if (!provider || !isConnected) return null;
    
    try {
      return await provider.getSigner();
    } catch (error) {
      console.error('Error getting signer:', error);
      return null;
    }
  };

  const ensureNetwork = async (chainId: string) => {
    if (!window.ethereum || !isConnected) return false;
    
    try {
      const currentChainId = await window.ethereum.request({ method: 'eth_chainId' });
      
      if (currentChainId !== chainId) {
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId }],
          });
          return true;
        } catch (switchError: any) {
          // This error code indicates that the chain has not been added to MetaMask
          if (switchError.code === 4902) {
            // Add the network based on chainId
            return false;
          }
          return false;
        }
      }
      
      return true;
    } catch (error) {
      console.error('Error ensuring network:', error);
      return false;
    }
  };

  const value = {
    isConnected,
    address,
    balance,
    provider,
    network,
    connect,
    disconnect,
    getSigner,
    ensureNetwork,
  };

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
};