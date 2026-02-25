import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Target, Zap, Award, ArrowUpRight, CheckCircle2, BarChart3 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import CountUp from 'react-countup';
import { Link } from 'react-router-dom';

// গ্রাফের জন্য স্যাম্পল ডাটা (এটি আপনার ব্যাকএন্ড থেকে আসবে)
const impactData = [
  { name: 'Mon', co2: 10 },
  { name: 'Tue', co2: 25 },
  { name: 'Wed', co2: 15 },
  { name: 'Thu', co2: 45 },
  { name: 'Fri', co2: 30 },
  { name: 'Sat', co2: 55 },
  { name: 'Sun', co2: 40 },
];

const UserDashboard = () => {
  // ধরুন আপনার ডাটাবেজে ইউজারের এনরোল করা চ্যালেঞ্জগুলো এখানে আছে
  const [activeChallenges, setActiveChallenges] = useState([]);

  useEffect(() => {
    // এখানে আপনার API কল হবে: fetch(`http://localhost:3000/api/user-challenges/${user.email}`)
    // আপাতত স্যাম্পল ডাটা দিচ্ছি
    setActiveChallenges([
      { id: 1, title: "Plastic-Free July", progress: 75, icon: <Target />, color: "from-green-500 to-emerald-400" },
      { id: 2, title: "Cycle to Work", progress: 40, icon: <Zap />, color: "from-blue-500 to-cyan-400" }
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-[#0d1117] text-white p-4 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter">
              My <span className="text-green-500">Impact</span> Dashboard
            </h1>
            <p className="text-gray-500 text-sm mt-2 font-bold uppercase tracking-widest">Tracking your active journey to zero waste</p>
          </div>
          <Link to={'/challenges'} className="px-6 py-3 bg-green-500 text-black font-black rounded-xl hover:bg-green-400 transition-all flex items-center gap-2">
            Explore New Challenges <ArrowUpRight size={20} />
          </Link>
        </div>

        {/* Impact Chart & Stats Container */}
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* 1. Weekly Progress Chart (স্পেশাল এডিশন) */}
          <div className="lg:col-span-2 bg-[#1d2327] p-6 rounded-[2.5rem] border border-white/5 shadow-2xl">
            <div className="flex items-center gap-2 mb-6">
              <BarChart3 className="text-green-500" size={20} />
              <h3 className="font-black italic uppercase text-sm">Weekly Carbon Reduction (KG)</h3>
            </div>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={impactData}>
                  <defs>
                    <linearGradient id="colorCo2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                  <XAxis dataKey="name" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1d2327', border: '1px solid #ffffff10', borderRadius: '12px' }}
                    itemStyle={{ color: '#22c55e', fontWeight: 'bold' }}
                  />
                  <Area type="monotone" dataKey="co2" stroke="#22c55e" strokeWidth={3} fillOpacity={1} fill="url(#colorCo2)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 2. Quick Stats Card */}
          <div className="bg-gradient-to-br from-green-600 to-emerald-700 p-8 rounded-[2.5rem] text-black flex flex-col justify-between shadow-xl shadow-green-500/10">
            <div>
              <Award size={40} />
              <h4 className="text-2xl font-black italic uppercase mt-4">Earth Guardian Status</h4>
              <p className="text-black/70 font-bold text-sm">You are in the top 5% of your local community this month!</p>
            </div>
            <div className="mt-8">
               <span className="text-5xl font-black leading-none">
                 <CountUp end={850} duration={3} />
               </span>
               <p className="text-xs font-black uppercase tracking-widest mt-1">Total Points Earned</p>
            </div>
          </div>
        </div>

        {/* 3. Your Enrolled Challenges List */}
        <div className="space-y-6">
          <h3 className="text-xl font-black italic uppercase flex items-center gap-2">
            <Target className="text-green-500" /> Currently Enrolled
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {activeChallenges.map((challenge) => (
              <div key={challenge.id} className="bg-[#1d2327] p-8 rounded-[3rem] border border-white/5 hover:border-green-500/20 transition-all group">
                <div className="flex justify-between items-start mb-6">
                  <div className="space-y-1">
                    <h4 className="text-2xl font-black italic uppercase text-white group-hover:text-green-500 transition-colors">
                      {challenge.title}
                    </h4>
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Goal: 30 Days Tracking</p>
                  </div>
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-green-500">
                    {challenge.icon}
                  </div>
                </div>
                
                {/* Progress Visual */}
                <div className="space-y-3">
                  <div className="flex justify-between text-xs font-black uppercase tracking-widest">
                    <span>Progress</span>
                    <span className="text-green-500">{challenge.progress}%</span>
                  </div>
                  <div className="w-full h-4 bg-black/40 rounded-full border border-white/5 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${challenge.progress}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={`h-full bg-gradient-to-r ${challenge.color}`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default UserDashboard;