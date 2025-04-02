export interface User {
  id: string;
  name: string;
  email: string;
  accountType: 'individual' | 'business';
  // ... other existing user properties
}