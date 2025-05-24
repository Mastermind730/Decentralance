import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { User, Edit, Star, Calendar, CheckCircle, Briefcase as BriefcaseBusiness, Save, X, ChevronRight, Plus, Trash2 } from 'lucide-react';
import { useWallet } from '../contexts/WalletContext';
import { useUser } from '../contexts/UserContext';
import { format } from 'date-fns';

const ProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const { isConnected, address } = useWallet();
  const { currentUser, userRole, setUserRole, createProfile, updateProfile } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'freelancer' | 'client' | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    skills: [] as string[],
    portfolio: [] as { title: string; description: string; link: string }[],
  });
  
  const [newSkill, setNewSkill] = useState('');
  const [newPortfolioItem, setNewPortfolioItem] = useState({
    title: '',
    description: '',
    link: '',
  });

  // Determine if this is the current user's profile
  const isCurrentUser = id === address;
  
  // Check if this is a new profile setup
  const isNewProfile = isCurrentUser && !currentUser;
  
  // If this is the current user and they don't have a role yet, show role selection
  const showRoleSelection = isCurrentUser && (!userRole || isNewProfile);

  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name || '',
        bio: currentUser.bio || '',
        skills: currentUser.skills || [],
        portfolio: currentUser.portfolio || [],
      });
      if (currentUser.role) {
        setSelectedRole(currentUser.role);
      }
    }
  }, [currentUser]);

  const handleRoleSelect = (role: 'freelancer' | 'client') => {
    setSelectedRole(role);
    setUserRole(role);
  };

  const handleStartEditing = () => {
    setIsEditing(true);
  };

  const handleCancelEditing = () => {
    setIsEditing(false);
    if (currentUser) {
      setFormData({
        name: currentUser.name || '',
        bio: currentUser.bio || '',
        skills: currentUser.skills || [],
        portfolio: currentUser.portfolio || [],
      });
    }
  };

  const handleSaveProfile = () => {
    if (isNewProfile || !currentUser) {
      createProfile(formData);
    } else {
      updateProfile(formData);
    }
    setIsEditing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddSkill = () => {
    if (newSkill && !formData.skills.includes(newSkill)) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill],
      }));
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill),
    }));
  };

  const handleAddPortfolioItem = () => {
    if (newPortfolioItem.title && newPortfolioItem.description) {
      setFormData(prev => ({
        ...prev,
        portfolio: [...prev.portfolio, { ...newPortfolioItem }],
      }));
      setNewPortfolioItem({
        title: '',
        description: '',
        link: '',
      });
    }
  };

  const handleRemovePortfolioItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      portfolio: prev.portfolio.filter((_, i) => i !== index),
    }));
  };

  const handlePortfolioInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewPortfolioItem(prev => ({ ...prev, [name]: value }));
  };

  // Mock data for the profile if we don't have real data yet
  const profileData = currentUser || {
    id: id || '',
    role: selectedRole,
    name: formData.name,
    bio: formData.bio,
    skills: formData.skills,
    portfolio: formData.portfolio,
    rating: 0,
    reviewCount: 0,
    completedProjects: 0,
    joinedDate: new Date().toISOString(),
  };

  // If it's a new profile and role selection is not yet done, show role selection screen
  if (showRoleSelection && !selectedRole) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto card">
          <h1 className="text-2xl font-bold mb-8 text-center">Select Your Role</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <button
              onClick={() => handleRoleSelect('client')}
              className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary-500 dark:hover:border-primary-500 hover:shadow-md transition-all focus:outline-none group"
            >
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/40 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 dark:group-hover:bg-primary-800/60 transition-colors">
                <BriefcaseBusiness size={32} className="text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-lg font-semibold text-center mb-2">Client</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                Post projects and hire freelancers for your work.
              </p>
            </button>
            
            <button
              onClick={() => handleRoleSelect('freelancer')}
              className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-secondary-500 dark:hover:border-secondary-500 hover:shadow-md transition-all focus:outline-none group"
            >
              <div className="w-16 h-16 bg-secondary-100 dark:bg-secondary-900/40 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary-200 dark:group-hover:bg-secondary-800/60 transition-colors">
                <User size={32} className="text-secondary-600 dark:text-secondary-400" />
              </div>
              <h3 className="text-lg font-semibold text-center mb-2">Freelancer</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                Find work and offer your services to clients.
              </p>
            </button>
          </div>
          
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            You can change your role later from your profile settings.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main profile information */}
        <div className="lg:col-span-2">
          <div className="card mb-8">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center">
                <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white text-2xl font-semibold mr-6">
                  {profileData.name ? profileData.name.charAt(0) : <User size={36} />}
                </div>
                
                <div>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your Name"
                      className="input text-2xl font-bold mb-1 py-1"
                    />
                  ) : (
                    <h1 className="text-2xl md:text-3xl font-bold mb-1">
                      {profileData.name || 'Anonymous User'}
                    </h1>
                  )}
                  
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <span className="bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 px-3 py-1 rounded-full text-sm font-medium">
                      {profileData.role === 'freelancer' ? 'Freelancer' : 'Client'}
                    </span>
                    
                    <div className="flex items-center ml-4">
                      <Star size={16} className="text-yellow-400 mr-1" />
                      <span>{profileData.rating} ({profileData.reviewCount} reviews)</span>
                    </div>
                    
                    <span className="mx-3">•</span>
                    
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-1" />
                      <span>Joined {format(new Date(profileData.joinedDate), 'MMMM yyyy')}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {isCurrentUser && (
                <div>
                  {isEditing ? (
                    <div className="flex space-x-2">
                      <button 
                        onClick={handleCancelEditing}
                        className="btn-outline py-1.5 px-3 text-sm"
                      >
                        <X size={16} className="mr-1" />
                        Cancel
                      </button>
                      <button 
                        onClick={handleSaveProfile}
                        className="btn-primary py-1.5 px-3 text-sm"
                      >
                        <Save size={16} className="mr-1" />
                        Save Profile
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={handleStartEditing}
                      className="btn-outline py-1.5 px-3 text-sm"
                    >
                      <Edit size={16} className="mr-1" />
                      Edit Profile
                    </button>
                  )}
                </div>
              )}
            </div>
            
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3">About</h2>
              {isEditing ? (
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  placeholder="Tell clients about yourself, your experience, and your expertise..."
                  className="input min-h-[150px] w-full"
                ></textarea>
              ) : (
                <p className="text-gray-700 dark:text-gray-300">
                  {profileData.bio || 'No bio provided yet.'}
                </p>
              )}
            </div>
            
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3">Skills</h2>
              
              {isEditing ? (
                <div>
                  <div className="flex mb-3">
                    <input
                      type="text"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      placeholder="Add a skill (e.g., React, Solidity, UI Design)"
                      className="input flex-grow mr-2"
                    />
                    <button 
                      onClick={handleAddSkill}
                      className="btn-primary px-3"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {formData.skills.map((skill, index) => (
                      <div key={index} className="flex items-center bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                        <span>{skill}</span>
                        <button 
                          onClick={() => handleRemoveSkill(skill)}
                          className="ml-2 text-gray-500 hover:text-error-600 dark:hover:text-error-400"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                    {formData.skills.length === 0 && (
                      <p className="text-gray-500 dark:text-gray-400 text-sm">Add some skills to showcase your expertise.</p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {profileData.skills && profileData.skills.length > 0 ? (
                    profileData.skills.map((skill, index) => (
                      <span key={index} className="badge-secondary">{skill}</span>
                    ))
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400">No skills listed yet.</p>
                  )}
                </div>
              )}
            </div>
          </div>
          
          {/* Portfolio section - Only for freelancers */}
          {(profileData.role === 'freelancer' || selectedRole === 'freelancer') && (
            <div className="card">
              <h2 className="text-lg font-semibold mb-6">Portfolio</h2>
              
              {isEditing ? (
                <div>
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-6">
                    <h3 className="font-medium mb-3">Add New Portfolio Item</h3>
                    
                    <div className="mb-3">
                      <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Title</label>
                      <input
                        type="text"
                        name="title"
                        value={newPortfolioItem.title}
                        onChange={handlePortfolioInputChange}
                        placeholder="Project title"
                        className="input"
                      />
                    </div>
                    
                    <div className="mb-3">
                      <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Description</label>
                      <textarea
                        name="description"
                        value={newPortfolioItem.description}
                        onChange={handlePortfolioInputChange}
                        placeholder="Describe your project"
                        className="input"
                      ></textarea>
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Link (optional)</label>
                      <input
                        type="text"
                        name="link"
                        value={newPortfolioItem.link}
                        onChange={handlePortfolioInputChange}
                        placeholder="https://example.com"
                        className="input"
                      />
                    </div>
                    
                    <button 
                      onClick={handleAddPortfolioItem}
                      className="btn-primary py-1.5 px-3 text-sm"
                    >
                      <Plus size={16} className="mr-1" />
                      Add Portfolio Item
                    </button>
                  </div>
                  
                  {formData.portfolio.length > 0 ? (
                    <div className="space-y-4">
                      {formData.portfolio.map((item, index) => (
                        <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium">{item.title}</h3>
                            <button 
                              onClick={() => handleRemovePortfolioItem(index)}
                              className="text-error-600 dark:text-error-400"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <p className="text-gray-600 dark:text-gray-400 my-2">{item.description}</p>
                          {item.link && (
                            <a 
                              href={item.link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-primary-600 dark:text-primary-400 hover:underline text-sm flex items-center"
                            >
                              View Project <ChevronRight size={14} className="ml-1" />
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-6">
                      Add portfolio items to showcase your work.
                    </p>
                  )}
                </div>
              ) : (
                <div>
                  {profileData.portfolio && profileData.portfolio.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {profileData.portfolio.map((item, index) => (
                        <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                          <h3 className="font-medium mb-2">{item.title}</h3>
                          <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{item.description}</p>
                          {item.link && (
                            <a 
                              href={item.link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-primary-600 dark:text-primary-400 hover:underline text-sm flex items-center"
                            >
                              View Project <ChevronRight size={14} className="ml-1" />
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-6">
                      No portfolio items added yet.
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Stats */}
          <div className="card">
            <h2 className="text-lg font-semibold mb-4">Stats</h2>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/40 rounded-lg flex items-center justify-center mr-3">
                  <BriefcaseBusiness size={20} className="text-primary-700 dark:text-primary-300" />
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    {profileData.role === 'freelancer' ? 'Completed Projects' : 'Posted Projects'}
                  </p>
                  <p className="text-xl font-semibold">{profileData.completedProjects}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-10 h-10 bg-secondary-100 dark:bg-secondary-900/40 rounded-lg flex items-center justify-center mr-3">
                  <Star size={20} className="text-secondary-700 dark:text-secondary-300" />
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Average Rating</p>
                  <div className="flex items-center">
                    <p className="text-xl font-semibold mr-2">{profileData.rating}</p>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          size={14} 
                          className={star <= Math.round(profileData.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-700'} 
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-10 h-10 bg-accent-100 dark:bg-accent-900/40 rounded-lg flex items-center justify-center mr-3">
                  <CheckCircle size={20} className="text-accent-700 dark:text-accent-300" />
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Success Rate</p>
                  <p className="text-xl font-semibold">100%</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Reviews */}
          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Reviews</h2>
              <Link to="#" className="text-primary-600 dark:text-primary-400 text-sm hover:underline">
                View All
              </Link>
            </div>
            
            {profileData.reviewCount > 0 ? (
              <div className="space-y-4">
                {/* Sample reviews - would be populated from the blockchain in a real app */}
                <div className="pb-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center mb-2">
                    <div className="flex mr-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          size={14} 
                          className={star <= 5 ? 'text-yellow-400 fill-current' : 'text-gray-300'} 
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">2 weeks ago</span>
                  </div>
                  <p className="text-sm mb-2">
                    Excellent work! The project was completed ahead of schedule and exceeded my expectations.
                  </p>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    by 0xaF23...7bC1 for "Website Development"
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center mb-2">
                    <div className="flex mr-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          size={14} 
                          className={star <= 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'} 
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">1 month ago</span>
                  </div>
                  <p className="text-sm mb-2">
                    Great communication and quality work. Would definitely hire again.
                  </p>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    by 0x2dA7...1cF8 for "Smart Contract Development"
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-6">
                No reviews yet.
              </p>
            )}
          </div>
          
          {/* Actions */}
          {!isCurrentUser && isConnected && (
            <div className="card">
              <h2 className="text-lg font-semibold mb-4">Actions</h2>
              
              <div className="space-y-3">
                <button className="btn-primary w-full">
                  <MessageSquare size={16} className="mr-2" />
                  Contact {profileData.name || 'User'}
                </button>
                
                {currentUser?.role === 'client' && profileData.role === 'freelancer' && (
                  <Link to="/projects/post" className="btn-outline w-full block text-center">
                    <BriefcaseBusiness size={16} className="mr-2 inline-block" />
                    Invite to Project
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;