export class B2BNotificationService {
  async sendRestockReminder(customerId: string, products: Array<{
    productId: string;
    lastOrderDate: Date;
  }>) {
    // Implementation for sending notifications
  }

  async sendBulkDiscountOffer(customerId: string, offer: {
    products: Array<{
      productId: string;
      discount: number;
    }>;
    validUntil: Date;
  }) {
    // Implementation for sending bulk discount offers
  }
}