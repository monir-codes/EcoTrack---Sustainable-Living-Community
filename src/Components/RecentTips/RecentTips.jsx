import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpCircle, User, MessageSquareQuote, Tag } from 'lucide-react';
import CountUp from 'react-countup';
import { AuthContext } from '../../Auth/AuthContext/AuthContext';
import Loader from '../Loader/Loader';

// --- 1. Skeleton Component (ভিতরেই রাখলাম যাতে সুবিধা হয়) ---
const TipSkeleton = () => (
  <div className="bg-[#1d2327] p-6 md:p-8 rounded-[2.5rem] border border-white/5 animate-pulse flex flex-col md:flex-row items-start justify-between gap-6 w-full">
    <div className="flex gap-6 items-start flex-1 w-full">
      <div className="hidden sm:block w-14 h-14 rounded-2xl bg-white/5"></div>
      <div className="flex-1 space-y-4">
        <div className="w-24 h-3 bg-white/5 rounded-full"></div>
        <div className="w-3/4 h-6 bg-white/10 rounded-lg"></div>
        <div className="w-full h-10 bg-white/5 rounded-lg"></div>
        <div className="w-20 h-3 bg-white/5 rounded-full"></div>
      </div>
    </div>
    <div className="w-16 h-20 bg-white/5 rounded-3xl self-end md:self-center hidden md:block"></div>
  </div>
);

const RecentTips = () => {
  const { loading, setLoading } = useContext(AuthContext);
  const [communityTips, setCommunityTips] = useState([]);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3000/api/tips")
      .then((res) => res.json())
      .then((data) => {
        setCommunityTips(data);
        setLoading(false);
        setIsFirstLoad(false);
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
        setLoading(false);
        setIsFirstLoad(false);
      });
  }, [setLoading]);

  // ১. Global Spinner: শুধু একদম প্রথমবার লোড হওয়ার সময় দেখাবে
  if (loading && isFirstLoad) {
    return <Loader />;
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-16 overflow-hidden">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex items-center gap-4 mb-12"
      >
        <motion.div 
          whileHover={{ rotate: 15 }}
          className="p-4 bg-green-500/10 rounded-[1.5rem] text-green-500 border border-green-500/20 shadow-lg shadow-green-500/5"
        >
          <MessageSquareQuote size={32} />
        </motion.div>
        <div>
          <h2 className="text-4xl font-black text-white tracking-tighter uppercase italic">
            Community <span className="text-green-500">Tips</span>
          </h2>
          <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mt-1">
            Latest sustainable hacks from members
          </p>
        </div>
      </motion.div>

      {/* Tips List Area */}
      <div className="grid gap-6">
        {/* ২. Skeleton Loader: যখন ডেটা ফেচ হচ্ছে কিন্তু পেজ স্ট্রাকচার রেডি */}
        {loading ? (
          <>
            <TipSkeleton />
            <TipSkeleton />
            <TipSkeleton />
          </>
        ) : (
          communityTips.map((tip, index) => (
            <motion.div 
              key={tip._id || index} 
              initial={{ opacity: 0, x: -30, scale: 0.95 }} 
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1, 
                ease: "backOut" 
              }}
              whileHover={{ y: -5, borderColor: "rgba(34, 197, 94, 0.3)" }}
              className="group bg-[#1d2327] p-6 md:p-8 rounded-[2.5rem] border border-white/5 transition-all duration-500 flex flex-col md:flex-row items-start justify-between gap-6"
            >
              <div className="flex gap-6 items-start flex-1">
                <div className="hidden sm:flex flex-col items-center gap-2">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-14 h-14 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-center text-green-500 group-hover:bg-green-500 group-hover:text-black transition-all duration-500 shadow-lg"
                  >
                    <User size={24} />
                  </motion.div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-[9px] font-black text-green-500 uppercase tracking-widest">
                      <Tag size={10} /> {tip.category}
                    </span>
                  </div>

                  <h4 className="text-xl md:text-2xl font-black text-gray-100 group-hover:text-white transition-colors leading-tight italic tracking-tight">
                    {tip.title}
                  </h4>
                  
                  <p className="text-gray-500 text-sm font-medium line-clamp-2 leading-relaxed">
                    {tip.content}
                  </p>

                  <div className="pt-2 text-[10px] font-black text-gray-400 uppercase tracking-widest group-hover:text-gray-300">
                     By <span className="text-green-500 italic">@{tip.authorName?.replace(/\s+/g, '').toLowerCase() || 'anonymous'}</span>
                  </div>
                </div>
              </div>

              {/* Upvotes Counter */}
              <div className="flex md:flex-col items-center gap-3 bg-black/40 px-5 py-3 md:py-6 rounded-3xl border border-white/5 group-hover:border-green-500/20 transition-all self-end md:self-center">
                <motion.button 
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-500 group-hover:text-green-500 transition-all"
                >
                  <ArrowUpCircle size={32} strokeWidth={1.5} />
                </motion.button>
                
                <div className="hidden md:block h-[1px] w-8 bg-white/5"></div>
                
                <span className="text-xl font-black text-white tabular-nums tracking-tighter">
                  <CountUp 
                    start={0} 
                    end={tip.upvotes || 0} 
                    duration={2} 
                    enableScrollSpy={true} 
                    scrollSpyOnce={true}
                  />
                </span>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </section>
  );
};

export default RecentTips;