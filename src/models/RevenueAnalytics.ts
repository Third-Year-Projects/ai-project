import { Order, OrderItem } from '../types/interfaces/Orders';

interface RevenueMetrics {
  totalRevenue: number;
  productRevenue: Map<string, number>;
  farmerRevenue: Map<string, number>;
  orderCount: number;
  commissionFees: number;
}

export class RevenueAnalytics {
  private metrics: RevenueMetrics;

  constructor() {
    this.metrics = {
      totalRevenue: 0,
      productRevenue: new Map(),
      farmerRevenue: new Map(),
      orderCount: 0,
      commissionFees: 0
    };
  }

  calculateRevenue(orders: Order[]): RevenueMetrics {
    this.resetMetrics();
    
    orders.forEach(order => {
      this.metrics.totalRevenue += order.total;  // Changed from totalAmount to total
      this.metrics.orderCount++;
      this.metrics.commissionFees += this.calculateCommission(order);
      
      this.updateProductRevenue(order);
      this.updateFarmerRevenue(order);
    });

    return this.metrics;
  }

  private calculateCommission(order: Order): number {
    const COMMISSION_RATE = 0.05; // 5% commission
    return order.total * COMMISSION_RATE;  // Changed from totalAmount to total
  }

  private updateProductRevenue(order: Order): void {
    order.items.forEach(item => {
      const currentRevenue = this.metrics.productRevenue.get(item.id.toString()) || 0;  // Changed from productId to id
      this.metrics.productRevenue.set(item.id.toString(), currentRevenue + item.price * item.quantity);
    });
  }

  private updateFarmerRevenue(order: Order): void {
    order.items.forEach(item => {
      // Since farmerId is not in the OrderItem interface, we might need to get it from a different source
      // For now, we'll use the order's userId as the farmer ID
      const currentRevenue = this.metrics.farmerRevenue.get(order.userId) || 0;
      this.metrics.farmerRevenue.set(order.userId, currentRevenue + item.price * item.quantity);
    });
  }

  private resetMetrics(): void {
    this.metrics = {
      totalRevenue: 0,
      productRevenue: new Map(),
      farmerRevenue: new Map(),
      orderCount: 0,
      commissionFees: 0
    };
  }
}