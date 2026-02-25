import React, { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Camera, Edit3, X, Check, ShieldCheck, Zap, Target, Award, Globe } from 'lucide-react';
import CountUp from 'react-countup';
import { AuthContext } from '../../Auth/AuthContext/AuthContext';
import { RxAvatar } from 'react-icons/rx';

const Profile = () => {
  const { user } = useContext(AuthContext);

  // সিনট্যাক্স ফিক্স এবং স্টেট হ্যান্ডলিং
  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState({
    name: user?.displayName || "",
    photoURL: user?.photoURL || ""
  });

  if (!user) return (
    <div className="min-h-screen flex items-center justify-center bg-[#05070a]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-green-500"></div>
    </div>
  );

  const handleUpdate = async () => {
    // এখানে আপনার MongoDB/Firebase আপডেট লজিক বসবে
    console.log("Updating profile...", tempData);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-[#05070a] text-white py-10 md:py-20 px-4 sm:px-6 lg:px-8">
      {/* Ambient BG effects */}
      <div className="hidden md:block fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-5%] left-[-5%] w-[30vw] h-[30vw] bg-green-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[5%] right-[-5%] w-[25vw] h-[25vw] bg-emerald-500/5 rounded-full blur-[80px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Main Bento Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
          
          {/* 1. Profile Info Card (8 Columns) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:col-span-8 bg-[#0d1117] border border-white/5 rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 relative overflow-hidden group"
          >
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 md:gap-8 relative z-10">
              
              {/* Profile Image with Fixed Logic */}
              <div className="relative shrink-0">
                <div className="w-32 h-32 md:w-44 md:h-44 rounded-3xl md:rounded-[2.5rem] bg-gradient-to-tr from-green-500 to-emerald-400 p-[2px]">
                   <div className="w-full h-full rounded-[1.8rem] md:rounded-[2.4rem] overflow-hidden bg-black flex items-center justify-center">
                      {user?.photoURL ? (
                        <img 
                          src={user.photoURL} 
                          className="w-full h-full object-cover"
                          alt="User"
                        />
                      ) : (
                        <RxAvatar size={100} className="text-gray-600" />
                      )}
                   </div>
                </div>
                {isEditing && (
                  <label className="absolute -bottom-2 -right-2 p-2.5 bg-green-500 rounded-xl text-black cursor-pointer shadow-xl hover:scale-110 transition-transform">
                    <Camera size={18} strokeWidth={2.5} />
                    <input type="file" className="hidden" />
                  </label>
                )}
              </div>

              {/* Bio Details */}
              <div className="flex-grow text-center sm:text-left space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 rounded-full border border-green-500/20 text-green-500 text-[10px] font-black uppercase tracking-widest">
                  <ShieldCheck size={12} /> Elite Eco-Guardian
                </div>

                {isEditing ? (
                  <input 
                    type="text"
                    value={tempData.name}
                    onChange={(e) => setTempData({...tempData, name: e.target.value})}
                    className="block w-full bg-white/5 border-b-2 border-green-500 text-2xl md:text-4xl font-black italic uppercase tracking-tighter outline-none py-2 transition-all text-white placeholder:text-gray-700"
                    placeholder="Enter Name"
                  />
                ) : (
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black italic uppercase tracking-tighter leading-tight text-white">
                    {user?.displayName || "Eco Warrior"}
                  </h1>
                )}
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-center sm:justify-start gap-2 sm:gap-4 text-gray-400 font-bold text-[11px] uppercase tracking-widest">
                  <span className="flex items-center justify-center gap-2">
                    <Mail size={14} className="text-green-500" /> {user?.email}
                  </span>
                  <span className="hidden sm:inline text-white/10">|</span>
                  <span className="flex items-center justify-center gap-2">
                    <Globe size={14} className="text-green-500" /> Global Rank #42
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 2. Action Card (4 Columns) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:col-span-4 bg-green-500 rounded-[2rem] md:rounded-[3rem] p-6 md:p-8 flex md:flex-col justify-between items-center md:items-start shadow-[0_0_30px_rgba(34,197,94,0.1)]"
          >
            <div className="p-3 bg-black/10 rounded-2xl text-black">
              <Zap size={28} strokeWidth={2.5} fill="currentColor" />
            </div>
            
            <div className="flex flex-col items-end md:items-start text-black">
              <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Profile Control</p>
              <AnimatePresence mode="wait">
                {isEditing ? (
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="flex gap-2 mt-2"
                  >
                    <button onClick={handleUpdate} className="p-3 bg-black text-white rounded-xl hover:scale-105 active:scale-95 transition-all shadow-lg">
                      <Check size={20} />
                    </button>
                    <button onClick={() => setIsEditing(false)} className="p-3 bg-white/30 text-black rounded-xl hover:bg-white/40 transition-all">
                      <X size={20} />
                    </button>
                  </motion.div>
                ) : (
                  <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 mt-1 py-3 px-6 bg-black text-white rounded-xl hover:bg-black/80 transition-all font-black text-xs uppercase italic tracking-tighter shadow-lg">
                    <Edit3 size={16} /> Edit Profile
                  </button>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* 3. Dynamic Stats Grid */}
          {[
            { label: 'Impact Score', val: 8450, unit: 'Pts', icon: <Zap size={20}/>, color: 'text-yellow-400' },
            { label: 'Carbon Saved', val: 1240, unit: 'Kg', icon: <Target size={20}/>, color: 'text-blue-400' },
            { label: 'Global Level', val: 12, unit: 'Lvl', icon: <Award size={20}/>, color: 'text-purple-400' }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="md:col-span-4 bg-[#0d1117] border border-white/5 rounded-[2rem] p-6 md:p-8 group hover:border-green-500/20 transition-all duration-500"
            >
              <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-4 ${stat.color}`}>
                {stat.icon}
              </div>
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-500 mb-1">{stat.label}</p>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-black italic tracking-tighter leading-none">
                <CountUp end={stat.val} duration={2.5} separator="," enableScrollSpy scrollSpyOnce={false} />
                <span className="text-[10px] md:text-xs font-bold text-gray-600 ml-1 uppercase tracking-widest">{stat.unit}</span>
              </h3>
            </motion.div>
          ))}

        </div>

        {/* --- Footer Status --- */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          whileHover={{ opacity: 1 }}
          className="mt-12 flex flex-wrap justify-center gap-3 transition-opacity"
        >
          {['2FA Secure', 'Verified Data', 'Eco-API Active'].map((badge, i) => (
            <div key={i} className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[9px] font-black uppercase tracking-widest text-gray-300">{badge}</span>
            </div>
          ))}
        </motion.div>

      </div>
    </div>
  );
};

export default Profile;