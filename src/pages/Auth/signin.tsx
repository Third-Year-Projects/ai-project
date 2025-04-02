import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { BiShowAlt } from "react-icons/bi";
import { GrFormViewHide } from "react-icons/gr";
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

export default function Signin() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success('Successfully logged in!');
      navigate('/');
    } catch (error) {
      toast.error('Failed to login. Please check your credentials.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold">Sign In</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
          <button 
            type="button" 
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-2.5 text-gray-500 items-center"
          >
            {showPassword ? <GrFormViewHide className='w-6 h-8 ' /> : <BiShowAlt className='w-6 h-8 '  />}
          </button>
        </div>

        <div className="text-right">
          <Link to="/forgot-password" className="text-green-700 text-sm">
            Forgot Password
          </Link>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-[#468847] text-white rounded-md hover:bg-[#3a7139]"
        >
          SIGN IN
        </button>

        <div className="text-center text-gray-500">or</div>

        <div className="space-y-2">
          <button className="w-full p-2 border rounded-md flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" 
               className='w-5 h-5'
                fill="currentColor"viewBox="0 0 488 512"><path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/></svg>
            Login with Google
          </button>
          <button className="w-full p-2 border rounded-md flex items-center justify-center gap-2">
          <svg className='w-5 h-5' fill='currentColor' viewBox="0 0 384 512"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>
            Login with Apple
          </button>
        </div>
      </form>

      <div className="text-center">
        <span className="text-gray-600">Don't have an account? </span>
        <Link to="/signup" className="text-green-700">
          Sign Up
        </Link>
      </div>
    </div>
  );
}
