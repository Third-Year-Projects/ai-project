interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export const categories: Category[] = [
  {
    id: 'crop-advisory',
    name: 'Crop Advisory',
    description: 'Expert guidance on pest control, soil fertility, and crop management',
    icon: '🌾'
  },
  {
    id: 'livestock-health',
    name: 'Livestock Health',
    description: 'Professional veterinary care and breeding consultation',
    icon: '🐄'
  },
  {
    id: 'equipment',
    name: 'Farm Equipment',
    description: 'Equipment rental, maintenance, and repair services',
    icon: '🚜'
  },
  {
    id: 'training',
    name: 'Training & Consultation',
    description: 'Workshops and expert consultation on farming practices',
    icon: '📚'
  },
  {
    id: 'logistics',
    name: 'Supply Chain & Logistics',
    description: 'Storage, transportation, and distribution solutions',
    icon: '🚛'
  }
];