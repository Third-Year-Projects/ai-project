export interface Review {
  id: string;
  user: {
    id: string;
    name: string;
    image: string;
  };
  rating: number;
  comment: string;
  date: string;
  image?: string;
}

export interface ProductReview extends Review {
  verified?: boolean;
}

export interface ServiceReview extends Review {
  serviceId: string;
  isVerified: boolean;
}

export interface Ratings {
  average: number;
  reviews: Review[];
}