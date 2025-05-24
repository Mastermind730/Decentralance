import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  User, 
  Calendar, 
  Clock, 
  Shield, 
  CheckCircle, 
  MessageSquare,
  Send,
  DollarSign,
  AlertCircle
} from 'lucide-react';
import { useWallet } from '../contexts/WalletContext';
import { useUser } from '../contexts/UserContext';
import { CryptoCurrencyLogo } from '../components/ui/WalletLogos';
import { format } from 'date-fns';

const ProjectDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { isConnected, address } = useWallet();
  const { currentUser } = useUser();
  const [showSubmitProposal, setShowSubmitProposal] = useState(false);
  const [showReleaseMilestone, setShowReleaseMilestone] = useState(false);
  
  // Mock project data - in a real app, this would be fetched from the blockchain
  const project = {
    id: id || '1',
    title: 'Full Stack Web Application Development',
    description: `Looking for an experienced developer to build a full-stack web application with React, Node.js, and blockchain integration for a decentralized marketplace. The project involves:

1. User authentication using Web3 wallets
2. Smart contract integration for secure transactions
3. Responsive UI design for both desktop and mobile
4. Backend API development with Node.js
5. Database design and implementation

The ideal candidate will have experience with React, Node.js, and Web3 development, with a portfolio of similar projects.`,
    budget: '3.5',
    currency: 'ETH',
    category: 'Web Development',
    skills: ['React', 'Node.js', 'Smart Contracts', 'Web3', 'JavaScript', 'Solidity'],
    posted: new Date('2025-06-20T14:30:00'),
    deadline: new Date('2025-07-20T14:30:00'),
    proposals: 4,
    client: {
      address: '0x8f7C...9e2A',
      rating: 4.8,
      projectsPosted: 12,
      joinedDate: new Date('2024-03-15'),
    },
    milestones: [
      {
        id: 'm1',
        title: 'Frontend UI Development',
        description: 'Create the responsive user interface with React',
        amount: '1.0',
        currency: 'ETH',
        status: 'completed',
        dueDate: new Date('2025-06-30'),
      },
      {
        id: 'm2',
        title: 'Smart Contract Integration',
        description: 'Develop and integrate the necessary smart contracts',
        amount: '1.5',
        currency: 'ETH',
        status: 'active',
        dueDate: new Date('2025-07-10'),
      },
      {
        id: 'm3',
        title: 'Backend API Development',
        description: 'Complete the backend API with Node.js',
        amount: '1.0',
        currency: 'ETH',
        status: 'pending',
        dueDate: new Date('2025-07-20'),
      },
    ],
    freelancer: {
      address: '0x3b2D...6fA1',
      rating: 4.9,
      completedProjects: 18,
      joinedDate: new Date('2024-02-10'),
    },
    status: 'active',
  };

  // In a real app, we'd check if the current user is the client or the freelancer
  const isClient = address && address.startsWith('0x8f7C');
  const isFreelancer = address && address.startsWith('0x3b2D');
  const canSubmitProposal = isConnected && currentUser?.role === 'freelancer' && !isFreelancer;

  const renderMilestoneStatus = (status: string) => {
    switch (status) {
      case 'completed':
        return <span className="escrow-status escrow-status-completed">Completed</span>;
      case 'active':
        return <span className="escrow-status escrow-status-active">Active</span>;
      case 'pending':
        return <span className="escrow-status escrow-status-pending">Pending</span>;
      case 'disputed':
        return <span className="escrow-status escrow-status-disputed">Disputed</span>;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link to="/projects" className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
          <ArrowLeft size={16} className="mr-2" />
          Back to Projects
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-2xl md:text-3xl font-bold">{project.title}</h1>
              <span className="escrow-status escrow-status-active">Active</span>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {project.skills.map((skill, index) => (
                <span key={index} className="badge-secondary">{skill}</span>
              ))}
            </div>
            
            <div className="prose dark:prose-invert max-w-none mb-6">
              <p className="whitespace-pre-line">{project.description}</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Budget</p>
                <div className="flex items-center font-semibold">
                  <CryptoCurrencyLogo symbol={project.currency} className="w-4 h-4 mr-1" />
                  {project.budget} {project.currency}
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Posted</p>
                <p className="font-semibold">{format(project.posted, 'MMM d, yyyy')}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Deadline</p>
                <p className="font-semibold">{format(project.deadline, 'MMM d, yyyy')}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Proposals</p>
                <p className="font-semibold">{project.proposals}</p>
              </div>
            </div>
            
            {(isClient || isFreelancer) && (
              <div className="flex justify-end space-x-3">
                <button className="btn-outline py-1.5 px-4">
                  <MessageSquare size={16} className="mr-1" />
                  Message
                </button>
                {canSubmitProposal && (
                  <button 
                    className="btn-primary py-1.5 px-4"
                    onClick={() => setShowSubmitProposal(true)}
                  >
                    Submit Proposal
                  </button>
                )}
                {isClient && (
                  <button className="btn-accent py-1.5 px-4">
                    <AlertCircle size={16} className="mr-1" />
                    Report Issue
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Milestones section */}
          {(isClient || isFreelancer) && (
            <div className="card">
              <h2 className="text-xl font-semibold mb-6">Project Milestones</h2>
              
              <div className="space-y-6">
                {project.milestones.map((milestone, index) => (
                  <div key={milestone.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center mr-3">
                          <span className="font-medium text-primary-700 dark:text-primary-300">{index + 1}</span>
                        </div>
                        <h3 className="font-semibold">{milestone.title}</h3>
                      </div>
                      {renderMilestoneStatus(milestone.status)}
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-400 ml-11 mb-4">{milestone.description}</p>
                    
                    <div className="flex justify-between items-center ml-11">
                      <div className="flex items-center space-x-4">
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Amount</p>
                          <div className="flex items-center font-medium">
                            <CryptoCurrencyLogo symbol={milestone.currency} className="w-4 h-4 mr-1" />
                            {milestone.amount} {milestone.currency}
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Due Date</p>
                          <p className="font-medium">{format(milestone.dueDate, 'MMM d, yyyy')}</p>
                        </div>
                      </div>
                      
                      {isClient && milestone.status === 'active' && (
                        <button 
                          className="btn-primary py-1.5 px-3 text-sm"
                          onClick={() => setShowReleaseMilestone(true)}
                        >
                          <CheckCircle size={14} className="mr-1" />
                          Release Payment
                        </button>
                      )}
                      
                      {isFreelancer && milestone.status === 'active' && (
                        <button className="btn-primary py-1.5 px-3 text-sm">
                          <CheckCircle size={14} className="mr-1" />
                          Submit for Approval
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Total Budget</p>
                    <div className="flex items-center text-xl font-semibold">
                      <CryptoCurrencyLogo symbol={project.currency} className="w-5 h-5 mr-1" />
                      {project.budget} {project.currency}
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Completion</p>
                    <div className="flex items-center">
                      <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-3 mr-2">
                        <div 
                          className="bg-primary-500 h-3 rounded-full" 
                          style={{ width: '33%' }}
                        ></div>
                      </div>
                      <span className="font-semibold">33%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Project communication - only visible to involved parties */}
          {(isClient || isFreelancer) && (
            <div className="card">
              <h2 className="text-xl font-semibold mb-6">Project Communication</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex">
                  <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/40 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    {project.client.address.charAt(2)}
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 max-w-[80%]">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Client • 2 days ago</p>
                    <p>How's the progress on the smart contract integration? Any blockers I should know about?</p>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <div className="bg-primary-100 dark:bg-primary-900/40 rounded-lg p-3 max-w-[80%]">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Freelancer • 1 day ago</p>
                    <p>The integration is going well. I've completed the basic functionality and I'm now testing edge cases. Should be ready for review in the next 2 days.</p>
                  </div>
                  <div className="w-10 h-10 bg-secondary-100 dark:bg-secondary-900/40 rounded-full flex items-center justify-center ml-3 flex-shrink-0">
                    {project.freelancer.address.charAt(2)}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center">
                <input type="text" className="input flex-grow mr-3" placeholder="Type your message..." />
                <button className="btn-primary p-2 rounded-full">
                  <Send size={20} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Client info */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Client Information</h2>
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/40 rounded-full flex items-center justify-center mr-3">
                <User size={20} className="text-primary-700 dark:text-primary-300" />
              </div>
              <div>
                <p className="font-medium">{project.client.address}</p>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <span className="ml-1">{project.client.rating} Rating</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start">
                <Calendar size={18} className="mr-2 text-gray-500 dark:text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Member Since</p>
                  <p className="font-medium">{format(project.client.joinedDate, 'MMMM yyyy')}</p>
                </div>
              </div>
              <div className="flex items-start">
                <BriefcaseBusiness size={18} className="mr-2 text-gray-500 dark:text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Projects Posted</p>
                  <p className="font-medium">{project.client.projectsPosted}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Freelancer info - only shown if there's an assigned freelancer */}
          {project.freelancer && (
            <div className="card">
              <h2 className="text-xl font-semibold mb-4">Freelancer Information</h2>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-secondary-100 dark:bg-secondary-900/40 rounded-full flex items-center justify-center mr-3">
                  <User size={20} className="text-secondary-700 dark:text-secondary-300" />
                </div>
                <div>
                  <p className="font-medium">{project.freelancer.address}</p>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <span className="ml-1">{project.freelancer.rating} Rating</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start">
                  <Calendar size={18} className="mr-2 text-gray-500 dark:text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Member Since</p>
                    <p className="font-medium">{format(project.freelancer.joinedDate, 'MMMM yyyy')}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle size={18} className="mr-2 text-gray-500 dark:text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Completed Projects</p>
                    <p className="font-medium">{project.freelancer.completedProjects}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Project security features */}
          <div className="card bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Shield size={20} className="mr-2 text-primary-600 dark:text-primary-400" />
              Security Features
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/40 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <DollarSign size={16} className="text-primary-700 dark:text-primary-300" />
                </div>
                <div>
                  <p className="font-medium">Secure Escrow</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Funds are held in a secure smart contract and only released when work is approved.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/40 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <Clock size={16} className="text-primary-700 dark:text-primary-300" />
                </div>
                <div>
                  <p className="font-medium">Milestone Payments</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Break projects into milestones and release payments incrementally as work is completed.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/40 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <AlertCircle size={16} className="text-primary-700 dark:text-primary-300" />
                </div>
                <div>
                  <p className="font-medium">Dispute Resolution</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Fair arbitration process if there's a disagreement between parties.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Proposal Modal */}
      {showSubmitProposal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-lg animate-fade-in">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
              <h2 className="text-xl font-semibold">Submit Proposal</h2>
              <button onClick={() => setShowSubmitProposal(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Your Bid Amount
                </label>
                <div className="flex">
                  <div className="flex items-center px-3 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 border-r-0 rounded-l-lg">
                    <CryptoCurrencyLogo symbol="ETH" className="w-5 h-5" />
                  </div>
                  <input type="number" className="input rounded-l-none" defaultValue={project.budget} />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Client's budget: {project.budget} ETH
                </p>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Estimated Completion Time
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <input type="number" className="input" placeholder="Duration" />
                  <select className="input">
                    <option>Days</option>
                    <option>Weeks</option>
                    <option>Months</option>
                  </select>
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Cover Letter
                </label>
                <textarea 
                  className="input min-h-[150px]" 
                  placeholder="Explain why you're the best fit for this project..."
                ></textarea>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button 
                  onClick={() => setShowSubmitProposal(false)}
                  className="btn-outline"
                >
                  Cancel
                </button>
                <button className="btn-primary">
                  Submit Proposal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Release Milestone Modal */}
      {showReleaseMilestone && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-md animate-fade-in">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
              <h2 className="text-xl font-semibold">Release Milestone Payment</h2>
              <button onClick={() => setShowReleaseMilestone(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6">
              <div className="bg-success-50 dark:bg-success-900/20 border border-success-200 dark:border-success-800 rounded-lg p-4 mb-6">
                <div className="flex items-start">
                  <CheckCircle size={20} className="text-success-600 dark:text-success-400 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium text-success-800 dark:text-success-300">Confirm Milestone Completion</p>
                    <p className="text-sm text-success-700 dark:text-success-400">
                      You're about to release <span className="font-semibold">1.5 ETH</span> for the "Smart Contract Integration" milestone.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Rating (Optional)
                </label>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-6 h-6 text-gray-300 dark:text-gray-600 cursor-pointer hover:text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Feedback (Optional)
                </label>
                <textarea 
                  className="input" 
                  placeholder="Provide feedback on the completed work..."
                ></textarea>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button 
                  onClick={() => setShowReleaseMilestone(false)}
                  className="btn-outline"
                >
                  Cancel
                </button>
                <button className="btn-primary">
                  Release Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetailsPage;