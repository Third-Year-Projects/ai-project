import { useCart } from '../../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

export default function CartIcon() {
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleCartClick = () => {
    if (!isAuthenticated) {
      toast.error('Please login to access your cart', {
        style: {
          background: '#468847',
          color: '#fff',
        },
        iconTheme: {
          primary: '#fff',
          secondary: '#468847',
        },
      });
      navigate('/auth/login');
      return;
    }
    navigate('/cart');
  };

  return (
    <div 
      className="relative cursor-pointer hover:opacity-80 transition-opacity"
      onClick={handleCartClick}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth="1.5" 
        stroke="white" 
        className="size-6 hover:text-dark transition-colors"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" 
        />
      </svg>

      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </div>
  );
}