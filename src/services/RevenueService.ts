import { RevenueAnalytics } from '../models/RevenueAnalytics';
import { Order, RevenueMetrics } from '../types';

export class RevenueService {
  private revenueAnalytics: RevenueAnalytics;

  constructor() {
    this.revenueAnalytics = new RevenueAnalytics();
  }

  async getTopSellingProducts(limit: number = 10): Promise<Array<{productId: string, revenue: number}>> {
    const currentMonthOrders = await this.fetchCurrentMonthOrders();
    const metrics = this.revenueAnalytics.calculateRevenue(currentMonthOrders);
    
    return Array.from(metrics.productRevenue.entries())
      .sort(([, a], [, b]) => b - a)
      .slice(0, limit)
      .map(([productId, revenue]) => ({ productId, revenue }));
  }

  async generateRevenueReport(startDate: Date, endDate: Date): Promise<RevenueMetrics> {
    const orders = await this.fetchOrdersInDateRange(startDate, endDate);
    return this.revenueAnalytics.calculateRevenue(orders);
  }

  private generateMockOrders(startDate: Date, endDate: Date): Order[] {
    const mockProducts = [
      { id: '1', name: 'Organic Tomatoes', price: 4.99 },
      { id: '2', name: 'Fresh Lettuce', price: 2.99 },
      { id: '3', name: 'Green Peppers', price: 3.49 },
      { id: '4', name: 'Carrots', price: 1.99 },
      { id: '5', name: 'Potatoes', price: 5.99 }
    ];

    return Array.from({ length: 50 }, () => ({
      id: Math.random().toString(36).substr(2, 9),
      userId: 'user123',
      date: new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime())).toISOString(),
      items: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, () => {
        const product = mockProducts[Math.floor(Math.random() * mockProducts.length)];
        return {
          id: Number(product.id),
          name: product.name,
          image: 'mock-image.jpg',
          price: product.price,
          quantity: Math.floor(Math.random() * 5) + 1
        };
      }),
      total: Math.random() * 1000,
      status: 'completed',
      paymentMethod: 'card',
      billingInfo: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phoneNumber: '123-456-7890',
        address: '123 Farm Street'
      }
    }));
  }

  async fetchOrdersInDateRange(startDate: Date, endDate: Date): Promise<Order[]> {
    return this.generateMockOrders(startDate, endDate);
  }

  async fetchCurrentMonthOrders(): Promise<Order[]> {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    return this.generateMockOrders(startOfMonth, now);
  }

  async fetchFarmerOrders(farmerId: string): Promise<Order[]> {
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    return this.generateMockOrders(lastMonth, new Date());
  }
}