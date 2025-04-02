import { subDays, format, addDays } from 'date-fns';

interface B2BClient {
  id: string;
  name: string;
  type: 'supermarket' | 'restaurant' | 'hotel' | 'catering';
  contactPerson: string;
  email: string;
  phone: string;
  engagementScore: number;
  lastPurchase: string;
  totalSpent: number;
  purchaseHistory: {
    date: string;
    items: {
      product: string;
      quantity: number;
      price: number;
    }[];
    total: number;
  }[];
  interests: string[];
  recommendedProducts: string[];
  nextFollowUp: string;
}

const businessNames = [
  'Metro Supermarket', 'Fresh Foods Restaurant', 'Golden Hotel Chain',
  'City Catering Services', 'Green Grocers Market', 'Organic Restaurant',
  'Luxury Hotels Group', 'Premier Catering Co.'
];

const products = [
  'Organic Tomatoes', 'Premium Carrots', 'Fresh Lettuce',
  'Local Potatoes', 'Red Onions', 'Green Peppers',
  'Fresh Herbs Mix', 'Seasonal Fruits Bundle'
];

export const generateB2BData = (clientCount: number = 8): B2BClient[] => {
  return Array.from({ length: clientCount }).map((_, index) => {
    const type = ['supermarket', 'restaurant', 'hotel', 'catering'][Math.floor(Math.random() * 4)] as B2BClient['type'];
    const purchaseCount = Math.floor(Math.random() * 8) + 3;
    const lastPurchaseDate = subDays(new Date(), Math.floor(Math.random() * 30));

    const purchaseHistory = Array.from({ length: purchaseCount }).map((_, i) => {
      const purchaseDate = subDays(lastPurchaseDate, i * Math.floor(Math.random() * 15));
      const itemCount = Math.floor(Math.random() * 4) + 2;
      const items = Array.from({ length: itemCount }).map(() => ({
        product: products[Math.floor(Math.random() * products.length)],
        quantity: Math.floor(Math.random() * 100) + 20,
        price: Math.floor(Math.random() * 50) + 10
      }));

      return {
        date: format(purchaseDate, 'yyyy-MM-dd'),
        items,
        total: items.reduce((sum, item) => sum + (item.quantity * item.price), 0)
      };
    });

    const totalSpent = purchaseHistory.reduce((sum, purchase) => sum + purchase.total, 0);
    const engagementScore = Math.floor(Math.random() * 40) + 60; // 60-100

    return {
      id: `B2B${index + 1}`,
      name: businessNames[index % businessNames.length],
      type,
      contactPerson: `Contact ${index + 1}`,
      email: `contact${index + 1}@${businessNames[index % businessNames.length].toLowerCase().replace(/\s+/g, '')}.com`,
      phone: `+233${Math.floor(Math.random() * 900000000) + 100000000}`,
      engagementScore,
      lastPurchase: purchaseHistory[0].date,
      totalSpent,
      purchaseHistory,
      interests: products.slice(0, Math.floor(Math.random() * 4) + 2),
      recommendedProducts: products.slice(-Math.floor(Math.random() * 3) + 3),
      nextFollowUp: format(addDays(new Date(), Math.floor(Math.random() * 7) + 1), 'yyyy-MM-dd')
    };
  });
};