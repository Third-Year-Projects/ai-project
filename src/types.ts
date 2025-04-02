export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  images: string[];
  unit: string;
  stock: number;
  minOrder: number;
  maxOrder: number;
  seller: {
    id: string;
    name: string;
  };
  discounts?: {
    bulk?: {
      percentage: number;
      minQuantity: number;
    };
  };
}