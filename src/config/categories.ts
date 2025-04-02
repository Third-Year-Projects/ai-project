import { VegetableIcon, FruitIcon, GrainIcon, LivestockIcon, SuppliesIcon, ProcessedIcon } from '../components/Icons/CategoryIcons';

export interface Category {
  name: string;
  description: string;
  href: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export const categories: Category[] = [
  {
    name: 'Fresh Vegetables',
    description: 'Local and organic vegetables, leafy greens, and roots',
    href: '/category/vegetables',
    icon: VegetableIcon
  },
  {
    name: 'Fresh Fruits',
    description: 'Seasonal fruits, exotic fruits, and citrus',
    href: '/category/fruits',
    icon: FruitIcon
  },
  {
    name: 'Grains & Cereals',
    description: 'Rice, wheat, maize, and other grains',
    href: '/category/grains',
    icon: GrainIcon
  },
  {
    name: 'Livestock Products',
    description: 'Meat, dairy products, and eggs',
    href: '/category/livestock',
    icon: LivestockIcon
  },
  {
    name: 'Farm Supplies',
    description: 'Seeds, fertilizers, and farming tools',
    href: '/category/supplies',
    icon: SuppliesIcon
  },
  {
    name: 'Processed Foods',
    description: 'Preserved foods and value-added products',
    href: '/category/processed',
    icon: ProcessedIcon
  }
];