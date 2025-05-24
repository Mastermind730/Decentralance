import { ArrowRight, Shield, Database, DollarSign, Clock, BadgeCheck, Users, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWallet } from '../contexts/WalletContext';
import { CryptoCurrencyLogo } from '../components/ui/WalletLogos';

const LandingPage = () => {
  const { isConnected, connect } = useWallet();

  const handleConnect = async () => {
    if (!isConnected) {
      try {
        await connect();
      } catch (error) {
        console.error('Failed to connect wallet:', error);
      }
    }
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-background-light dark:from-background-dark to-gray-50 dark:to-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary-600 to-secondary-600 text-transparent bg-clip-text">
                Secure Freelancing on the Blockchain
              </h1>
              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8">
                Connect talent with clients globally using secure smart contracts, 
                cryptocurrency payments, and decentralized dispute resolution.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {isConnected ? (
                  <Link to="/dashboard" className="btn-primary">
                    Go to Dashboard <ArrowRight size={16} className="ml-2" />
                  </Link>
                ) : (
                  <button onClick={handleConnect} className="connect-wallet-btn">
                    Connect Your Wallet <ArrowRight size={16} className="ml-2" />
                  </button>
                )}
                <Link to="/projects" className="btn-outline">
                  Browse Projects
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap gap-4 items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">Supported Currencies:</span>
                <div className="flex gap-2">
                  <div className="flex items-center px-3 py-1 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-sm">
                    <CryptoCurrencyLogo symbol="ETH" className="w-5 h-5 mr-1" />
                    <span className="text-sm font-medium">ETH</span>
                  </div>
                  <div className="flex items-center px-3 py-1 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-sm">
                    <CryptoCurrencyLogo symbol="USDC" className="w-5 h-5 mr-1" />
                    <span className="text-sm font-medium">USDC</span>
                  </div>
                  <div className="flex items-center px-3 py-1 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-sm">
                    <CryptoCurrencyLogo symbol="USDT" className="w-5 h-5 mr-1" />
                    <span className="text-sm font-medium">USDT</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="relative z-10 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-secondary-500/10 dark:from-primary-900/20 dark:to-secondary-900/20"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold">Smart Contract Escrow</h3>
                    <div className="escrow-status escrow-status-active">Active</div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Total Value</span>
                        <div className="flex items-center">
                          <CryptoCurrencyLogo symbol="ETH" className="w-4 h-4 mr-1" />
                          <span className="font-medium">2.5 ETH</span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                        <div className="bg-gradient-to-r from-primary-500 to-primary-400 h-2 rounded-full" style={{ width: '60%' }}></div>
                      </div>
                      <div className="flex justify-between mt-1 text-xs text-gray-500 dark:text-gray-400">
                        <span>Milestone 1 of 3 completed</span>
                        <span>60% released</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                        <span className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Client</span>
                        <div className="flex items-center space-x-1">
                          <span className="font-medium truncate">0x8f7C...9e2A</span>
                          <BadgeCheck size={14} className="text-primary-500" />
                        </div>
                      </div>
                      <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                        <span className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Freelancer</span>
                        <div className="flex items-center space-x-1">
                          <span className="font-medium truncate">0x3b2D...6fA1</span>
                          <BadgeCheck size={14} className="text-primary-500" />
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                      <span className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Project</span>
                      <span className="font-medium">Website Development</span>
                    </div>
                    <div className="flex justify-between">
                      <button className="btn-outline py-1.5 px-3 text-sm">View Details</button>
                      <button className="btn-primary py-1.5 px-3 text-sm">Release Milestone</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute top-24 -right-12 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-4 w-64 rotate-6 z-0">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-success-100 dark:bg-success-900/40 rounded-full flex items-center justify-center mr-2">
                    <BadgeCheck size={16} className="text-success-600 dark:text-success-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Payment Released</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Milestone 2 completed</p>
                  </div>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>1.5 ETH</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">10 min ago</span>
                </div>
              </div>
              <div className="absolute -bottom-8 -left-12 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-4 w-64 -rotate-6 z-0">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/40 rounded-full flex items-center justify-center mr-2">
                    <Users size={16} className="text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">New Proposal</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Mobile App Development</p>
                  </div>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>3.2 ETH</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">2 hrs ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose DecentraLance?</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Our blockchain-powered platform offers unparalleled security, transparency, and efficiency for freelancers and clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/40 rounded-lg flex items-center justify-center mb-4">
                <Shield size={24} className="text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Secure Escrow</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Smart contracts automatically hold and release payments when milestones are completed, providing security for both parties.
              </p>
            </div>

            <div className="card hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-secondary-100 dark:bg-secondary-900/40 rounded-lg flex items-center justify-center mb-4">
                <Database size={24} className="text-secondary-600 dark:text-secondary-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Immutable Records</h3>
              <p className="text-gray-600 dark:text-gray-400">
                All transactions, reviews, and disputes are recorded on the blockchain, ensuring transparency and trust.
              </p>
            </div>

            <div className="card hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-accent-100 dark:bg-accent-900/40 rounded-lg flex items-center justify-center mb-4">
                <DollarSign size={24} className="text-accent-600 dark:text-accent-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Crypto Payments</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Accept payments in multiple cryptocurrencies with lower fees than traditional payment processors.
              </p>
            </div>

            <div className="card hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-success-100 dark:bg-success-900/40 rounded-lg flex items-center justify-center mb-4">
                <Clock size={24} className="text-success-600 dark:text-success-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Fast Settlements</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Receive payments instantly when work is approved, eliminating long waiting periods for funds to clear.
              </p>
            </div>

            <div className="card hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-warning-100 dark:bg-warning-900/40 rounded-lg flex items-center justify-center mb-4">
                <Users size={24} className="text-warning-600 dark:text-warning-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Fair Disputes</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Our decentralized dispute resolution system ensures fair outcomes for all parties involved.
              </p>
            </div>

            <div className="card hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-error-100 dark:bg-error-900/40 rounded-lg flex items-center justify-center mb-4">
                <Award size={24} className="text-error-600 dark:text-error-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Verified Profiles</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Build reputation through verifiable work history and reviews stored permanently on the blockchain.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              DecentraLance simplifies the freelancing process with blockchain technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="card hover:shadow-lg transition-shadow text-center relative z-10">
                <div className="w-12 h-12 rounded-full bg-primary-500 flex items-center justify-center text-white mx-auto mb-4">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-3">Connect Wallet & Create Profile</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Link your Web3 wallet and build your profile as a freelancer or client.
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 left-full w-full h-0.5 bg-gradient-to-r from-primary-500 to-transparent -translate-y-1/2 -z-10"></div>
            </div>

            <div className="relative">
              <div className="card hover:shadow-lg transition-shadow text-center relative z-10">
                <div className="w-12 h-12 rounded-full bg-primary-500 flex items-center justify-center text-white mx-auto mb-4">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-3">Create or Accept Projects</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Post jobs or bid on existing projects. Define milestones and payment terms.
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 left-full w-full h-0.5 bg-gradient-to-r from-primary-500 to-transparent -translate-y-1/2 -z-10"></div>
            </div>

            <div className="relative">
              <div className="card hover:shadow-lg transition-shadow text-center relative z-10">
                <div className="w-12 h-12 rounded-full bg-primary-500 flex items-center justify-center text-white mx-auto mb-4">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-3">Complete Work & Get Paid</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Funds are automatically released when milestones are approved. Build your reputation with each successful project.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Link to="/projects" className="btn-primary">
              Get Started Now <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Freelancing Experience?</h2>
            <p className="text-xl mb-8 text-white/90">
              Join thousands of freelancers and clients already benefiting from our secure blockchain platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {isConnected ? (
                <Link to="/dashboard" className="btn bg-white text-primary-600 hover:bg-gray-100">
                  Go to Dashboard <ArrowRight size={16} className="ml-2" />
                </Link>
              ) : (
                <button onClick={handleConnect} className="btn bg-white text-primary-600 hover:bg-gray-100">
                  Connect Your Wallet <ArrowRight size={16} className="ml-2" />
                </button>
              )}
              <Link to="/projects" className="btn bg-transparent border-2 border-white hover:bg-white/10">
                Browse Projects
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;