import { useState, useEffect } from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { format, subDays } from 'date-fns';
import { generateRevenueData, getMonthlyStats } from '../../utils/revenueDataGenerator';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function RevenueDashboard() {
  const [timeframe, setTimeframe] = useState<'7d' | '30d' | 'month'>('30d');
  const [data, setData] = useState(generateRevenueData(30));
  const [monthlyStats, setMonthlyStats] = useState(getMonthlyStats());

  useEffect(() => {
    const days = timeframe === '7d' ? 7 : timeframe === '30d' ? 30 : 30;
    setData(generateRevenueData(days));
  }, [timeframe]);

  const totalRevenue = data.reduce((sum, day) => sum + day.revenue, 0);
  const totalOrders = data.reduce((sum, day) => sum + day.orders, 0);
  const averageOrderValue = totalRevenue / totalOrders;

  const paymentMethodStats = data.reduce((acc, day) => {
    acc[day.paymentMethod] = (acc[day.paymentMethod] || 0) + day.revenue;
    return acc;
  }, {} as Record<string, number>);

  const customerTypeStats = data.reduce((acc, day) => {
    acc[day.customerType] = (acc[day.customerType] || 0) + day.revenue;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Revenue Analytics</h1>
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setTimeframe('7d')}
            className={`px-4 py-2 rounded ${
              timeframe === '7d' ? 'bg-[#468847] text-white' : 'bg-gray-100'
            }`}
          >
            7 Days
          </button>
          <button
            onClick={() => setTimeframe('30d')}
            className={`px-4 py-2 rounded ${
              timeframe === '30d' ? 'bg-[#468847] text-white' : 'bg-gray-100'
            }`}
          >
            30 Days
          </button>
          <button
            onClick={() => setTimeframe('month')}
            className={`px-4 py-2 rounded ${
              timeframe === 'month' ? 'bg-[#468847] text-white' : 'bg-gray-100'
            }`}
          >
            This Month
          </button>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Total Revenue</h3>
            <p className="text-3xl font-bold text-[#468847]">
              GH₵{totalRevenue.toFixed(2)}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Total Orders</h3>
            <p className="text-3xl font-bold text-[#468847]">{totalOrders}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Average Order Value</h3>
            <p className="text-3xl font-bold text-[#468847]">
              GH₵{averageOrderValue.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Revenue Trend</h3>
            <Line
              data={{
                labels: data.map(d => format(new Date(d.date), 'MMM dd')),
                datasets: [{
                  label: 'Daily Revenue',
                  data: data.map(d => d.revenue),
                  borderColor: '#468847',
                  tension: 0.4
                }]
              }}
            />
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Orders by Customer Type</h3>
            <Pie
              data={{
                labels: Object.keys(customerTypeStats),
                datasets: [{
                  data: Object.values(customerTypeStats),
                  backgroundColor: ['#468847', '#6aaa6d', '#8ecc91']
                }]
              }}
            />
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Payment Methods</h3>
            <Bar
              data={{
                labels: Object.keys(paymentMethodStats),
                datasets: [{
                  label: 'Revenue by Payment Method',
                  data: Object.values(paymentMethodStats),
                  backgroundColor: '#468847'
                }]
              }}
            />
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Top Products</h3>
            <div className="space-y-4">
              {data[0].products.sort((a, b) => b.revenue - a.revenue).map(product => (
                <div key={product.name} className="flex justify-between items-center">
                  <span>{product.name}</span>
                  <span className="font-semibold">GH₵{product.revenue.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}