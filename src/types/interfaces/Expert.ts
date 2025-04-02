export interface Expert {
  id: string;
  name: string;
  image: string;
  specialty: string;
  experience: number;
  bio: string;
  location: string;
  followers: number;
  following: number;
  isFollowing: boolean;
  rating: number;
  contactNumber?: string;
  availability?: {
    days: string[];
    hours: string;
  };
}