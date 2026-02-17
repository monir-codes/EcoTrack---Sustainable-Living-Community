import React, { useContext, useState } from "react";
import { Menu, X, Leaf, User, ListChecks, LogOut, LogIn } from "lucide-react";
import { AuthContext } from "../../Auth/AuthContext/AuthContext";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    setIsOpen(false); // মোবাইলে মেনু বন্ধ করার জন্য
    return logOut();
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#121619]/95 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-green-500 p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
              <Leaf size={24} className="text-black" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-white">
              Eco<span className="text-green-500">Track</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/" className={({isActive}) => isActive ? "text-green-400 font-bold" : "text-gray-400 hover:text-green-400 transition-colors"}>Home</NavLink>
            <NavLink to="/challenges" className={({isActive}) => isActive ? "text-green-400 font-bold" : "text-gray-400 hover:text-green-400 transition-colors"}>Challenges</NavLink>
            
            {/* User Profile Dropdown (Desktop) */}
            <div className="flex items-center gap-4 border-l border-gray-800 pl-8">
              {user ? (
                <div className="dropdown dropdown-end">
                  <label tabIndex={0} className="btn btn-ghost btn-circle avatar border-2 border-green-500 hover:border-green-400 transition-all">
                    <div className="w-10 rounded-full">
                      <img src={user?.photoURL || "https://img.icons8.com/bubbles/100/leaf.png"} alt="User Profile" />
                    </div>
                  </label>
                  <ul tabIndex={0} className="mt-3 z-[1] p-4 shadow-2xl menu menu-sm dropdown-content bg-[#1d2327] border border-white/10 text-gray-200 rounded-[1.5rem] w-60 space-y-2">
                    <li className="px-2 py-2 border-b border-white/5 mb-2">
                      <p className="font-black text-white text-sm uppercase italic tracking-tighter">{user?.displayName || "Eco Warrior"}</p>
                      <p className="text-[10px] text-gray-500 truncate">{user?.email}</p>
                    </li>
                    <li><Link to="/profile" className="flex items-center gap-3 py-3 hover:bg-green-500 hover:text-black rounded-xl transition-all"><User size={16} /> Profile</Link></li>
                    <li><Link to="/my-activities" className="flex items-center gap-3 py-3 hover:bg-green-500 hover:text-black rounded-xl transition-all"><ListChecks size={16} /> My Activities</Link></li>
                    <div className="h-[1px] bg-white/5 my-1"></div>
                    <li><button onClick={handleLogOut} className="flex items-center gap-3 py-3 text-red-400 hover:bg-red-500 hover:text-white rounded-xl transition-all"><LogOut size={16} /> Logout</button></li>
                  </ul>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link to="/login" className="text-white font-bold text-sm hover:text-green-400 transition-colors">Login</Link>
                  <Link to="/register" className="bg-green-500 hover:bg-green-400 text-black px-6 py-2.5 rounded-full font-bold transition-all">Register</Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-gray-400 hover:text-white transition-colors">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Responsive Logic) */}
      <div className={`md:hidden bg-[#1a1f23] border-b border-gray-800 transition-all duration-300 overflow-hidden ${isOpen ? "max-h-[500px] opacity-100 py-6" : "max-h-0 opacity-0"}`}>
        <div className="flex flex-col space-y-4 px-6">
          <Link to="/" onClick={() => setIsOpen(false)} className="text-gray-300 py-2 border-b border-white/5">Home</Link>
          <Link to="/challenges" onClick={() => setIsOpen(false)} className="text-gray-300 py-2 border-b border-white/5">Challenges</Link>
          
          {user ? (
            <div className="pt-4 space-y-4">
              <div className="flex items-center gap-3 pb-4">
                <img src={user?.photoURL || "https://img.icons8.com/bubbles/100/leaf.png"} className="w-12 h-12 rounded-full border-2 border-green-500" alt="" />
                <div>
                  <p className="text-white font-bold">{user?.displayName}</p>
                  <p className="text-gray-500 text-xs">{user?.email}</p>
                </div>
              </div>
              <Link to="/profile" onClick={() => setIsOpen(false)} className="flex items-center gap-3 text-gray-300 py-2"><User size={18}/> Profile</Link>
              <Link to="/my-activities" onClick={() => setIsOpen(false)} className="flex items-center gap-3 text-gray-300 py-2"><ListChecks size={18}/> My Activities</Link>
              <button onClick={handleLogOut} className="flex items-center gap-3 text-red-400 py-2 w-full text-left"><LogOut size={18}/> Logout</button>
            </div>
          ) : (
            <div className="flex flex-col gap-3 pt-4">
              <Link to="/login" onClick={() => setIsOpen(false)} className="btn btn-outline text-white border-white/20 rounded-xl flex items-center gap-2"><LogIn size={18}/> Login</Link>
              <Link to="/register" onClick={() => setIsOpen(false)} className="btn bg-green-500 text-black border-none rounded-xl">Register Now</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;