import React, { useContext, useState } from 'react';
import { Menu, X, Leaf } from 'lucide-react';
import { AuthContext } from '../../Auth/AuthContext/AuthContext';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {user} = useContext(AuthContext);


  return (
    <nav className="sticky top-0 z-50 bg-[#121619]/90 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Section */}
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="bg-green-500 p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
              <Leaf size={24} className="text-black" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-white">
              Eco<span className="text-green-500">Track</span>
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-10 text-sm font-medium">
            <Link to={'/'} className="text-gray-400 hover:text-green-400 transition-colors duration-200">Home</Link>
            <Link to={'/challenges'} className="text-gray-400 hover:text-green-400 transition-colors duration-200">Challenges</Link>

          {
            user && <Link to={'/myActivities'} className="text-gray-400 hover:text-green-400 transition-colors duration-200">My Activities</Link>
          }
            <Link to={'/register'} className="bg-[#b4f481] hover:bg-[#a3e072] text-black px-6 py-2.5 rounded-full font-bold transition-all shadow-lg shadow-green-500/10">
              Register
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Animated) */}
      <div className={`md:hidden absolute w-full bg-[#1a1f23] border-b border-gray-800 transition-all duration-300 ${isOpen ? 'max-h-64 opacity-100 py-6' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="flex flex-col items-center space-y-4 px-4">
            <Link to={'/'} className="text-gray-300 hover:text-green-500 transition-colors duration-200">Home</Link>
            <Link to={'/challenges'} className="text-gray-300 hover:text-green-500 transition-colors duration-200">Challenges</Link>
          {
            user && <Link to={'/myActivities'} className="text-gray-300 hover:text-green-500 transition-colors duration-200">My Activities</Link>
          }
          <Link to={'/register'} className=" w-full btn bg-green-500 text-black py-3 rounded-xl font-bold">Register Now</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;