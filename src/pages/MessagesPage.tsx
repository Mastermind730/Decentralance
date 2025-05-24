import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, User, Clock, Send, Link2, Image, File, Paperclip } from 'lucide-react';

const MessagesPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const projectId = queryParams.get('project');
  
  const [selectedConversation, setSelectedConversation] = useState<string | null>(projectId || '1');
  const [messageText, setMessageText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  
  // Mock conversations data - in a real app, this would come from the blockchain or API
  const conversations = [
    {
      id: '1',
      user: {
        address: '0x8f7C...9e2A',
        name: 'Alex Johnson',
        avatar: 'A',
      },
      project: 'Website Development',
      lastMessage: "How&apos;s the progress on the smart contract integration?",
      timestamp: '10:30 AM',
      unread: true,
    },
    {
      id: '2',
      user: {
        address: '0x3eF1...8dA2',
        name: 'Sarah Williams',
        avatar: 'S',
      },
      project: 'Logo Design',
      lastMessage: 'The final files have been uploaded to the shared folder.',
      timestamp: 'Yesterday',
      unread: false,
    },
    {
      id: '3',
      user: {
        address: '0x9bC3...4eF5',
        name: 'Michael Chen',
        avatar: 'M',
      },
      project: 'Mobile App Development',
      lastMessage: 'Can we schedule a call to discuss the new features?',
      timestamp: '2 days ago',
      unread: false,
    },
  ];
  
  // Mock messages for the selected conversation
  const messages = [
    {
      id: '1',
      sender: 'client',
      text: "Hi there! I&apos;m interested in discussing the website development project.",
      timestamp: new Date('2025-06-18T09:00:00'),
    },
    {
      id: '2',
      sender: 'freelancer',
      text: "Hello! I&apos;d be happy to discuss the project with you. What are your requirements?",
      timestamp: new Date('2025-06-18T09:05:00'),
    },
    {
      id: '3',
      sender: 'client',
      text: 'I need a website for my new blockchain startup. It should include a landing page, about us, services, and a blog section.',
      timestamp: new Date('2025-06-18T09:10:00'),
    },
    {
      id: '4',
      sender: 'freelancer',
      text: 'Sounds good. I have experience with blockchain projects. Do you have any specific design preferences or examples of sites you like?',
      timestamp: new Date('2025-06-18T09:15:00'),
    },
    {
      id: '5',
      sender: 'client',
      text: 'I like minimalist designs with dark mode support. Here are a couple of examples:',
      timestamp: new Date('2025-06-18T09:20:00'),
    },
    {
      id: '6',
      sender: 'client',
      text: 'https://example.com/site1\nhttps://example.com/site2',
      timestamp: new Date('2025-06-18T09:21:00'),
    },
    {
      id: '7',
      sender: 'freelancer',
      text: 'Those are great references. I can definitely create something in that style. When would you need this completed by?',
      timestamp: new Date('2025-06-18T09:25:00'),
    },
    {
      id: '8',
      sender: 'client',
      text: "We&apos;re planning to launch in about 6 weeks. Would that be enough time?",
      timestamp: new Date('2025-06-18T09:30:00'),
    },
    {
      id: '9',
      sender: 'freelancer',
      text: "Yes, that&apos;s a reasonable timeframe. I can break this down into milestones:\n\n1. Design mockups - 1 week\n2. Frontend development - 2 weeks\n3. Backend integration - 2 weeks\n4. Testing and revisions - 1 week",
      timestamp: new Date('2025-06-18T09:35:00'),
    },
    {
      id: '10',
      sender: 'client',
      text: "That sounds perfect. How&apos;s the progress on the smart contract integration?",
      timestamp: new Date('2025-06-18T10:30:00'),
    },
  ];
  
  const formatTime = (date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };
  
  const handleSendMessage = () => {
    if (messageText.trim()) {
      // In a real app, this would send the message to the blockchain or API
      console.log('Sending message:', messageText);
      setMessageText('');
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const selectedConvo = conversations.find(c => c.id === selectedConversation);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="card p-0 overflow-hidden">
        <div className="grid grid-cols-12 h-[calc(100vh-200px)] min-h-[500px]">
          {/* Conversation sidebar */}
          <div className="col-span-12 md:col-span-4 lg:col-span-3 border-r border-gray-200 dark:border-gray-700">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h1 className="text-xl font-semibold mb-4">Messages</h1>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search messages..."
                  className="input pl-10"
                />
                <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
              </div>
            </div>
            
            <div className="overflow-y-auto h-[calc(100%-80px)]">
              {conversations.map((conversation) => (
                <button
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation.id)}
                  className={`w-full text-left p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                    selectedConversation === conversation.id ? 'bg-gray-50 dark:bg-gray-800' : ''
                  }`}
                >
                  <div className="flex items-start">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 text-white ${
                      conversation.unread 
                        ? 'bg-primary-500' 
                        : 'bg-gray-400 dark:bg-gray-600'
                    }`}>
                      {conversation.user.avatar}
                    </div>
                    <div className="flex-grow min-w-0">
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="font-medium truncate">
                          {conversation.user.name}
                        </h3>
                        <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">
                          {conversation.timestamp}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                        <span className="text-xs text-gray-500 dark:text-gray-400 mr-1">
                          {conversation.project}:
                        </span>
                        {conversation.lastMessage}
                      </p>
                    </div>
                    {conversation.unread && (
                      <div className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0 mt-2"></div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          {/* Message area */}
          <div className="col-span-12 md:col-span-8 lg:col-span-9 flex flex-col">
            {selectedConversation ? (
              <>
                {/* Conversation header */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gray-400 dark:bg-gray-600 flex items-center justify-center text-white mr-3">
                      {selectedConvo?.user.avatar || <User size={20} />}
                    </div>
                    <div>
                      <h2 className="font-medium">{selectedConvo?.user.name}</h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {selectedConvo?.project}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Messages */}
                <div className="flex-grow overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div 
                      key={message.id} 
                      className={`flex ${message.sender === 'client' ? 'justify-start' : 'justify-end'}`}
                    >
                      <div 
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.sender === 'client'
                            ? 'bg-gray-100 dark:bg-gray-800'
                            : 'bg-primary-100 dark:bg-primary-900/40 text-primary-800 dark:text-primary-200'
                        }`}
                      >
                        <p className="whitespace-pre-line">{message.text}</p>
                        <div className="flex items-center justify-end mt-1">
                          <Clock size={12} className="text-gray-400 mr-1" />
                          <span className="text-xs text-gray-400">
                            {formatTime(message.timestamp)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Message input */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center">
                    <div className="flex space-x-2 mr-2">
                      <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                        <Paperclip size={20} />
                      </button>
                      <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                        <Image size={20} />
                      </button>
                      <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                        <Link2 size={20} />
                      </button>
                    </div>
                    <input
                      type="text"
                      placeholder="Type your message..."
                      className="input flex-grow mr-2"
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyDown={handleKeyDown}
                    />
                    <button 
                      onClick={handleSendMessage}
                      className="btn-primary p-2 rounded-full"
                      disabled={!messageText.trim()}
                    >
                      <Send size={20} />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-grow flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageSquare size={32} className="text-gray-400 dark:text-gray-500" />
                  </div>
                  <h2 className="text-xl font-semibold mb-2">No conversation selected</h2>
                  <p className="text-gray-500 dark:text-gray-400">
                    Select a conversation from the sidebar or start a new one.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;