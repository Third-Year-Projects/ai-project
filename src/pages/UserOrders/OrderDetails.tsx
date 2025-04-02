import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CheckCircleIcon, TruckIcon, GiftIcon, ClipboardDocumentCheckIcon } from '@heroicons/react/24/outline';
import { Order,OrderItem } from '../../types';




export default function OrderDetails() {
  const { orderId } = useParams();
  const [order, setOrder] = useState<Order | null>(null);

  const updateOrderStatus = (newStatus: string) => {
    if (!order) return;

    // Get all orders
    const allOrders = JSON.parse(localStorage.getItem('userOrders') || '[]');
    
    // Find and update the specific order
    const updatedOrders = allOrders.map((o: Order) => 
      o.id === order.id ? { ...o, status: newStatus } : o
    );

    // Save back to localStorage
    localStorage.setItem('userOrders', JSON.stringify(updatedOrders));
    
    // Update local state
    setOrder({ ...order, status: newStatus });
  };

  useEffect(() => {
    // Fetch order from localStorage
    const allOrders = JSON.parse(localStorage.getItem('userOrders') || '[]');
    const foundOrder = allOrders.find((order: Order) => order.id === orderId);
    if (foundOrder) {
      setOrder(foundOrder);
    }
  }, [orderId]);

  if (!order) {
    return <div className="text-center py-8">Loading...</div>;
  }

  const getTimelineStatus = (currentStep: string) => {
    const statusOrder = ['pending', 'processing', 'shipping', 'delivered'];
    const currentIndex = statusOrder.indexOf(order.status);
    const stepIndex = statusOrder.indexOf(currentStep);
    
    if (stepIndex <= currentIndex) {
      return {
        completed: true,
        date: stepIndex === currentIndex ? new Date().toLocaleString() : new Date(order.date).toLocaleString()
      };
    }
    return {
      completed: false,
      date: 'Pending'
    };
  };

  const timeline = [
    {
      status: 'Order Confirmed',
      date: new Date(order.date).toLocaleString(),
      completed: true
    },
    {
      status: 'Processing',
      ...getTimelineStatus('processing')
    },
    {
      status: 'Packaging',
      ...getTimelineStatus('processing')
    },
    {
      status: 'Shipping',
      ...getTimelineStatus('shipping')
    },
    {
      status: 'Delivered',
      ...getTimelineStatus('delivered')
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-sm p-6">
        {/* Order Header */}
        <div className="flex justify-between items-center border-b pb-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Order {order.id}</h1>
            <p className="text-sm text-gray-500">{new Date(order.date).toLocaleString()}</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold text-[#468847]">GH₵{order.total.toFixed(2)}</p>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              {order.status}
            </span>
            <div className="mt-2">
              <select
                value={order.status}
                onChange={(e) => updateOrderStatus(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#468847] focus:border-[#468847] sm:text-sm rounded-md"
              >
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipping">Shipping</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>
          </div>
        </div>

        {/* Billing Information */}
        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Billing Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="text-sm font-medium">{`${order.billingInfo.firstName} ${order.billingInfo.lastName}`}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-sm font-medium">{order.billingInfo.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="text-sm font-medium">{order.billingInfo.phoneNumber}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Address</p>
              <p className="text-sm font-medium">{order.billingInfo.address}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Payment Method</p>
              <p className="text-sm font-medium">{order.paymentMethod}</p>
            </div>
          </div>
        </div>

        {/* Order Timeline */}
        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Order Activity</h2>
          <div className="relative">
            {timeline.map((step, index) => (
              <div key={step.status} className="flex items-center mb-8 last:mb-0">
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
                  ${step.completed ? 'bg-[#468847] text-white' : 'bg-gray-200 text-gray-400'}`}>
                  {index === 0 && <ClipboardDocumentCheckIcon className="w-5 h-5" />}
                  {index === 1 && <CheckCircleIcon className="w-5 h-5" />}
                  {index === 2 && <GiftIcon className="w-5 h-5" />}
                  {index === 3 && <TruckIcon className="w-5 h-5" />}
                  {index === 4 && <CheckCircleIcon className="w-5 h-5" />}
                </div>
                <div className="ml-4 flex-1">
                  <p className="text-sm font-medium text-gray-900">{step.status}</p>
                  <p className="text-sm text-gray-500">{step.date}</p>
                </div>
                {index < timeline.length - 1 && (
                  <div className="absolute left-4 top-8 -ml-px h-full w-0.5 bg-gray-200" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Order Items */}
        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Order Items</h2>
          <div className="space-y-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center space-x-4 border-b pb-4 last:border-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-16 w-16 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-500">
                    Quantity: {item.quantity} × GH₵{item.price.toFixed(2)}
                  </p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  GH₵{(item.quantity * item.price).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}