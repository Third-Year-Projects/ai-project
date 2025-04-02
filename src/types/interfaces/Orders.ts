export interface Order {
  id: string;
  userId: string;
  date: string;
  items: OrderItem[];
  total: number;
  status: string;
  paymentMethod: string;
  billingInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    address: string;
  };
}

export interface OrderItem {
    id: number;
    name: string;
    image: string;
    price: number;
    quantity: number;
  }