import { Outlet, Link } from 'react-router-dom';
import greensLogo from "../assets/Logo.png";

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-primary p-4">
        <div className="max-w-7xl mx-auto">
          <Link to="/" className="flex items-center">
            <img 
              src={greensLogo} 
              alt="Green Market Logo" 
              className="h-10 w-auto"
            />
          </Link>
        </div>
      </div>

      {/* Auth Content */}
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
          <Outlet />
        </div>
      </div>

      {/* Simple Footer */}
      <footer className="bg-primary py-4">
        <div className="max-w-7xl mx-auto px-4 text-center text-white text-sm">
          <p>&copy; 2025 Green Market. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}