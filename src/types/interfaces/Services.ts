import { Review } from './Reviews';
import { Expert } from './Expert';

export interface ServiceReview extends Review {
  serviceId: string;
  isVerified: boolean;
}

export interface Service {
  id: string;
  title: string;
  provider: Expert;
  category: string;
  description: string;
  image: string;
  rating: number;
  reviewCount: number;
  price: string;
  location: string;
  availability: boolean;
  reviews: ServiceReview[];
}