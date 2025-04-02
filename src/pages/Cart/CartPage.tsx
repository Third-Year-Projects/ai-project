import { Link, useNavigate } from 'react-router-dom';
import { MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useCart } from '../../contexts/CartContext';  // Fixed the import path
import { useState } from 'react';

type DeliveryOptionType = 'standard' | 'express' | 'pickup';

export default function CartPage() {
  const { 
    cartItems, 
    updateQuantity, 
    removeFromCart,
    cartTotal,
    itemCount 
  } = useCart();

  const [deliveryOption, setDeliveryOption] = useState<DeliveryOptionType>('standard');
  const [promoCode, setPromoCode] = useState('');

  const deliveryOptions: Record<DeliveryOptionType, { cost: number; time: string }> = {
    standard: { cost: 5.00, time: '3-5 days' },
    express: { cost: 10.00, time: '1-2 days' },
    pickup: { cost: 0, time: 'Pickup at location' }
  };

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(productId, newQuantity);
    }
  };

  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold">Shopping Cart ({itemCount} items)</h1>
        <Link to="/" className="text-[#468847] hover:text-[#3a7139]">
          Continue Shopping
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          {cartItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-sm p-4 mb-4">
              <div className="flex gap-4">
                <img 
                  src={item.images[0]} 
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-md"
                />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-600">Seller: {item.seller.name}</p>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                  
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="p-1 rounded-md border hover:bg-gray-50"
                      >
                        <MinusIcon className="h-4 w-4" />
                      </button>
                      <span className="w-12 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="p-1 rounded-md border hover:bg-gray-50"
                      >
                        <PlusIcon className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">GH₵{(item.price * item.quantity).toFixed(2)}</p>
                      <p className="text-sm text-gray-600">GH₵{item.price.toFixed(2)} / {item.unit}</p>
                    </div>
                  </div>
                  
                  {item.stock <= 3 && (
                    <p className="text-red-500 text-sm mt-2">Only {item.stock} left!</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>GH₵{cartTotal.toFixed(2)}</span>
              </div>

              {/* Delivery Options */}
              <div>
                <h3 className="font-medium mb-2">Delivery Method</h3>
                <div className="space-y-2">
                  {Object.entries(deliveryOptions).map(([key, option]) => (
                    <label key={key} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="delivery"
                        value={key}
                        checked={deliveryOption === key}
                        onChange={(e) => setDeliveryOption(e.target.value as DeliveryOptionType)}
                        className="text-[#468847]"
                      />
                      <span>
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                        {option.cost > 0 ? ` (GH₵${option.cost.toFixed(2)})` : ' (Free)'} -
                        <span className="text-sm text-gray-600"> {option.time}</span>
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Promo Code */}
              <div>
                <h3 className="font-medium mb-2">Promo Code</h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 border rounded-md px-3 py-2"
                    placeholder="Enter code"
                  />
                  <button className="bg-[#468847] text-white px-4 py-2 rounded-md hover:bg-[#3a7139]">
                    Apply
                  </button>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>
                    GH₵{(cartTotal + deliveryOptions[deliveryOption].cost).toFixed(2)}
                  </span>
                </div>
              </div>

              <button 
                className="w-full bg-[#468847] text-white py-3 rounded-md hover:bg-[#3a7139] transition-colors"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
