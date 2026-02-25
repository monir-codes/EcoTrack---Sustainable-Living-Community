import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Target, ArrowRight, Activity, CheckCircle2, Clock } from 'lucide-react';
import { AuthContext } from '../../Auth/AuthContext/AuthContext';
import Loader from '../Loader/Loader';
import { Link } from 'react-router-dom';

const ActiveChallenges = () => {
  const { loading, setLoading } = useContext(AuthContext);
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3000/api/active-challenges")
      .then(res => res.json())
      .then(data => {
        setChallenges(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [setLoading]);

  if (loading) {
    return <Loader />;
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "Finished": return <CheckCircle2 size={12} className="text-green-500" />;
      case "Ongoing": return <Activity size={12} className="text-blue-500 animate-pulse" />;
      default: return <Clock size={12} className="text-gray-500" />;
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-16">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        className="flex justify-between items-end mb-12 gap-4"
      >
        <div className="space-y-2">
          <div className="flex items-center gap-2">
             <Target className="text-green-500" size={20} />
             <span className="text-xs font-black uppercase tracking-[0.3em] text-gray-500">Live Missions</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white uppercase italic tracking-tighter">
            Active <span className="text-green-500">Challenges</span>
          </h2>
          <div className="h-1 w-16 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
        </div>
        
        {/* Mobile-Fixed View Dashboard Link */}
        <Link to="/user-dashboard">
          <motion.button 
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center gap-2 text-gray-400 hover:text-green-500 transition-all text-[10px] font-black uppercase tracking-widest whitespace-nowrap"
          >
            <span className="hidden xs:inline">View Dashboard</span>
            <span className="xs:hidden">Dashboard</span> 
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </Link>
      </motion.div>

      {/* Grid Layout - Optimized for all screens */}
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {challenges.map((item, index) => (
          <motion.div 
            key={item._id} 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            whileHover={{ y: -5 }}
            className="group bg-[#0d1116] rounded-3xl p-4 border border-white/5 hover:border-green-500/30 transition-all duration-500 flex flex-col h-full shadow-2xl relative overflow-hidden"
          >
            {/* Image Overlay with Progress */}
            <div className="h-28 rounded-2xl mb-4 overflow-hidden relative">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100 opacity-40 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1116] to-transparent"></div>
              
              {/* Status Badge */}
              <div className="absolute top-2 right-2 px-2 py-1 bg-black/60 backdrop-blur-md rounded-lg border border-white/10 flex items-center gap-1.5">
                {getStatusIcon(item.status)}
                <span className="text-[8px] font-black uppercase tracking-tighter text-gray-300">{item.status}</span>
              </div>
            </div>

            {/* Content */}
            <div className="flex-grow space-y-2">
              <p className="text-green-500 text-[8px] font-black uppercase tracking-[0.2em]">
                {item.category}
              </p>
              <h3 className="text-xs md:text-sm font-bold text-white line-clamp-2 leading-tight uppercase tracking-tight italic">
                {item.title}
              </h3>
            </div>

            {/* Dynamic Progress Section */}
            <div className="mt-4 pt-4 border-t border-white/5 space-y-3">
              <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-tighter text-gray-500">
                <span>Progress</span>
                <span className="text-green-500">{item.progress}%</span>
              </div>
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${item.progress}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"
                />
              </div>
              
              <div className="flex justify-between items-center bg-white/5 p-2 rounded-xl">
                <Target size={12} className="text-green-500 opacity-50" />
                <span className="text-white font-black text-[9px] tracking-tighter italic truncate ml-2">
                  {item.metric}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ActiveChallenges;