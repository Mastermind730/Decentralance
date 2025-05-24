import { useState } from 'react';
import { Search, Filter, Briefcase as BriefcaseBusiness, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CryptoCurrencyLogo } from '../components/ui/WalletLogos';

const ProjectsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Mock data - in a real app, this would come from the blockchain or API
  const projects = [
    {
      id: '1',
      title: 'Full Stack Web Application Development',
      description: 'Looking for an experienced developer to build a full-stack web application with React, Node.js, and blockchain integration for a decentralized marketplace.',
      budget: '3.5',
      currency: 'ETH',
      category: 'Web Development',
      skills: ['React', 'Node.js', 'Smart Contracts', 'Web3'],
      posted: '2 days ago',
      proposals: 4,
      client: {
        address: '0x8f7C...9e2A',
        rating: 4.8,
        projectsPosted: 12,
      },
    },
    {
      id: '2',
      title: 'NFT Collection Smart Contract Development',
      description: 'Need a developer to create and deploy an ERC-721 smart contract for an NFT collection with royalty mechanisms and marketplace integration.',
      budget: '2.2',
      currency: 'ETH',
      category: 'Blockchain',
      skills: ['Solidity', 'ERC-721', 'NFTs', 'Smart Contracts'],
      posted: '3 days ago',
      proposals: 7,
      client: {
        address: '0xaF23...7bC1',
        rating: 4.5,
        projectsPosted: 8,
      },
    },
    {
      id: '3',
      title: 'UI/UX Design for DeFi Platform',
      description: 'Seeking a creative UI/UX designer to design a modern, user-friendly interface for a DeFi platform focusing on staking and yield farming.',
      budget: '1.8',
      currency: 'ETH',
      category: 'Design',
      skills: ['UI/UX', 'Figma', 'DeFi', 'Web Design'],
      posted: '1 day ago',
      proposals: 3,
      client: {
        address: '0x3eF1...8dA2',
        rating: 4.9,
        projectsPosted: 5,
      },
    },
    {
      id: '4',
      title: 'Crypto Wallet Mobile App Development',
      description: 'Looking for a mobile developer to create a secure crypto wallet app for iOS and Android with multi-chain support and biometric authentication.',
      budget: '4.0',
      currency: 'ETH',
      category: 'Mobile Development',
      skills: ['React Native', 'Blockchain', 'Mobile Security', 'Crypto'],
      posted: '4 days ago',
      proposals: 6,
      client: {
        address: '0x9bC3...4eF5',
        rating: 4.7,
        projectsPosted: 9,
      },
    },
    {
      id: '5',
      title: 'Smart Contract Security Audit',
      description: 'Need an experienced security professional to audit smart contracts for a DeFi protocol before mainnet launch. Must have previous audit experience.',
      budget: '2.5',
      currency: 'ETH',
      category: 'Security',
      skills: ['Smart Contract Auditing', 'Solidity', 'Security', 'DeFi'],
      posted: '2 days ago',
      proposals: 2,
      client: {
        address: '0x2dA7...1cF8',
        rating: 5.0,
        projectsPosted: 3,
      },
    },
  ];

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'web-development', name: 'Web Development' },
    { id: 'blockchain', name: 'Blockchain' },
    { id: 'design', name: 'Design' },
    { id: 'mobile-development', name: 'Mobile Development' },
    { id: 'security', name: 'Security' },
  ];

  // Filter projects based on search term and category
  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          project.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || 
                            project.category.toLowerCase() === selectedCategory.replace('-', ' ');
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Find Work or Post a Project</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Browse through available projects or post your own job to find the perfect match for your needs.
        </p>
      </div>

      <div className="flex justify-center mb-8">
        <Link to="/projects/post" className="btn-primary mx-2">
          Post a Project
        </Link>
        <Link to="/projects" className="btn-outline mx-2">
          Find Work
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters */}
        <div className="lg:col-span-1">
          <div className="card sticky top-24">
            <h2 className="text-xl font-semibold mb-4">Filters</h2>
            
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Search projects..."
                className="input pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium mb-3 flex items-center">
                <Filter size={16} className="mr-2" />
                Categories
              </h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium mb-3">Budget Range</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Min</label>
                  <input type="number" className="input" placeholder="0" />
                </div>
                <div>
                  <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Max</label>
                  <input type="number" className="input" placeholder="5" />
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-3">Skills</h3>
              <div className="flex flex-wrap gap-2">
                <span className="badge-primary">Smart Contracts</span>
                <span className="badge-primary">React</span>
                <span className="badge-primary">Solidity</span>
                <span className="badge-primary">UI/UX</span>
                <span className="badge-primary">Web3</span>
                <span className="badge-secondary">+ Add Skill</span>
              </div>
            </div>
          </div>
        </div>

        {/* Projects list */}
        <div className="lg:col-span-3">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Available Projects</h2>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Showing {filteredProjects.length} of {projects.length} projects
            </div>
          </div>

          {filteredProjects.length > 0 ? (
            <div className="space-y-6">
              {filteredProjects.map((project) => (
                <div key={project.id} className="card hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <Link to={`/projects/${project.id}`} className="text-xl font-semibold hover:text-primary-600 dark:hover:text-primary-400">
                        {project.title}
                      </Link>
                      <div className="flex items-center mt-1 text-sm text-gray-500 dark:text-gray-400">
                        <span>{project.posted}</span>
                        <span className="mx-2">•</span>
                        <span>{project.proposals} proposals</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <CryptoCurrencyLogo symbol={project.currency} className="w-5 h-5 mr-1" />
                      <span className="font-semibold">{project.budget} {project.currency}</span>
                    </div>
                  </div>
                  
                  <p className="my-4 text-gray-600 dark:text-gray-400">
                    {project.description.length > 200 
                      ? `${project.description.substring(0, 200)}...` 
                      : project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.skills.map((skill, index) => (
                      <span key={index} className="badge-secondary">{skill}</span>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-sm">
                      <span className="text-gray-500 dark:text-gray-400 mr-1">Client:</span>
                      <span className="font-medium mr-3">{project.client.address}</span>
                      <span className="flex items-center">
                        <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <span className="ml-1">{project.client.rating}</span>
                        <span className="ml-2">({project.client.projectsPosted} projects)</span>
                      </span>
                    </div>
                    <Link to={`/projects/${project.id}`} className="btn-primary py-1.5 px-4 text-sm">
                      View Details <ArrowRight size={14} className="ml-1" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="card text-center py-12">
              <div className="mb-4 text-gray-400 dark:text-gray-500">
                <BriefcaseBusiness size={48} className="mx-auto" />
              </div>
              <h3 className="text-lg font-medium mb-2">No projects found</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                No projects match your current search criteria. Try adjusting your filters or search term.
              </p>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="btn-primary"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;