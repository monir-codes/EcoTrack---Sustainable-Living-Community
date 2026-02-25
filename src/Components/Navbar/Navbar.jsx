import React, { useContext, useState } from "react";
import {
  Menu,
  X,
  Leaf,
  User,
  ListChecks,
  LogOut,
  LogIn,
  PlusCircle,
} from "lucide-react";
import { RxAvatar } from "react-icons/rx";
import { AuthContext } from "../../Auth/AuthContext/AuthContext";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    setIsOpen(false);
    return logOut();
  };

  // রি-ইউজেবল প্রোফাইল ইমেজ লজিক
  const ProfileImage = ({ size = 40 }) => (
    <div className="rounded-full overflow-hidden flex items-center justify-center bg-gray-800  border-green-500/50 group-hover:border-green-400 transition-all shadow-lg shadow-green-500/10">
      {user?.photoURL ? (
        <img
          src={user.photoURL}
          alt="User Profile"
          className="w-full h-full object-cover"
        />
      ) : (
        <RxAvatar size={size} className="text-gray-400" />
      )}
    </div>
  );

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
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-green-400 font-bold" : "text-gray-400 hover:text-green-400 transition-colors"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/challenges"
              className={({ isActive }) =>
                isActive ? "text-green-400 font-bold" : "text-gray-400 hover:text-green-400 transition-colors"
              }
            >
              Challenges
            </NavLink>
            {user && (
              <NavLink
                to="/my-activities"
                className={({ isActive }) =>
                  isActive ? "text-green-400 font-bold" : "text-gray-400 hover:text-green-400 transition-colors"
                }
              >
                My Activities
              </NavLink>
            )}

            {/* User Profile Dropdown (Desktop) */}
            <div className="flex items-center gap-4 border-l border-gray-800 pl-8">
              {user ? (
                <div className="dropdown dropdown-end">
                  <label
                    tabIndex={0}
                    className="btn btn-ghost btn-circle avatar p-0 focus:bg-transparent active:bg-transparent"
                  >
                    <div className="w-10 h-10">
                       <ProfileImage size={40} />
                    </div>
                  </label>
                  <ul
                    tabIndex={0}
                    className="mt-3 z-[1] p-4 shadow-2xl menu menu-sm dropdown-content bg-[#1d2327] border border-white/10 text-gray-200 rounded-[1.5rem] w-64 space-y-1"
                  >
                    <li className="px-3 py-3 border-b border-white/5 mb-2 bg-black/20 rounded-2xl">
                      <p className="font-black text-white text-sm uppercase italic tracking-tighter">
                        {user?.displayName || "Eco Warrior"}
                      </p>
                      <p className="text-[10px] text-gray-500 truncate mt-0.5">
                        {user?.email}
                      </p>
                    </li>
                    <li>
                      <Link to="/profile" className="flex items-center gap-3 py-3 hover:bg-green-500 hover:text-black rounded-xl transition-all font-bold">
                        <User size={16} /> Profile
                      </Link>
                    </li>
                    <li>
                      <Link to="/my-activities" className="flex items-center gap-3 py-3 hover:bg-green-500 hover:text-black rounded-xl transition-all font-bold">
                        <ListChecks size={16} /> My Activities
                      </Link>
                    </li>
                    <li>
                      <Link to="/challenges/add" className="flex items-center gap-3 py-3 hover:bg-green-500 hover:text-black rounded-xl transition-all font-bold">
                        <PlusCircle size={16} /> Add Challenge
                      </Link>
                    </li>
                    <div className="h-[1px] bg-white/5 my-1"></div>
                    <li>
                      <button
                        onClick={handleLogOut}
                        className="flex items-center gap-3 py-3 text-red-400 hover:bg-red-500 hover:text-white rounded-xl transition-all font-bold"
                      >
                        <LogOut size={16} /> Logout
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <Link to="/login" className="text-white font-bold text-sm hover:text-green-400 transition-colors">
                    Login
                  </Link>
                  <Link to="/register" className="bg-green-500 hover:bg-green-400 text-black px-6 py-2.5 rounded-xl font-black transition-all transform hover:scale-105 shadow-lg shadow-green-500/20">
                    JOIN NOW
                  </Link>
                </div>
              )}
            </div>
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

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-[#121619] border-b border-gray-800 transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-[600px] opacity-100 py-6" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col space-y-2 px-6">
          <Link to="/" onClick={() => setIsOpen(false)} className="text-gray-300 font-bold py-3 border-b border-white/5">Home</Link>
          <Link to="/challenges" onClick={() => setIsOpen(false)} className="text-gray-300 font-bold py-3 border-b border-white/5">Challenges</Link>
          
          {user ? (
            <div className="pt-4 space-y-4">
              <div className="flex items-center gap-4 p-4 bg-black/20 rounded-3xl border border-white/5 mb-2">
                <div className="w-14">
                  <ProfileImage size={32} />
                </div>
                <div className="overflow-hidden">
                  <p className="text-white font-black italic uppercase text-sm truncate">{user?.displayName || "Eco Warrior"}</p>
                  <p className="text-gray-500 text-[10px] truncate">{user?.email}</p>
                </div>
              </div>
              
              <Link to="/profile" onClick={() => setIsOpen(false)} className="flex items-center gap-3 text-gray-300 font-bold py-2"><User size={18} /> Profile</Link>
              <Link to="/my-activities" onClick={() => setIsOpen(false)} className="flex items-center gap-3 text-gray-300 font-bold py-2"><ListChecks size={18} /> My Activities</Link>
              <Link to="/challenges/add" onClick={() => setIsOpen(false)} className="flex items-center gap-3 text-gray-300 font-bold py-2"><PlusCircle size={18} /> Add Challenge</Link>
              
              <button onClick={handleLogOut} className="flex items-center gap-3 text-red-400 font-bold py-4 w-full border-t border-white/5">
                <LogOut size={18} /> Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3 pt-6">
              <Link to="/login" onClick={() => setIsOpen(false)} className="bg-white/5 text-white py-4 rounded-2xl font-bold text-center border border-white/10">Login</Link>
              <Link to="/register" onClick={() => setIsOpen(false)} className="bg-green-500 text-black py-4 rounded-2xl font-black text-center">Join Community</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;