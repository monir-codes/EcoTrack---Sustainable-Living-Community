import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { Trophy, Medal, Crown, Search, Filter } from 'lucide-react';

const Leaderboard = () => {
  const leaders = [
    { id: 1, name: "Tanvir Ahmed", points: 2850, impact: "120kg CO2", rank: 1, avatar: "https://i.pravatar.cc/150?u=1" },
    { id: 2, name: "Sakib Hossain", points: 2420, impact: "95kg CO2", rank: 2, avatar: "https://i.pravatar.cc/150?u=2" },
    { id: 3, name: "Nabila Islam", points: 2100, impact: "80kg CO2", rank: 3, avatar: "https://i.pravatar.cc/150?u=3" },
    { id: 4, name: "Ariful Haque", points: 1850, impact: "65kg CO2", rank: 4, avatar: "https://i.pravatar.cc/150?u=4" },
    { id: 5, name: "Zubair Khan", points: 1600, impact: "50kg CO2", rank: 5, avatar: "https://i.pravatar.cc/150?u=5" },
    { id: 6, name: "Mehedi Hasan", points: 1420, impact: "45kg CO2", rank: 6, avatar: "https://i.pravatar.cc/150?u=6" },
  ];

  return (
    <div className="min-h-screen bg-[#121619] text-white py-8 md:py-12 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-10 md:mb-16">
          <motion.div 
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            className="inline-block p-3 rounded-2xl bg-green-500/10 border border-green-500/20 mb-4"
          >
            <Trophy className="text-green-500" size={28} />
          </motion.div>
          <h1 className="text-3xl md:text-6xl font-black uppercase italic tracking-tighter mb-2">
            Eco <span className="text-green-500">Champions</span>
          </h1>
          <p className="text-gray-500 font-bold uppercase text-[8px] md:text-[10px] tracking-[0.2em] md:tracking-[0.3em]">Global Leaderboard</p>
        </div>

        {/* --- DESKTOP PODIUM (Hidden on Mobile) --- */}
        <div className="hidden md:flex items-end justify-center gap-4 mb-16">
          <PodiumCard user={leaders[1]} height="h-48" color="text-slate-400" delay={0.2} icon={<Medal size={24}/>} />
          <PodiumCard user={leaders[0]} height="h-64" color="text-yellow-500" delay={0.1} icon={<Crown size={32}/>} isLarge />
          <PodiumCard user={leaders[2]} height="h-40" color="text-orange-400" delay={0.3} icon={<Medal size={24}/>} />
        </div>

        {/* --- MOBILE HIGHLIGHTS (Visible only on Mobile) --- */}
{/* --- MOBILE HIGHLIGHTS --- */}
<div className="flex md:hidden flex-row justify-between gap-2 mb-10 overflow-x-auto pb-4 no-scrollbar">
  {[leaders[1], leaders[0], leaders[2]].map((user, idx) => (
    <motion.div 
      key={user.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.1 }}
      className={`min-w-[110px] flex-1 bg-[#1d2327] border ${user.rank === 1 ? 'border-yellow-500/30 ring-1 ring-yellow-500/20' : 'border-white/5'} p-4 rounded-3xl text-center`}
    >
      <div className="relative inline-block mb-2">
        {/* Avatar */}
        <img src={user.avatar} className="w-12 h-12 rounded-2xl border border-white/10 mx-auto" alt="" />
        
        {/* Animated Rank Badge */}
        <motion.div 
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 260, 
            damping: 20, 
            delay: 0.5 + (idx * 0.1) 
          }}
          className={`absolute -top-2 -right-2 w-6 h-6 rounded-lg flex items-center justify-center text-[11px] font-black bg-black border shadow-lg 
            ${user.rank === 1 ? 'text-yellow-500 border-yellow-500 shadow-yellow-500/20' : 
              user.rank === 2 ? 'text-slate-400 border-slate-400' : 
              'text-orange-400 border-orange-400'}`}
        >
          {/* Rank 1 এর জন্য বিশেষ গ্লোয়িং ইফেক্ট */}
          {user.rank === 1 && (
            <motion.div 
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute inset-0 bg-yellow-500 rounded-lg blur-[4px]"
            />
          )}
          <span className="relative z-10">{user.rank}</span>
        </motion.div>
      </div>

      <h3 className="text-[10px] font-black uppercase truncate">{user.name.split(' ')[0]}</h3>
      <p className={`text-xs font-black italic ${user.rank === 1 ? 'text-yellow-500' : 'text-green-500'}`}>
        <CountUp end={user.points} duration={2} />
      </p>
    </motion.div>
  ))}
</div>

        {/* Search & Filter Bar */}
        <div className="flex gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full bg-[#1d2327] border border-white/5 py-3 pl-11 pr-4 rounded-2xl focus:border-green-500/50 outline-none transition-all font-bold text-xs md:text-sm"
            />
          </div>
          <button className="bg-[#1d2327] border border-white/5 px-4 rounded-2xl hover:text-green-500 transition-colors">
            <Filter size={18} />
          </button>
        </div>

        {/* Rankings List */}
        <div className="space-y-2 md:space-y-3">
          {leaders.slice(3).map((user, index) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              key={user.id}
              className="group bg-[#1d2327] border border-white/5 p-3 md:p-4 rounded-[1.25rem] md:rounded-2xl flex items-center justify-between hover:border-green-500/30 transition-all"
            >
              <div className="flex items-center gap-3 md:gap-4">
                <span className="w-6 text-center font-black italic text-gray-700 text-xs md:text-sm">#{user.rank}</span>
                <img src={user.avatar} className="w-10 h-10 md:w-12 md:h-12 rounded-xl border border-white/5" alt="" />
                <div>
                  <h4 className="font-bold text-xs md:text-sm text-white leading-tight">{user.name}</h4>
                  <p className="text-[8px] md:text-[10px] text-gray-600 font-bold uppercase tracking-widest">{user.impact} Saved</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs md:text-base font-black italic text-white leading-none">
                  <CountUp end={user.points} duration={2} />
                </p>
                <span className="text-[8px] text-gray-700 font-black uppercase tracking-tighter">Points</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Desktop Podium Card (Only used for md+ screens)
const PodiumCard = ({ user, height, color, delay, icon, isLarge = false }) => (
  <motion.div 
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.8, type: "spring", bounce: 0.4 }}
    whileHover={{ y: -10 }} // মাউস নিলে কার্ডটি একটু উপরে উঠবে
    className="relative flex flex-col items-center w-1/3 group"
  >
    <div className={`relative mb-6 ${isLarge ? 'scale-110' : ''}`}>
      
      {/* ১. র‍্যাঙ্ক আইকন অ্যানিমেশন (Floating & Glowing) */}
      <motion.div 
        animate={{ 
          y: [0, -8, 0], // উপরে-নিচে ভাসবে
          filter: isLarge ? ["drop-shadow(0 0 5px #eab308)", "drop-shadow(0 0 20px #eab308)", "drop-shadow(0 0 5px #eab308)"] : [] 
        }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className={`absolute -top-10 left-1/2 -translate-x-1/2 z-20 ${color}`}
      >
        {icon}
      </motion.div>

      {/* ২. প্রোফাইল পিকচার গ্লো */}
      <div className="relative z-10">
        <img 
          src={user.avatar} 
          className={`rounded-[2rem] border-2 border-white/10 w-20 h-20 md:w-24 md:h-24 object-cover transition-all duration-500 group-hover:border-green-500/50`} 
          alt="" 
        />
        {/* র‍্যাঙ্ক নম্বর ব্যাজ */}
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: delay + 0.5 }}
          className="absolute -bottom-2 -right-2 bg-[#121619] text-white border border-white/10 text-[10px] font-black w-7 h-7 rounded-xl flex items-center justify-center shadow-2xl group-hover:bg-green-500 group-hover:text-black transition-colors"
        >
          {user.rank}
        </motion.div>
      </div>
      
      {/* ৩. রিফ্লেকশন বা শাইন ইফেক্ট */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
    </div>

    {/* ৪. পডিয়াম বেস (Glassmorphism) */}
    <div className={`w-full bg-gradient-to-t from-green-500/20 via-[#1d2327] to-[#1d2327] border-t border-x border-white/10 rounded-t-[2.5rem] p-6 text-center transition-all duration-500 group-hover:from-green-500/30 ${height}`}>
      <h3 className="font-black text-sm uppercase italic truncate w-full mb-1 tracking-wider">{user.name}</h3>
      <div className={`text-2xl font-black italic tracking-tighter ${color}`}>
        <CountUp end={user.points} duration={2.5} separator="," />
      </div>
      <p className="text-[9px] text-gray-500 font-black uppercase tracking-[0.2em] mt-1">Eco Points</p>
    </div>
  </motion.div>
);

export default Leaderboard;