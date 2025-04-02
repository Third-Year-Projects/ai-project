import { Seller } from './Seller';
import { Traceability } from './Traceability';
import { DeliveryOptions } from './Delivery';
import { Ratings } from './Reviews';

export interface NutritionalValue {
  calories: string;
  carbohydrates: string;
  protein: string;
}

export interface PaymentOptions {
  acceptsCreditCard: boolean;
  acceptsMobileMoney: boolean;
  acceptsCashOnDelivery: boolean;
  acceptsPaypal: boolean;
}

export interface Discounts {
  bulk: {
    minQuantity: number;
    percentage: number;
  };
  seasonal: boolean;
  promoCode?: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  images: string[];
  description: string;
  rating: number;
  stock: number;
  unit: string;
  minOrder: number;
  maxOrder: number;
  seller: Seller;
  traceability: Traceability;
  deliveryOptions: DeliveryOptions;
  ratings: Ratings;
  nutritionalValue?: NutritionalValue;
  storageInstructions?: string;
  paymentOptions: PaymentOptions;
  discounts: Discounts;
}

export interface CartItem extends Product {
  quantity: number;
}