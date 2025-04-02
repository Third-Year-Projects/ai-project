export interface B2BCustomer {
  id: string;
  businessName: string;
  businessType: 'SUPERMARKET' | 'RESTAURANT' | 'HOTEL' | 'WHOLESALER';
  contactPerson: {
    name: string;
    email: string;
    phone: string;
  };
  purchaseHistory: {
    lastOrderDate: Date;
    frequentProducts: Array<{
      productId: string;
      averageQuantity: number;
      lastPurchaseDate: Date;
    }>;
    totalSpent: number;
  };
  preferences: {
    preferredDeliveryDays: string[];
    preferredPaymentTerms: string;
    bulkOrderThreshold: number;
  };
  marketingPreferences: {
    emailNotifications: boolean;
    restockAlerts: boolean;
    promotionalOffers: boolean;
  };
}