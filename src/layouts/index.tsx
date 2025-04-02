import { useState } from 'react';
import { Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel
     } from "@headlessui/react";
import greensLogo from "../assets/Logo.png";
import { HeartIcon,UserIcon } from "@heroicons/react/24/outline";
import { Link, NavLink, Outlet } from 'react-router-dom';
import { JSX } from 'react/jsx-runtime';
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import SearchBar from '../components/SearchBar/SearchBar';
import CartIcon from '../components/CartIcon/CartIcon';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import { useAuth } from '../contexts/AuthContext';





export default function Layout() {
    const [searchQuery, setSearchQuery] = useState('');
    const { isAuthenticated, user, logout } = useAuth(); // Move hook to component level

    const handleSearch = (term: string) => {
        setSearchQuery(term);
        // Add your RapidAPI search implementation here if needed
    };
    const handleMailClick = () => {
        window.location.href = "mailto:someone@example.com";
    };
   
    const navigation = {
        route:[
            { name: 'Shop Product', link: '/shopProduct' },
            { name: 'Sell Product', link: '/sellProduct' },
            { name: 'Compare', link: '/compare' },
            { name: 'Customer Help', link: '/customerSupport' },
            { name: 'About us', link: '/about' },
            // Add B2B link if user is a business account
            ...(user?.accountType === 'business' ? [{ name: 'B2B Portal', link: '/b2b-dashboard' }] : []),
        ],
        downloads:[
            {name:'Google Play',
                href:'#',
                icon:(props: JSX.IntrinsicAttributes &
                    React.SVGProps<SVGSVGElement>
                ) =>(
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        width="24"
                        height="24"
                        fill="currentColor"
                        role="img"
                        aria-label="Google Play Icon"
                        preserveAspectRatio="xMidYMid meet"
                        >
                        <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
                    </svg>

                    
                )
            },
            {name:'App Store',
                href:'#',
                icon:(props: JSX.IntrinsicAttributes &
                    React.SVGProps<SVGSVGElement>
                )=>(
                    <svg 
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 384 512">
                        <path 
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
                    </svg>
                )
            }
        ],
    social: [
        {
          name: 'Facebook',
          href: '#',
          icon: (
            props: JSX.IntrinsicAttributes &
              React.SVGProps<SVGSVGElement>
          ) => (
            <svg
              fill='currentColor'
              viewBox='0 0 24 24'
              {...props}
            >
              <path
                fillRule='evenodd'
                d='M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z'
                clipRule='evenodd'
              />
            </svg>
          ),
        },
        {
          name: 'Instagram',
          href: '#',
          icon: (
            props: JSX.IntrinsicAttributes &
              React.SVGProps<SVGSVGElement>
          ) => (
            <svg
              fill='currentColor'
              viewBox='0 0 24 24'
              {...props}
            >
              <path
                fillRule='evenodd'
                d='M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z'
                clipRule='evenodd'
              />
            </svg>
          ),
        },
        {
          name: 'X',
          href: '#',
          icon: (
            props: JSX.IntrinsicAttributes &
              React.SVGProps<SVGSVGElement>
          ) => (
            <svg
              fill='currentColor'
              viewBox='0 0 24 24'
              {...props}
            >
              <path d='M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z' />
            </svg>
          ),
        },
      ],
    }        
    return(
        <div className="w-full font-light">  
            <div className="w-full bg-primary p-0.5 pt-2 items-center font-primary">
                
                <div className="px-16 text-xs flex text-white justify-between border-b border-green-50 pb-2.5 ">
                    <p className=" font-light ">Welcome to the Green Makert, greens with ease.</p>
                    <div className="flex gap-2">
                        <p>Follow us: </p>
                        <div className='flex space-x-4 md:order-3'>
                            {navigation.social.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className='text-white hover:text-dark'
                            >
                                <span className='sr-only'>{item.name}</span>
                                <item.icon
                                aria-hidden='true'
                                className='h-4 w-4'
                                />
                            </a>
                    ))}
                        <div className="flex space-x-3 border-l pl-3 ">
                           <div className="flex items-center text-white hover:text-dark">
                            <p>Eng</p>
                            <span><ChevronDownIcon className="w-3 h-3 pl-0.5 block" />
                            </span>
                           </div>
                            <div className="flex items-center text-white hover:text-dark">
                            <p>Ghs</p>
                            <span><ChevronDownIcon className="w-3 h-3 pl-0.5 block" />
                            </span>
                            </div>
                        </div>

                </div>

                    </div>
                </div>
                <div className="flex m-4 justify-between px-12" >
                    {/* logo */}
                    <div className="flex flex-shrink-0 items-center">
                        <img 
                        alt="Green Makert Logo"
                        src={greensLogo}
                        className="h-14 w-34"
                        />
                    </div>    
                    {/* search area */}
                    <SearchBar onSearch={handleSearch} />
                    
                    {/* userprofile */}
                    <div className="flex items-center gap-3">
                        <CartIcon />
                        <HeartIcon color="white" width={24} height={24} className="hover:text-dark"/>
                        {isAuthenticated ? (
                            <Popover className="relative">
                                <PopoverButton className="flex items-center focus:outline-none">
                                    <UserIcon color="white" width={24} height={24} className="hover:text-dark"/>
                                </PopoverButton>
                                <PopoverPanel className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-white py-1 shadow-lg">
                                    <div className="px-4 py-2 border-b">
                                        <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                                    </div>
                                    {user?.accountType === 'business' && (
                                        <Link
                                            to="/b2b-dashboard"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            B2B Portal
                                        </Link>
                                    )}
                                    <Link
                                        to="/orders"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Dashboard
                                    </Link>
                                    <Link
                                        to="/revenue"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Revenue Analytics
                                    </Link>
                                    <button
                                        onClick={logout}
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Logout
                                    </button>
                                </PopoverPanel>
                            </Popover>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link 
                                    to="/auth/login" 
                                    className="text-white hover:text-dark text-sm px-3 py-1 border border-white rounded-md"
                                >
                                    Login
                                </Link>
                                <Link 
                                    to="/auth/Signup" 
                                    className="text-white hover:text-dark text-sm px-3 py-1 bg-white/10 border border-white rounded-md"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>


                
                </div>
                
            </div>
            <div className="border-b border-gray-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <PopoverGroup className="flex items-center h-16">
                  <NavLink 
                    to="/" 
                    className={({ isActive }) => 
                      `px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                        isActive 
                          ? 'text-[#468847] border-b-2 border-[#468847]' 
                          : 'text-gray-700 hover:text-[#468847] hover:border-b-2 hover:border-[#468847]'
                      }`
                    }
                  >
                    Products
                  </NavLink>
                  <NavLink 
                    to="/services" 
                    className={({ isActive }) => 
                      `px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                        isActive 
                          ? 'text-[#468847] border-b-2 border-[#468847]' 
                          : 'text-gray-700 hover:text-[#468847] hover:border-b-2 hover:border-[#468847]'
                      }`
                    }
                  >
                    Services
                  </NavLink>
                </PopoverGroup>
              </div>
            </div>
                
               
            <Breadcrumb />
            <Outlet />
            
            <footer className='text-white p-3 bg-primary'>
                {/* Top footer element */}
                <div className="flex items-center justify-between px-4 sm:px-8 md:px-20 lg:px-48">
                    {/* contact info */}
                    <div className=" text-sm">
                        <div className="">
                            <img 
                            alt="Green Makert Logo"
                            src={greensLogo}
                            className="h-14 w-34"
                            />
                        </div>
                        <div>
                            <p className="text-stone-300">Customer support</p>
                            <p>+233 20 500 3251</p>
                            <p className="text-stone-300">Computer Science 3 </p>
                            <p className="text-stone-300"> Group 54</p>
                            <button onClick={handleMailClick} className=" hover:text-dark">
                                info@greenmakert.com
                            </button>
                        </div>

                    </div>
                    {/* link shortcuts */}
                    <div>
                        <p className="font-bold ">Quick Links</p>
                        {navigation.route.map((item)=>(
                            <div className=" flex-col flex">
                            <Link 
                            key={item.name}
                            to={item.link} className="text-stone-400 hover:text-dark">
                                {item.name}
                                </Link>
                            </div>
                            
                        ))}
                        
                    </div>
                    {/* download Options */}
                    <div className="flex flex-col gap-y-1 text-sm font-extralight ">
                        <p className="font-normal self-center">Download App</p>
                        {navigation.downloads.map((item) =>(
                            <a 
                            className=" py-2 px-6 bg-dark rounded-sm" 
                            key={item.name}
                            href={item.href}>
                           
                            
                            <div className="flex gap-x-2 items-center">
            
                            <item.icon className="h-12 w-10"/>
                           
                                <div className="gap-y-0.5">
                                    <p className="">Get it now</p>
                                    <p className="font-bold" >{item.name}</p>
                                </div>
                            </div>

                        </a>
                        ))}
                        
                        
                    </div>
                </div>
                <div className='mt-8 border-t border-gray-900/20 pt-8 flex items-center flex-col'>
                <div className='order-2  gap-5 hidden lg:flex'>
                    <Link to='/terms'>Term of Use</Link>
                    <Link to='/privacy'>Privacy Policy</Link>
                </div>

                <p className='text-xs leading-5 text-gray-900'>
                    &copy; 2025 Green Makert.
                </p>
                </div>

                <div className='order-2  gap-5 flex justify-center pt-5 lg:hidden'>
                <Link to=''>Term of Use</Link>
                <Link to=''>Privacy Policy</Link>
                </div>
            </footer>
        </div>   
    )
}
