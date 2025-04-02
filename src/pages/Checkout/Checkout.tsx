import { useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import { Link } from 'react-router-dom';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import type { CartItem } from '../../types/';

import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '../../contexts/AuthContext';

interface BillingInfo {
  firstName: string;
  lastName: string;
  companyName?: string;
  email: string;
  phoneNumber: string;
  address: string;
  country: string;
  region: string;
  city: string;
  zipCode: string;
}

export default function Checkout() {
  const { cartItems: cart, total, clearCart } = useCart();
  const [billingInfo, setBillingInfo] = useState<BillingInfo>({
    firstName: '',
    lastName: '',
    companyName: '',
    email: '',
    phoneNumber: '',
    address: '',
    country: 'Ghana',
    region: '',
    city: '',
    zipCode: ''
  });
  const [selectedPayment, setSelectedPayment] = useState('credit-card');
  const [orderNote, setOrderNote] = useState('');
  const [mobileNetwork, setMobileNetwork] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const navigate = useNavigate();

  const { user } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate unique order ID
    const orderId = uuidv4();
    
    // Create new order object
    // Update the user ID reference in the newOrder object
    const newOrder = {
      id: orderId,
      userId: user?.email || 'guest', // Use email instead of id
      date: new Date().toISOString(),
      items: cart,
      total: total,
      status: 'pending',
      paymentMethod: selectedPayment,
      billingInfo: billingInfo,
      shippingAddress: billingInfo.address // Using billing address as shipping address
    };

    // Add order to localStorage
    const existingOrders = JSON.parse(localStorage.getItem('userOrders') || '[]');
    localStorage.setItem('userOrders', JSON.stringify([...existingOrders, newOrder]));
    
    // Clear the cart
    clearCart();
    
    // Show success toast
    toast.success('Order placed successfully!', {
      style: {
        background: '#468847',
        color: '#fff',
      },
      iconTheme: {
        primary: '#fff',
        secondary: '#468847',
      },
      duration: 5000,
    });
  
    // Navigate to success page with order ID
    navigate(`/order-success?orderId=${orderId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link to="/" className="text-gray-500 hover:text-gray-700">Home</Link>
            </li>
            <ChevronRightIcon className="h-4 w-4 text-gray-400" />
            <li>
              <Link to="/cart" className="text-gray-500 hover:text-gray-700">Shopping Cart</Link>
            </li>
            <ChevronRightIcon className="h-4 w-4 text-gray-400" />
            <li className="text-[#468847] font-medium">Checkout</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Billing Information */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-6">Billing Information</h2>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      value={billingInfo.firstName}
                      onChange={(e) => setBillingInfo({...billingInfo, firstName: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      value={billingInfo.lastName}
                      onChange={(e) => setBillingInfo({...billingInfo, lastName: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company Name (Optional)</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    value={billingInfo.companyName}
                    onChange={(e) => setBillingInfo({...billingInfo, companyName: e.target.value})}
                  />
                </div>

                {/* Payment Options */}
                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-4">Payment Option</h3>
                  <div className="grid grid-cols-5 gap-4">
                    <button
                      type="button"
                      className={`p-4 border rounded-lg flex items-center justify-center ${
                        selectedPayment === 'cash' ? 'border-[#468847]' : 'border-gray-200'
                      }`}
                      onClick={() => setSelectedPayment('cash')}
                    >
                      <span className="font-bold">Cash</span>
                    </button>
                    <button
                      type="button"
                      className={`p-4 border rounded-lg flex items-center justify-center ${
                        selectedPayment === 'mobile-money' ? 'border-[#468847]' : 'border-gray-200'
                      }`}
                      onClick={() => setSelectedPayment('mobile-money')}
                    >
                      <span className="text-lg">Mobile Money</span>
                    </button>
                    
                    <button
                      type="button"
                      className={`p-4 border rounded-lg flex items-center justify-center ${
                        selectedPayment === 'credit-card' ? 'border-[#468847]' : 'border-gray-200'
                      }`}
                      onClick={() => setSelectedPayment('credit-card')}
                    >
                      <span className="font-bold">Visa</span>
                    </button>
                  </div>
                </div>

                {/* Credit Card Details */}
                {selectedPayment === 'credit-card' && (
                  <div className="mt-6 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="w-full border border-gray-300 rounded-md px-3 py-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded-md px-3 py-2"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Mobile Money Details */}
                {selectedPayment === 'mobile-money' && (
                  <div className="mt-6 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Select Network</label>
                      <select
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        onChange={(e) => setMobileNetwork(e.target.value)}
                        required
                      >
                        <option value="">Select a network</option>
                        <option value="mtn">MTN Mobile Money</option>
                        <option value="vodafone">Vodafone Cash</option>
                        <option value="airteltigo">AirtelTigo Money</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Money Number</label>
                      <input
                        type="tel"
                        pattern="[0-9]{10}"
                        placeholder="0XX XXX XXXX"
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        required
                      />
                      <p className="text-sm text-gray-500 mt-1">Enter the number without spaces or country code</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Account Name</label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        placeholder="Name as registered with mobile money"
                        required
                      />
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
              <div className="space-y-4">
                {cart.map((item: CartItem) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="text-sm font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                      <p className="text-sm font-medium">GH₵{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>GH₵{total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span className="text-[#468847]">GH₵{total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="w-full bg-[#468847] text-white py-3 rounded-md hover:bg-[#3a7139] transition-colors"
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}