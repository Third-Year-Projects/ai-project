// First, update the imports
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useCart } from '../../contexts/CartContext';
import { StarIcon, MapPinIcon, CalendarIcon, QrCodeIcon, XMarkIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import useRandomProducts from '../../hooks/useRandomProducts';
import type { Product,CartItem } from '../../types';
import { BeakerIcon, CloudIcon, TruckIcon, BuildingStorefrontIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../contexts/AuthContext';
import { SellerChat } from '../../components/Chat/SellerChat';


export default function ProductDetails() {

  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('Traceability');
  const { products, loading } = useRandomProducts();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedDelivery, setSelectedDelivery] = useState<'pickup' | 'standard' | 'express'>('standard');
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{text: string; sender: 'user' | 'seller'}>>([]);
  const [message, setMessage] = useState('');
  const { isAuthenticated } = useAuth();

  

  // Move handleSendMessage inside the component
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      setMessages(prev => [...prev, { text: message.trim(), sender: 'user' }]);
      toast.success('Message sent!');
      setMessage('');
    }
  };
  
  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity);
    toast.success(`${quantity} ${product.name} added to cart`, {
      style: {
        background: '#468847',
        color: '#fff',
      },
      iconTheme: {
        primary: '#fff',
        secondary: '#468847',
      },
    });
  };
  
  const handleBuyNow = () => {
    
    if (!isAuthenticated) {
      toast.error('Please login to Checkout', {
        style: {
          background: '#468847',
          color: '#fff',
        },
        iconTheme: {
          primary: '#fff',
          secondary: '#468847',
        },
      });
      navigate('/auth/login');
    } else {
    if (!product) return;
    addToCart(product, quantity);
    toast.success(`${quantity} ${product.name} added to cart`, {
      style: {
        background: '#468847',
        color: '#fff',
      },
      iconTheme: {
        primary: '#fff',
        secondary: '#468847',
      },
    });
    navigate('/checkout');
  };
}

  useEffect(() => {
    if (!loading && products.length > 0 && id) {
      const foundProduct = products.find(p => p.id === parseInt(id));
      if (foundProduct) {
        setProduct(foundProduct);
        setSelectedImage(0);
      } else {
        navigate('/');
      }
    }
  }, [products, id, navigate, loading]);

  // ChatDrawer component
  const ChatDrawer = () => (
    <div className={`fixed inset-y-0 right-0 w-96 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
      isChatOpen ? 'translate-x-0' : 'translate-x-full'
    }`}>
      <div className="h-full flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b flex items-center justify-between bg-[#468847] text-white">
          <div className="flex items-center space-x-3">
            <img
              src={product?.seller.profilePicture}
              alt={product?.seller.name}
              className="h-10 w-10 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold">{product?.seller.name}</h3>
              <p className="text-sm opacity-90">Usually responds within 1 hour</p>
            </div>
          </div>
          <button 
            onClick={() => setIsChatOpen(false)}
            className="p-1 hover:bg-[#3a7139] rounded-full"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Updated Chat Messages Area */}
        <div className="flex-1 p-4 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="text-center text-sm text-gray-500">
              Start a conversation with {product?.seller.name}
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    msg.sender === 'user' 
                      ? 'bg-[#468847] text-white' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    <p className="text-sm">{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Updated Message Input */}
        <div className="p-4 border-t">
          <form 
            className="flex space-x-2"
            onSubmit={handleSendMessage}
          >
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={`Message ${product?.seller.name}...`}
              className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:border-[#468847]"
              autoComplete="off"
            />
            <button
              type="submit"
              className="p-2 bg-[#468847] text-white rounded-full hover:bg-[#3a7139] transition-colors"
            >
              <PaperAirplaneIcon className="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );

  if (loading || !product) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin h-8 w-8 border-4 border-[#468847] border-t-transparent rounded-full mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading product details...</p>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Product Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`aspect-square rounded-md overflow-hidden ${
                    selectedImage === idx ? 'ring-2 ring-[#468847]' : ''
                  }`}
                >
                  <img src={image} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
              <p className="text-sm text-gray-500">{product.category}</p>
            </div>

            <div className="flex items-center space-x-2">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <StarIcon 
                    key={i}
                    className={`h-5 w-5 ${i < product.ratings.average ? 'fill-current' : 'stroke-current'}`}
                  />
                ))}
              </div>
              <span className="text-gray-500">({product.ratings.average} stars)</span>
            </div>

            <div className="text-2xl text-[#468847]">
              GH₵{product.price.toFixed(2)} / {product.unit}
            </div>

            {/* Seller Information */}
            <div className="border-t border-b py-4">
              <div className="flex items-center space-x-4">
                <img
                  src={product.seller.profilePicture}
                  alt={product.seller.name}
                  className="h-12 w-12 rounded-full cursor-pointer hover:opacity-90"
                  onClick={() => navigate(`/seller/${product.seller.id}`)}
                />
                <div>
                  <h3 
                    className="font-semibold cursor-pointer hover:text-[#468847]"
                    onClick={() => navigate(`/seller/${product.seller.id}`)}
                  >
                    {product.seller.name}
                  </h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <StarIcon className="h-4 w-4 text-yellow-400" />
                    <span>{product.seller.rating}</span>
                  </div>
                </div>
                <button 
                  onClick={() => setIsChatOpen(true)}
                  className="ml-auto text-[#468847] hover:text-[#3a7139]"
                >
                  Message Seller
                </button>
              </div>
            </div>

            
            
            

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center border rounded-md">
                  <button 
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="px-3 py-2 border-r hover:bg-gray-50"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 text-center"
                  />
                  <button 
                    onClick={() => setQuantity(q => q + 1)}
                    className="px-3 py-2 border-l hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
                <span className="text-gray-500">
                  {product.stock} {product.unit}s available
                </span>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#468847] text-white py-2 px-6 rounded-md hover:bg-[#3a7139] transition-colors"
                >
                  Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 border border-[#468847] text-[#468847] py-2 px-6 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Buy Now
                </button>
              </div>
            </div>

            {/* Delivery Options */}
            <div className="space-y-4">
              <h3 className="font-semibold">Delivery Options</h3>
              <div className="space-y-2">
                {product.deliveryOptions.pickup.available && (
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="delivery"
                      value="pickup"
                      checked={selectedDelivery === 'pickup'}
                      onChange={() => setSelectedDelivery('pickup')}
                      className="text-[#468847]"
                    />
                    <span>Pickup from {product.deliveryOptions.pickup.location}</span>
                  </label>
                )}
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="delivery"
                    value="standard"
                    checked={selectedDelivery === 'standard'}
                    onChange={() => setSelectedDelivery('standard')}
                    className="text-[#468847]"
                  />
                  <span>
                    Standard Delivery (GH₵{product.deliveryOptions.standardDelivery.cost}) - 
                    {product.deliveryOptions.standardDelivery.estimatedTime}
                  </span>
                </label>
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="delivery"
                    value="express"
                    checked={selectedDelivery === 'express'}
                    onChange={() => setSelectedDelivery('express')}
                    className="text-[#468847]"
                  />
                  <span>
                    Express Delivery (GH₵{product.deliveryOptions.expressDelivery.cost}) - 
                    {product.deliveryOptions.expressDelivery.estimatedTime}
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-12">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {['Description', 'Traceability', 'Reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`
                    border-b-2 py-4 px-1 text-sm font-medium
                    ${activeTab === tab 
                      ? 'border-[#468847] text-[#468847]' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                  `}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
          
          {/* Tab Contents */}
          {activeTab === 'Description' && (
            <div className="py-6">
              <div className="prose max-w-none">
                <h3 className="text-lg font-semibold mb-4">Product Description</h3>
                <p>{product.description}</p>
        
                {product.nutritionalValue && (
                  <div className="mt-6">
                    <h4 className="font-semibold mb-2">Nutritional Value</h4>
                    <ul className="list-disc pl-5">
                      <li>Calories: {product.nutritionalValue.calories}</li>
                      <li>Carbohydrates: {product.nutritionalValue.carbohydrates}</li>
                      <li>Protein: {product.nutritionalValue.protein}</li>
                    </ul>
                  </div>
                )}
        
                <div className="mt-6">
                  <h4 className="font-semibold mb-2">Storage Instructions</h4>
                  <p>{product.storageInstructions}</p>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'Traceability' && (
            <div className="py-6">
              
  <h3 className="text-lg font-semibold mb-4">Traceability Information</h3>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <MapPinIcon className="h-5 w-5 text-[#468847]" />
        <span>Farm: {product.traceability.farmName}</span>
      </div>
      <div className="flex items-center space-x-2">
        <CalendarIcon className="h-5 w-5 text-[#468847]" />
        <span>Harvest Date: {product.traceability.harvestDate}</span>
      </div>
      <div className="flex items-center space-x-2">
        <BeakerIcon className="h-5 w-5 text-[#468847]" />
        <span>Farming Method: {product.traceability.farmingMethod}</span>
      </div>
      <div className="flex items-center space-x-2">
        <CloudIcon className="h-5 w-5 text-[#468847]" />
        <span>Carbon Footprint: {product.traceability.carbonFootprint}</span>
      </div>
      <div className="flex items-center space-x-2">
        <TruckIcon className="h-5 w-5 text-[#468847]" />
        <span>Transport: {product.traceability.transportMethod}</span>
      </div>
      <div className="flex items-center space-x-2">
        <BuildingStorefrontIcon className="h-5 w-5 text-[#468847]" />
        <span>Distribution: {product.traceability.distributionCenter}</span>
      </div>
    </div>
    <div className="space-y-4">
      <div>
        <h4 className="font-semibold mb-2">Farming Details</h4>
        <ul className="space-y-2 text-sm">
          <li>Soil Type: {product.traceability.soilType}</li>
          <li>Water Source: {product.traceability.waterSource}</li>
          <li>Pesticides: {product.traceability.pesticides}</li>
          <li>Batch Number: {product.traceability.batchNumber}</li>
          <li>Packaging Date: {product.traceability.packagingDate}</li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold mb-2">Certifications</h4>
        <div className="flex flex-wrap gap-2">
          {product.traceability.qualityCertification.split(',').map((cert) => (
            <span 
              key={cert}
              className="px-3 py-1 bg-green-100 text-[#468847] rounded-full text-sm"
            >
              {cert.trim()}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <QrCodeIcon className="h-5 w-5 text-[#468847] mb-2" />
        <img 
          src={product.traceability.qrCode} 
          alt="Traceability QR Code"
          className="h-24 w-24"
        />
      </div>
    </div>
  </div>

          </div>
        )}
        
        {activeTab === 'Reviews' && (
          <div className="py-6">
            <h3 className="text-lg font-semibold mb-4">Customer Reviews</h3>
            <div className="space-y-6">
              <div className="flex items-center space-x-4 border-b pb-6">
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-bold text-[#468847]">{product.ratings.average.toFixed(1)}</span>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon 
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(product.ratings.average) ? 'fill-current' : 'stroke-current'}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 mt-1">
                    {product.ratings.reviews.length} reviews
                  </span>
                </div>
              </div>
              
              <div className="space-y-8">
                {product.ratings.reviews.map((review, idx) => (
                  <div key={idx} className="border-b pb-6 last:border-b-0">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-600 font-medium">
                            {review.user.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                              {review.user.image ? (
                                <img
                                  src={review.user.image}
                                  alt={review.user.name}
                                  className="h-8 w-8 rounded-full object-cover"
                                />
                              ) : (
                                <span className="text-sm font-medium text-gray-600">
                                  {review.user.name.charAt(0).toUpperCase()}
                                </span>
                              )}
                            </div>
                            <h4 className="font-medium">{review.user.name}</h4>
                          </div>
                        </div>
                        <div className="flex text-yellow-400 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <StarIcon 
                              key={i}
                              className={`h-4 w-4 ${i < review.rating ? 'fill-current' : 'stroke-current'}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="mt-4 text-gray-600">{review.comment}</p>
                    {review.image && (
                      <div className="mt-4">
                        <img 
                          src={review.image} 
                          alt="Review" 
                          className="h-24 w-24 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    // Replace the existing chat implementation with the new SellerChat component
  
    
    // In your ProductDetails component, replace the ChatDrawer with:
    {product && (
    <SellerChat
      sellerId={product.seller.id}
      sellerName={product.seller.name}
      sellerImage={product.seller.profilePicture}
    />
    )}
    </>
  );
}
