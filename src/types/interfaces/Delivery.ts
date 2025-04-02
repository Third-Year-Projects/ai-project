export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Pickup {
  available: boolean;
  location?: string;
  coordinates?: Coordinates;
}

export interface DeliveryMethod {
  cost: number;
  estimatedTime: string;
  available?: boolean;
  restrictions?: string;
}

export interface DeliveryOptions {
  pickup: Pickup;
  standardDelivery: DeliveryMethod;
  expressDelivery: DeliveryMethod;
}