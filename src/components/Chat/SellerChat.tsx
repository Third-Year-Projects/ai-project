import { useState, useEffect } from 'react';
import { XMarkIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

interface SellerChatProps {
  sellerId: string;
  sellerName: string;
  sellerImage: string;
}

export const SellerChat = ({ sellerId, sellerName, sellerImage }: SellerChatProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isOnline, setIsOnline] = useState(false);
  const [lastSeen, setLastSeen] = useState<Date | null>(null);
  const { isAuthenticated } = useAuth();
  const [messages, setMessages] = useState<Array<{
    text: string;
    sender: 'user' | 'seller';
    timestamp: Date;
  }>>([]);

  // Simulate real-time connection
  useEffect(() => {
    // In a real app, this would be a WebSocket connection
    const checkOnlineStatus = () => {
      // Simulate random online/offline status
      setIsOnline(Math.random() > 0.3);
      setLastSeen(new Date());
    };

    const interval = setInterval(checkOnlineStatus, 30000);
    checkOnlineStatus();

    return () => clearInterval(interval);
  }, [sellerId]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error('Please login to send messages');
      return;
    }
    if (message.trim()) {
      setMessages(prev => [...prev, {
        text: message.trim(),
        sender: 'user',
        timestamp: new Date()
      }]);
      setMessage('');
    }
  };

  return (
    // In the SellerChat component, update the positioning class
    <div className="fixed bottom-4 right-20 z-40"> {/* Moved right to make space for ChatBot */}
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#468847] text-white rounded-full p-4 shadow-lg hover:bg-[#3a7139] transition-colors"
        >
          Chat with {sellerName}
        </button>
      ) : (
        <div className="bg-white rounded-lg shadow-xl w-96">
          <div className="p-4 bg-[#468847] text-white rounded-t-lg flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src={sellerImage}
                  alt={sellerName}
                  className="w-10 h-10 rounded-full"
                />
                <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white
                  ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`}
                />
              </div>
              <div>
                <h3 className="font-semibold">{sellerName}</h3>
                <p className="text-sm">
                  {isOnline ? 'Online' : lastSeen ? `Last seen ${lastSeen.toLocaleTimeString()}` : 'Offline'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-[#3a7139] rounded-full p-1"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  msg.sender === 'user'
                    ? 'bg-[#468847] text-white'
                    : 'bg-gray-100'
                }`}>
                  <p>{msg.text}</p>
                  <p className="text-xs opacity-75">
                    {msg.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendMessage} className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:border-[#468847]"
              />
              <button
                type="submit"
                className="bg-[#468847] text-white rounded-full p-2 hover:bg-[#3a7139]"
              >
                <PaperAirplaneIcon className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};