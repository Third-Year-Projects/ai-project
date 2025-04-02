import React, { useState, useRef, useEffect } from 'react';
import { IoMdChatbubbles } from 'react-icons/io';
import { BsThreeDots } from 'react-icons/bs';
import { products } from '../../data/products';
import { useAuth } from '../../contexts/AuthContext';  // Assuming you have this
import { useCart } from '../../contexts/CartContext';  // Assuming you have this
import { farmingTips } from '../../data/farmingTips';  // Create this file
import { getWeatherData } from '../../api/weather';  // Create this file

// Add these interfaces at the top of the file
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  unit: string;
  stock: number;
  minOrder: number;
  maxOrder: number;
  discounts: {
    bulk?: {
      percentage: number;
      minQuantity: number;
    };
  };
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface Message {
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
}

interface ProductRecommendation {
  productId: number;
  name: string;
  image: string;
  price: number;
  category: string;
}

// Add recommendation component to display product cards
const RecommendationCard = ({ product }: { product: ProductRecommendation }) => (
  <div className="flex items-center p-2 border rounded-lg mb-2 hover:bg-gray-50 cursor-pointer">
    <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded" />
    <div className="ml-3">
      <h4 className="font-medium text-sm">{product.name}</h4>
      <p className="text-sm text-gray-600">GH₵{product.price}</p>
    </div>
  </div>
);

const ChatBot: React.FC = () => {
  const { user } = useAuth();
  // Update the destructuring to use cartItems instead of cart
  const { cartItems, addToCart, removeFromCart, clearCart } = useCart();

  const [weatherData, setWeatherData] = useState<{
    condition: string;
    temperature: number;
    humidity: number;
    isGood: boolean;
  } | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = {
      text: inputMessage,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    setMessages((prev: Message[]) => [...prev, userMessage as Message]);
    setInputMessage('');
    setIsTyping(true);

    try {
      // Get bot response
      const botResponse = await getBotResponse(inputMessage.toLowerCase());
      
      // Calculate delay based on response length (minimum 1.5 seconds, maximum 4 seconds)
      const typingDelay = Math.min(Math.max(botResponse.length * 30, 1500), 4000);
      
      // Simulate typing delay
      await new Promise(resolve => setTimeout(resolve, typingDelay));

      setMessages(prev => [...prev, {
        text: botResponse,
        sender: 'bot',
        timestamp: new Date().toISOString()
      }]);
      setIsTyping(false);
    } catch (error) {
      console.error('Chat error:', error);
      await new Promise(resolve => setTimeout(resolve, 1500)); // Error message delay
      setMessages(prev => [...prev, {
        text: "I apologize, but I'm having trouble responding right now. Please try again.",
        sender: 'bot',
        timestamp: new Date().toISOString()
      }]);
      setIsTyping(false);
    }
  };

  const processOrder = (productName: string, quantity: number) => {
    const product = products.find(p => p.name.toLowerCase() === productName.toLowerCase());
    if (!product) return "Sorry, I couldn't find that product.";
    if (!user) return "Please log in to place an order.";
    
    addToCart(product, quantity); // Pass the entire product object instead of just the ID
    return `Great! I've added ${quantity} ${product.unit}(s) of ${product.name} to your cart. Would you like to checkout or continue shopping?`;
  };

  const getFarmingTip = (crop: string) => {
    const tips = farmingTips.filter(tip => 
      tip.crops.includes(crop.toLowerCase())
    );
    return tips.length > 0 
      ? `Farming tip for ${crop}: ${tips[0].tip}`
      : "I don't have specific tips for that crop, but here's a general farming tip: " + farmingTips[0].tip;
  };

  const getWeatherRecommendation = async (crop: string) => {
    try {
      const weather = await getWeatherData();
      setWeatherData(weather);
      return `Based on the current weather (${weather.condition}), it's ${weather.isGood ? 'a good' : 'not the best'} time to plant ${crop}.`;
    } catch (error) {
      return "I couldn't fetch weather data at the moment.";
    }
  };

  const getBotResponse = async (message: string): Promise<string> => {
    const msg = message.toLowerCase();

    // Handle add to cart requests
    if (msg.includes('add') && msg.includes('cart')) {
      const quantity = parseInt(msg.match(/\d+/)?.[0] || '1');
      const productName = products.find(p => msg.includes(p.name.toLowerCase()))?.name;
      
      if (productName) {
        return processOrder(productName, quantity);
      } else {
        return "I couldn't find that product. Could you please specify which product you'd like to add to your cart? You can ask to see our product list if needed.";
      }
    }

    // Add specific product price inquiry handling
    if (msg.includes('how much') || msg.includes('price of') || msg.includes('cost of')) {
      const productName = products.find(p => 
        msg.includes(p.name.toLowerCase()) || 
        msg.includes(p.name.slice(0, -1).toLowerCase()) // Handle plural forms
      )?.name;
      
      if (productName) {
        const product = products.find(p => p.name === productName);
        return `${product?.name} costs GHS ${product?.price} per ${product?.unit}.\n` +
               `Current stock: ${product?.stock} ${product?.unit}s\n` +
               (product?.discounts?.bulk ? 
                `💰 Bulk Discount: ${product?.discounts.bulk.percentage}% off when you order ${product?.discounts.bulk.minQuantity}+ ${product?.unit}s\n` : '') +
               `\nWould you like to place an order?`;
      }
      return "I couldn't find that product. Would you like to see our complete product list?";
    }

    // Handle greetings and general queries
    if (msg.includes('how are you') || msg.includes('how\'s it going')) {
      return "I'm doing great, thank you for asking! I'm here to help you with your shopping needs. Would you like to browse our products or get some farming tips?";
    }

    // Handle general questions about the bot
    if (msg.includes('who are you') || msg.includes('what can you do')) {
      return "I'm your Green Market assistant, designed to help you with:\n" +
             "🛒 Shopping and ordering products\n" +
             "🌱 Providing farming tips and weather-based planting advice\n" +
             "💰 Checking prices and stock availability\n" +
             "🚚 Managing your cart and orders\n\n" +
             "What would you like help with today?";
    }

    // Add this new condition for viewing all products
    if (msg.includes('products') || msg.includes('show products') || msg.includes('view products')) {
      const productsByCategory = products.reduce((acc, product) => {
        if (!acc[product.category]) {
          acc[product.category] = [];
        }
        acc[product.category].push(
          `${product.name}: GHS ${product.price} per ${product.unit} (${product.stock} available)`
        );
        return acc;
      }, {} as Record<string, string[]>);

      return "Here are our available products:\n\n" +
        Object.entries(productsByCategory)
          .map(([category, items]) => 
            `${category.toUpperCase()}:\n${items.join('\n')}`)
          .join('\n\n') +
        "\n\nWould you like to know more about any specific product?";
    }

    // Handle order processing
    if (msg.includes('order') || msg.includes('buy')) {
      const quantity = parseInt(msg.match(/\d+/)?.[0] || '1');
      const productName = products.find(p => msg.includes(p.name.toLowerCase()))?.name;
      if (productName) {
        return processOrder(productName, quantity);
      }
    }

    // Handle cart management
    if (msg.includes('cart')) {
      if (msg.includes('show') || msg.includes('view')) {
        if (!cartItems || cartItems.length === 0) {
          return "Your cart is empty.";
        }
        return `Your cart contains: ${cartItems.map(item =>
          `${item.quantity}x ${item.name}`
        ).join(', ')}`;
      }
      if (msg.includes('clear')) {
        clearCart();
        return "Cart cleared!";
      }
    }

    // Handle farming tips
    if (msg.includes('tip') || msg.includes('how to grow')) {
      const crop = products.find(p => msg.includes(p.name.toLowerCase()))?.name;
      if (crop) {
        return getFarmingTip(crop);
      }
    }

    // Handle weather recommendations
    if (msg.includes('weather') || msg.includes('plant')) {
      const crop = products.find(p => msg.includes(p.name.toLowerCase()))?.name;
      if (crop) {
        return await getWeatherRecommendation(crop);
      }
    }

    // Handle price list requests
    if (msg.includes('price list') || msg.includes('all prices')) {
      const categoryPrices = products.reduce((acc, product) => {
        if (!acc[product.category]) {
          acc[product.category] = [];
        }
        acc[product.category].push(`${product.name}: GHS ${product.price}`);
        return acc;
      }, {} as Record<string, string[]>);

      return Object.entries(categoryPrices)
        .map(([category, prices]) => 
          `${category.toUpperCase()}:\n${prices.join('\n')}`)
        .join('\n\n');
    }

    // Handle stock availability
    if (msg.includes('stock') || msg.includes('available')) {
      const productName = products.find(p => msg.includes(p.name.toLowerCase()))?.name;
      if (productName) {
        const product = products.find(p => p.name === productName);
        return `${product?.name} has ${product?.stock} ${product?.unit}s in stock. Minimum order is ${product?.minOrder} ${product?.unit}s and maximum is ${product?.maxOrder} ${product?.unit}s.`;
      }
    }

    // Handle payment and discount inquiries
    if (msg.includes('payment') || msg.includes('pay')) {
      return "We accept various payment methods including credit cards, mobile money, and PayPal. Some sellers also accept cash on delivery.";
    }

    if (msg.includes('discount') || msg.includes('offer')) {
      return "Many of our products have bulk purchase discounts. You can also use promo codes for additional savings. Would you like to know about specific product discounts?";
    }

    // Enhanced product category responses
    if (msg.includes('fruits')) {
      const fruitProducts = products.filter(p => p.category === 'fruits');
      const fruitsList = fruitProducts.map(p => 
        `${p.name}: GHS ${p.price} (${p.stock} ${p.unit}s available)`
      ).join('\n');
      return `Available fruits:\n${fruitsList}\n\nWould you like details about any specific fruit?`;
    }

    // Enhanced specific product responses
    const productMatches = products.filter(p => 
      msg.includes(p.name.toLowerCase()) || 
      msg.includes(p.category.toLowerCase())
    );

    if (productMatches.length > 0) {
      const product = productMatches[0];
      return `${product.name}:\n` +
        `Price: GHS ${product.price} per ${product.unit}\n` +
        `Stock: ${product.stock} ${product.unit}s available\n` +
        `Description: ${product.description}\n` +
        `Minimum Order: ${product.minOrder} ${product.unit}s\n` +
        (product.discounts.bulk ? 
          `Bulk Discount: ${product.discounts.bulk.percentage}% off for orders over ${product.discounts.bulk.minQuantity} ${product.unit}s\n` : '') +
        `\nWould you like to know about delivery options or payment methods?`;
    }

    // Original responses remain for other cases
    if (msg.includes('hi') || msg.includes('hello') || msg.includes('hey')) {
      return "Hello! How can I help you with your shopping today? You can ask about our products, prices, stock availability, or payment options.";
    }

    return "How can I help you? You can:\n" +
           "- Place orders\n" +
           "- Manage your cart\n" +
           "- Get farming tips\n" +
           "- Check weather-based recommendations\n" +
           "- View products and prices\n" +
           "- Check stock availability";
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    setMessages([{
      text: "Hello! I'm your Green Market assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date().toISOString()
    }]);
  }, []);

  // Rest of the component remains the same...
  return (
    // In the ChatBot component, ensure it has a higher z-index
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 animate-bounce"
        >
          <IoMdChatbubbles className="w-6 h-6" />
        </button>
      ) : (
        <div className="w-[350px] h-[500px] bg-white rounded-lg shadow-xl flex flex-col overflow-hidden animate-slideUp">
          <div className="bg-green-500 text-white p-4 flex justify-between items-center">
            <h3 className="text-lg font-semibold">Green Market Assistant</h3>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200"
            >
              ✕
            </button>
          </div>
          
          <div 
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-4 flex flex-col gap-2.5"
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`max-w-[80%] p-3 rounded-2xl ${
                  message.sender === 'user' 
                    ? 'bg-blue-50 self-end' 
                    : 'bg-gray-100 self-start'
                } animate-fadeIn`}
              >
                {message.text}
              </div>
            ))}
            {isTyping && (
              <div className="bg-gray-100 self-start p-3 rounded-2xl flex gap-1 items-center animate-pulse">
                <BsThreeDots className="w-4 h-4" />
              </div>
            )}
          </div>

          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 p-2.5 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <button 
              type="submit" 
              className="px-5 py-2.5 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBot;