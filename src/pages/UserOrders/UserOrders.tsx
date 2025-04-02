import  { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Tab } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';  // Add this import at the top
import { Order } from '../../types';


export default function UserOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const navigate = useNavigate();

  const refreshOrders = () => {
    const allOrders = JSON.parse(localStorage.getItem('userOrders') || '[]');
    const userOrders = user 
      ? allOrders.filter((order: Order) => order.userId === user.email)
      : [];
    setOrders(userOrders);
  };

  // Add initial load effect
  useEffect(() => {
    refreshOrders();
  }, [user]);
  
  // Storage event listener
  useEffect(() => {
    window.addEventListener('storage', refreshOrders);
    return () => window.removeEventListener('storage', refreshOrders);
  }, [user]);

  // Update OrderCard to handle multiple items
  const OrderCard = ({ order }: { order: Order }) => (
    <div className="bg-white rounded-lg shadow p-6 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="flex -space-x-2">
          {order.items.slice(0, 3).map((item) => (
            <img
              key={item.id}
              src={item.image}
              alt={item.name}
              className="h-16 w-16 object-cover rounded-md border-2 border-white"
            />
          ))}
        </div>
        <div>
          <h3 className="font-medium text-gray-900">
            {order.items[0].name}
            {order.items.length > 1 && ` +${order.items.length - 1} more items`}
          </h3>
          <p className="text-sm text-gray-500">
            Order ID: {order.id}
          </p>
          <p className="text-sm text-gray-500">
            Total: GH₵{order.total.toFixed(2)}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm text-gray-500">{new Date(order.date).toLocaleDateString()}</p>
        <span className={`
          inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
          ${
            order.status === 'pending'
              ? 'bg-yellow-100 text-yellow-800'
              : order.status === 'processing'
              ? 'bg-blue-100 text-blue-800'
              : order.status === 'shipping'
              ? 'bg-purple-100 text-purple-800'
              : 'bg-green-100 text-green-800'
          }
        `}>
          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
        </span>
        <button
          onClick={() => navigate(`/orders/${order.id}`)}
          className="mt-2 text-[#468847] hover:text-[#3a7139] text-sm font-medium"
        >
          View Details
        </button>
      </div>
    </div>
  );
  const [selectedTab, setSelectedTab] = useState(0);
  
  // const orders: Order[] = [
  //   {
  //     id: '#ORD001',
  //     product: {
  //       name: 'Fresh Tomatoes',
  //       image: '/images/products/tomatoes.jpg'
  //     },
  //     seller: 'Green Farm',
  //     quantity: 5,
  //     date: '2024-03-21',
  //     status: 'pending',
  //     total: 25.00
  //   },
  //   {
  //     id: '#ORD002',
  //     product: {
  //       name: 'Organic Carrots',
  //       image: '/images/products/carrots.jpg'
  //     },
  //     seller: 'Organic Foods',
  //     quantity: 3,
  //     date: '2024-03-20',
  //     status: 'processing',
  //     total: 15.00
  //   },
  //   {
  //     id: '#ORD003',
  //     product: {
  //       name: 'Fresh Lettuce',
  //       image: '/images/products/lettuce.jpg'
  //     },
  //     seller: 'Green Farm',
  //     quantity: 2,
  //     date: '2024-03-19',
  //     status: 'shipping',
  //     total: 10.00
  //   },
  //   {
  //     id: '#ORD004',
  //     product: {
  //       name: 'Organic Potatoes',
  //       image: '/images/products/potatoes.jpg'
  //     },
  //     seller: 'Local Harvest',
  //     quantity: 4,
  //     date: '2024-03-18',
  //     status: 'delivered',
  //     total: 20.00
  //   }
  // ];

  // Function to render order card
  // const OrderCard = ({ order }: { order: Order }) => (
  //   <div
  //     key={order.id}
  //     className="bg-white rounded-lg shadow p-6 flex items-center justify-between"
  //   >
  //     <div className="flex items-center space-x-4">
  //       <img
  //         src={order.product.image}
  //         alt={order.product.name}
  //         className="h-16 w-16 object-cover rounded-md"
  //       />
  //       <div>
  //         <h3 className="font-medium text-gray-900">{order.product.name}</h3>
  //         <p className="text-sm text-gray-500">Seller: {order.seller}</p>
  //         <p className="text-sm text-gray-500">
  //           Quantity: {order.quantity} • GH₵{order.total.toFixed(2)}
  //         </p>
  //       </div>
  //     </div>
  //     <div className="text-right">
  //       <p className="text-sm text-gray-500">{order.date}</p>
  //       <span className={`
  //         inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
  //         ${
  //           order.status === 'pending'
  //             ? 'bg-yellow-100 text-yellow-800'
  //             : order.status === 'processing'
  //             ? 'bg-blue-100 text-blue-800'
  //             : order.status === 'shipping'
  //             ? 'bg-purple-100 text-purple-800'
  //             : 'bg-green-100 text-green-800'
  //         }
  //       `}>
  //         {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
  //       </span>
  //       <button
  //         onClick={() => navigate(`/orders/${order.id.replace('#', '')}`)}
  //         className="mt-2 text-[#468847] hover:text-[#3a7139] text-sm font-medium"
  //       >
  //         View Details
  //       </button>
  //     </div>
  //   </div>
  // );

  const tabConfig = [
    { name: 'My Orders', status: null },
    { name: 'Pending', status: 'pending' },
    { name: 'Processing', status: 'processing' },
    { name: 'Shipping', status: 'shipping' },
    { name: 'Delivered', status: 'delivered' },
  ];

  const getFilteredOrders = (status: string | null) => {
    return status ? orders.filter(order => order.status === status) : orders;
  };

  const tabs = tabConfig.map(tab => ({
    ...tab,
    count: getFilteredOrders(tab.status).length
  }));

  const clearAllOrders = () => {
    if (window.confirm('Are you sure you want to clear all orders? This action cannot be undone.')) {
      localStorage.setItem('userOrders', '[]');
      refreshOrders();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
        {orders.length > 0 && (
          <button
            onClick={clearAllOrders}
            className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 border border-red-600 rounded-md hover:bg-red-50"
          >
            Clear All Orders
          </button>
        )}
      </div>
      
      <Tab.Group onChange={setSelectedTab}>
        <Tab.List className="flex space-x-4 border-b border-gray-200">
          {tabs.map((tab) => (
            <Tab key={tab.name} className={({ selected }) =>
              `${selected ? 'border-[#468847] text-[#468847]' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
              border-b-2 py-4 px-1 text-sm font-medium`}>
              {tab.name}
              {tab.count > 0 && (
                <span className="ml-2 bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">
                  {tab.count}
                </span>
              )}
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels className="mt-6">
          {tabs.map((tab) => (
            <Tab.Panel key={tab.name}>
              <div className="space-y-4">
                {getFilteredOrders(tab.status).map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))}
              </div>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}