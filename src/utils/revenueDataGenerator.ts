import { subDays, format, startOfMonth, endOfMonth } from 'date-fns';

interface SaleData {
  date: string;
  revenue: number;
  orders: number;
  products: {
    name: string;
    quantity: number;
    revenue: number;
  }[];
  paymentMethod: 'card' | 'mobile_money' | 'cash';
  customerType: 'retail' | 'wholesale' | 'b2b';
}

export const generateRevenueData = (days: number = 30): SaleData[] => {
  const products = [
    { name: 'Tomatoes', basePrice: 5, variance: 2 },
    { name: 'Carrots', basePrice: 3, variance: 1 },
    { name: 'Lettuce', basePrice: 4, variance: 1.5 },
    { name: 'Potatoes', basePrice: 6, variance: 2 },
    { name: 'Onions', basePrice: 4, variance: 1 }
  ];

  const paymentMethods = ['card', 'mobile_money', 'cash'];
  const customerTypes = ['retail', 'wholesale', 'b2b'];

  return Array.from({ length: days }).map((_, index) => {
    const date = subDays(new Date(), index);
    const isWeekend = [0, 6].includes(date.getDay());
    const orderBase = isWeekend ? 15 : 25;
    const orders = Math.floor(orderBase + Math.random() * 10);

    const dailyProducts = products.map(product => {
      const quantity = Math.floor(Math.random() * 50) + 10;
      const priceVariation = (Math.random() * product.variance * 2) - product.variance;
      const price = product.basePrice + priceVariation;
      return {
        name: product.name,
        quantity,
        revenue: Number((quantity * price).toFixed(2))
      };
    });

    return {
      date: format(date, 'yyyy-MM-dd'),
      revenue: dailyProducts.reduce((sum, p) => sum + p.revenue, 0),
      orders,
      products: dailyProducts,
      paymentMethod: paymentMethods[Math.floor(Math.random() * paymentMethods.length)] as 'card' | 'mobile_money' | 'cash',
      customerType: customerTypes[Math.floor(Math.random() * customerTypes.length)] as 'retail' | 'wholesale' | 'b2b'
    };
  });
};

export const getMonthlyStats = () => {
  const currentMonth = new Date();
  const start = startOfMonth(currentMonth);
  const end = endOfMonth(currentMonth);
  const daysInMonth = end.getDate();
  
  return generateRevenueData(daysInMonth);
};