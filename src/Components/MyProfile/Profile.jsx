import React, { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Camera, Edit3, X, Check, ShieldCheck, Zap, Target, Award, Globe, Loader2, Link as LinkIcon } from 'lucide-react';
import CountUp from 'react-countup';
import { AuthContext } from '../../Auth/AuthContext/AuthContext';
import { updateProfile } from 'firebase/auth';
import { auth } from '../../Firebase/firebase.init';
import Swal from 'sweetalert2';

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
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
    setIsUpdating(true);
    try {
      // 1. Firebase Update
      await updateProfile(auth.currentUser, {
        displayName: tempData.name,
        photoURL: tempData.photoURL
      });

      // 2. MongoDB Update (Replace with your Vercel URL when deploying)
      const response = await fetch(`https://eco-track-server-jade.vercel.app/api/users/${user.email}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          displayName: tempData.name,
          photoURL: tempData.photoURL,
        }),
      });

      if (response.ok) {
        setUser({ ...user, displayName: tempData.name, photoURL: tempData.photoURL });
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Profile Updated!",
          showConfirmButton: false,
          timer: 1500,
          background: '#0d1117',
          color: '#fff'
        });
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#05070a] text-white py-10 md:py-20 px-4">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Profile Card */}
          <motion.div className="md:col-span-8 bg-[#0d1117] border border-white/5 rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row items-center gap-8 relative z-10">
              
              {/* Profile Image Display */}
              <div className="shrink-0">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-[2rem] bg-gradient-to-tr from-green-500 to-emerald-400 p-[2px]">
                  <div className="w-full h-full rounded-[1.9rem] overflow-hidden bg-black flex items-center justify-center">
                    <img
                      src={isEditing ? tempData.photoURL : user.photoURL || "https://ionicframework.com/docs/img/demos/avatar.svg"}
                      className="w-full h-full object-cover"
                      alt="User"
                    />
                  </div>
                </div>
              </div>

              <div className="flex-grow text-center sm:text-left space-y-4 w-full">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 rounded-full border border-green-500/20 text-green-500 text-[10px] font-black uppercase tracking-widest">
                  <ShieldCheck size={12} /> Elite Eco-Guardian
                </div>

                {isEditing ? (
                  <div className="space-y-3">
                    {/* Name Input */}
                    <div className="relative">
                      <Edit3 className="absolute left-0 top-3 text-green-500" size={16} />
                      <input
                        type="text"
                        value={tempData.name}
                        onChange={(e) => setTempData({ ...tempData, name: e.target.value })}
                        className="w-full bg-transparent border-b border-white/10 pl-7 py-2 outline-none focus:border-green-500 transition-all text-xl font-bold"
                        placeholder="Enter Name"
                      />
                    </div>
                    {/* Photo URL Input */}
                    <div className="relative">
                      <LinkIcon className="absolute left-0 top-3 text-green-500" size={16} />
                      <input
                        type="text"
                        value={tempData.photoURL}
                        onChange={(e) => setTempData({ ...tempData, photoURL: e.target.value })}
                        className="w-full bg-transparent border-b border-white/10 pl-7 py-2 outline-none focus:border-green-500 transition-all text-sm text-gray-400"
                        placeholder="Paste Image URL"
                      />
                    </div>
                  </div>
                ) : (
                  <h1 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter text-white">
                    {user?.displayName || "Eco Warrior"}
                  </h1>
                )}

                <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-gray-400 font-bold text-[10px] uppercase tracking-widest">
                   <span className="flex items-center gap-2"><Mail size={14} className="text-green-500" /> {user?.email}</span>
                   <span className="flex items-center gap-2"><Globe size={14} className="text-green-500" /> Global Rank #42</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Action Card */}
          <motion.div className="md:col-span-4 bg-green-500 rounded-[2.5rem] p-8 flex md:flex-col justify-between items-center md:items-start shadow-lg">
            <div className="p-3 bg-black/10 rounded-2xl text-black">
              <Zap size={28} strokeWidth={2.5} fill="currentColor" />
            </div>

            <div className="flex flex-col items-end md:items-start text-black">
              <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Control Center</p>
              <AnimatePresence mode="wait">
                {isEditing ? (
                  <motion.div className="flex gap-2 mt-2">
                    <button 
                      disabled={isUpdating}
                      onClick={handleUpdate} 
                      className="p-3 bg-black text-white rounded-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center min-w-[50px]"
                    >
                      {isUpdating ? <Loader2 size={20} className="animate-spin" /> : <Check size={20} />}
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

          {/* Stats Section */}
          {[
            { label: 'Impact Score', val: 8450, unit: 'Pts', icon: <Zap size={20} />, color: 'text-yellow-400' },
            { label: 'Carbon Saved', val: 1240, unit: 'Kg', icon: <Target size={20} />, color: 'text-blue-400' },
            { label: 'Global Level', val: 12, unit: 'Lvl', icon: <Award size={20} />, color: 'text-purple-400' }
          ].map((stat, i) => (
            <motion.div key={i} className="md:col-span-4 bg-[#0d1117] border border-white/5 rounded-[2rem] p-8 group hover:border-green-500/20 transition-all duration-500">
               <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-4 ${stat.color}`}>{stat.icon}</div>
               <p className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-500 mb-1">{stat.label}</p>
               <h3 className="text-3xl md:text-4xl font-black italic tracking-tighter leading-none">
                 <CountUp end={stat.val} duration={2.5} separator="," />
                 <span className="text-[10px] font-bold text-gray-600 ml-1 uppercase tracking-widest">{stat.unit}</span>
               </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;