import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BarChart3, Briefcase as BriefcaseBusiness, Clock, DollarSign, FileText, MessageSquare, PlusCircle, User } from 'lucide-react';
import { useWallet } from '../contexts/WalletContext';
import { useUser } from '../contexts/UserContext';
import { CryptoCurrencyLogo } from '../components/ui/WalletLogos';
import { format } from 'date-fns';

const Dashboard = () => {
  const { isConnected, address, balance } = useWallet();
  const { currentUser, isProfileComplete, userRole } = useUser();
  const navigate = useNavigate();
  const [selectedSection, setSelectedSection] = useState('overview');

  useEffect(() => {
    if (!isConnected) {
      navigate('/');
    } else if (!isProfileComplete && !userRole) {
      navigate(`/profile/${address}`);
    }
  }, [isConnected, isProfileComplete, userRole, address, navigate]);

  // Mock data - in a real app, this would come from the blockchain or API
  const projects = [
    {
      id: '1',
      title: 'Website Development',
      client: '0x8f7C...9e2A',
      freelancer: '0x3b2D...6fA1',
      status: 'active',
      totalValue: '2.5',
      currency: 'ETH',
      completedMilestones: 1,
      totalMilestones: 3,
      lastActivity: new Date('2025-06-20T14:30:00'),
    },
    {
      id: '2',
      title: 'Logo Design',
      client: '0x8f7C...9e2A',
      freelancer: '0x3b2D...6fA1',
      status: 'completed',
      totalValue: '0.8',
      currency: 'ETH',
      completedMilestones: 2,
      totalMilestones: 2,
      lastActivity: new Date('2025-06-18T09:15:00'),
    },
    {
      id: '3',
      title: 'Mobile App UI Design',
      client: '0xaF23...7bC1',
      freelancer: '0x3b2D...6fA1',
      status: 'pending',
      totalValue: '1.2',
      currency: 'ETH',
      completedMilestones: 0,
      totalMilestones: 2,
      lastActivity: new Date('2025-06-21T11:45:00'),
    },
  ];

  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="escrow-status escrow-status-active">Active</span>;
      case 'completed':
        return <span className="escrow-status escrow-status-completed">Completed</span>;
      case 'pending':
        return <span className="escrow-status escrow-status-pending">Pending</span>;
      case 'disputed':
        return <span className="escrow-status escrow-status-disputed">Disputed</span>;
      default:
        return null;
    }
  };

  if (!isConnected) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-12 gap-6">
        {/* Sidebar */}
        <div className="col-span-12 lg:col-span-3">
          <div className="card sticky top-24">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white text-xl font-semibold mb-4">
                {currentUser?.name ? currentUser.name.charAt(0) : <User size={32} />}
              </div>
              <h2 className="text-xl font-semibold">{currentUser?.name || 'Unknown User'}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 mb-2">
                {currentUser?.role === 'freelancer' ? 'Freelancer' : 'Client'}
              </p>
              <div className="text-sm bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1">
                {address ? `${address.substring(0, 6)}...${address.substring(address.length - 4)}` : ''}
              </div>
            </div>

            <div className="border-t border-b border-gray-200 dark:border-gray-700 py-4 mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">Wallet Balance</span>
                <div className="flex items-center">
                  <CryptoCurrencyLogo symbol="ETH" className="w-4 h-4 mr-1" />
                  <span className="font-medium">{parseFloat(balance).toFixed(4)} ETH</span>
                </div>
              </div>
              {currentUser?.role === 'freelancer' && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">In Escrow</span>
                  <div className="flex items-center">
                    <CryptoCurrencyLogo symbol="ETH" className="w-4 h-4 mr-1" />
                    <span className="font-medium">3.7 ETH</span>
                  </div>
                </div>
              )}
            </div>

            <nav className="space-y-1">
              <button
                onClick={() => setSelectedSection('overview')}
                className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors ${
                  selectedSection === 'overview'
                    ? 'bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <BarChart3 size={18} className="mr-3" />
                <span>Dashboard Overview</span>
              </button>
              <button
                onClick={() => setSelectedSection('projects')}
                className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors ${
                  selectedSection === 'projects'
                    ? 'bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <BriefcaseBusiness size={18} className="mr-3" />
                <span>My Projects</span>
              </button>
              <button
                onClick={() => setSelectedSection('messages')}
                className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors ${
                  selectedSection === 'messages'
                    ? 'bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <MessageSquare size={18} className="mr-3" />
                <span>Messages</span>
              </button>
              <Link
                to={`/profile/${address}`}
                className="w-full flex items-center px-3 py-2 rounded-lg text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <User size={18} className="mr-3" />
                <span>My Profile</span>
              </Link>
            </nav>
          </div>
        </div>

        {/* Main content */}
        <div className="col-span-12 lg:col-span-9 space-y-6">
          {selectedSection === 'overview' && (
            <>
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card bg-gradient-to-br from-primary-500 to-primary-600 text-white">
                  <div className="flex items-center">
                    <div className="mr-4 p-3 bg-white/20 rounded-lg">
                      <BriefcaseBusiness size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Active Projects</h3>
                      <p className="text-2xl font-bold">2</p>
                    </div>
                  </div>
                </div>
                <div className="card bg-gradient-to-br from-secondary-500 to-secondary-600 text-white">
                  <div className="flex items-center">
                    <div className="mr-4 p-3 bg-white/20 rounded-lg">
                      <DollarSign size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Total Earned</h3>
                      <p className="text-2xl font-bold">4.25 ETH</p>
                    </div>
                  </div>
                </div>
                <div className="card bg-gradient-to-br from-accent-500 to-accent-600 text-white">
                  <div className="flex items-center">
                    <div className="mr-4 p-3 bg-white/20 rounded-lg">
                      <FileText size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Completed Projects</h3>
                      <p className="text-2xl font-bold">5</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent projects */}
              <div className="card">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Recent Projects</h2>
                  <Link to="/projects" className="text-primary-600 dark:text-primary-400 hover:underline flex items-center text-sm">
                    View All Projects
                  </Link>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left border-b border-gray-200 dark:border-gray-700">
                        <th className="pb-3 font-medium text-gray-500 dark:text-gray-400">Project</th>
                        <th className="pb-3 font-medium text-gray-500 dark:text-gray-400">Status</th>
                        <th className="pb-3 font-medium text-gray-500 dark:text-gray-400">Value</th>
                        <th className="pb-3 font-medium text-gray-500 dark:text-gray-400">Progress</th>
                        <th className="pb-3 font-medium text-gray-500 dark:text-gray-400">Last Activity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {projects.map((project) => (
                        <tr key={project.id} className="border-b border-gray-100 dark:border-gray-800">
                          <td className="py-4">
                            <Link to={`/projects/${project.id}`} className="font-medium hover:text-primary-600 dark:hover:text-primary-400">
                              {project.title}
                            </Link>
                          </td>
                          <td className="py-4">{renderStatusBadge(project.status)}</td>
                          <td className="py-4">
                            <div className="flex items-center">
                              <CryptoCurrencyLogo symbol={project.currency} className="w-4 h-4 mr-1" />
                              <span>{project.totalValue} {project.currency}</span>
                            </div>
                          </td>
                          <td className="py-4">
                            <div className="flex items-center">
                              <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-2">
                                <div 
                                  className="bg-primary-500 h-2 rounded-full" 
                                  style={{ width: `${(project.completedMilestones / project.totalMilestones) * 100}%` }}
                                ></div>
                              </div>
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                {project.completedMilestones}/{project.totalMilestones}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 text-sm text-gray-600 dark:text-gray-400">
                            {format(project.lastActivity, 'MMM d, yyyy')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Recent activities */}
              <div className="card">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Recent Activity</h2>
                </div>
                <div className="space-y-4">
                  <div className="flex">
                    <div className="mr-4 p-2 bg-success-100 dark:bg-success-900/40 rounded-full h-fit">
                      <DollarSign size={18} className="text-success-600 dark:text-success-400" />
                    </div>
                    <div>
                      <p className="font-medium">Payment Released</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        1.5 ETH for "Website Development" milestone completion
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        <Clock size={12} className="inline mr-1" />
                        10 hours ago
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="mr-4 p-2 bg-primary-100 dark:bg-primary-900/40 rounded-full h-fit">
                      <MessageSquare size={18} className="text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <p className="font-medium">New Message</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Client sent you a message about "Logo Design"
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        <Clock size={12} className="inline mr-1" />
                        Yesterday
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="mr-4 p-2 bg-secondary-100 dark:bg-secondary-900/40 rounded-full h-fit">
                      <BriefcaseBusiness size={18} className="text-secondary-600 dark:text-secondary-400" />
                    </div>
                    <div>
                      <p className="font-medium">Project Started</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        "Mobile App UI Design" project has been initiated
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        <Clock size={12} className="inline mr-1" />
                        2 days ago
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {selectedSection === 'projects' && (
            <div className="card">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">My Projects</h2>
                <Link to="/projects" className="btn-primary py-1.5 px-3 text-sm">
                  <PlusCircle size={16} className="mr-1" />
                  {currentUser?.role === 'client' ? 'Post New Job' : 'Find Work'}
                </Link>
              </div>
              
              <div className="mb-6">
                <div className="flex space-x-4 border-b border-gray-200 dark:border-gray-700">
                  <button className="px-4 py-2 text-primary-600 dark:text-primary-400 border-b-2 border-primary-500 font-medium">
                    All Projects
                  </button>
                  <button className="px-4 py-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                    Active
                  </button>
                  <button className="px-4 py-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                    Completed
                  </button>
                  <button className="px-4 py-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                    Pending
                  </button>
                </div>
              </div>
              
              {projects.length > 0 ? (
                <div className="space-y-6">
                  {projects.map((project) => (
                    <div key={project.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <Link to={`/projects/${project.id}`} className="text-lg font-medium hover:text-primary-600 dark:hover:text-primary-400">
                            {project.title}
                          </Link>
                          <div className="flex items-center mt-1 text-sm text-gray-500 dark:text-gray-400">
                            <span className="mr-2">ID: {project.id}</span>
                            <span className="mr-2">•</span>
                            <span>{format(project.lastActivity, 'MMM d, yyyy')}</span>
                          </div>
                        </div>
                        {renderStatusBadge(project.status)}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Value</p>
                          <div className="flex items-center">
                            <CryptoCurrencyLogo symbol={project.currency} className="w-4 h-4 mr-1" />
                            <span className="font-medium">{project.totalValue} {project.currency}</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                            {currentUser?.role === 'client' ? 'Freelancer' : 'Client'}
                          </p>
                          <p className="font-medium">
                            {currentUser?.role === 'client' ? project.freelancer : project.client}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Progress</p>
                          <div className="flex items-center">
                            <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-2">
                              <div 
                                className="bg-primary-500 h-2 rounded-full" 
                                style={{ width: `${(project.completedMilestones / project.totalMilestones) * 100}%` }}
                              ></div>
                            </div>
                            <span className="text-sm">
                              {project.completedMilestones}/{project.totalMilestones} milestones
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-end space-x-3">
                        <Link 
                          to={`/messages?project=${project.id}`}
                          className="btn-outline py-1.5 px-3 text-sm"
                        >
                          <MessageSquare size={14} className="mr-1" />
                          Messages
                        </Link>
                        <Link 
                          to={`/projects/${project.id}`}
                          className="btn-primary py-1.5 px-3 text-sm"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="mb-4 text-gray-400 dark:text-gray-500">
                    <BriefcaseBusiness size={48} className="mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No projects yet</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-6">
                    {currentUser?.role === 'client' 
                      ? "You haven't posted any jobs yet." 
                      : "You haven't applied to any projects yet."}
                  </p>
                  <Link to="/projects" className="btn-primary">
                    {currentUser?.role === 'client' ? 'Post a Job' : 'Find Work'}
                  </Link>
                </div>
              )}
            </div>
          )}

          {selectedSection === 'messages' && (
            <div className="card min-h-[400px] flex items-center justify-center">
              <div className="text-center">
                <MessageSquare size={48} className="mx-auto text-gray-400 dark:text-gray-500 mb-4" />
                <h3 className="text-lg font-medium mb-2">Your messages will appear here</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  Messages from your projects and collaborators will be shown in this section.
                </p>
                <Link to="/messages" className="btn-primary">
                  Go to Messages
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;