import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpCircle, User, MessageSquareQuote, Tag } from 'lucide-react';
import CountUp from 'react-countup';

const RecentTips = () => {
  const communityTips = [
    {
      id: "65a0b1",
      title: "How to compost at home",
      content: "Simple steps for home composting: use a bin, mix green and brown waste...",
      category: "Waste Management",
      authorName: "Green User",
      upvotes: 25,
      createdAt: "2024-01-20T10:30:00Z"
    },
    {
      id: "65a0b2",
      title: "Solar Charging Hacks",
      content: "Position your portable solar panels at a 45-degree angle for max efficiency...",
      category: "Energy Conservation",
      authorName: "Rony Ahmed",
      upvotes: 210,
      createdAt: "2024-02-15T08:20:00Z"
    },
    {
      id: "65a0b3",
      title: "Rainwater Harvesting 101",
      content: "A simple barrel system can save gallons of water for your garden...",
      category: "Water Conservation",
      authorName: "Sara Karim",
      upvotes: 89,
      createdAt: "2024-02-17T14:45:00Z"
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-16 overflow-hidden">
      {/* Header Animation: নিচ থেকে ধীরে উপরে উঠবে */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex items-center gap-4 mb-12"
      >
        <motion.div 
          whileHover={{ rotate: 15 }} // হোভারে আইকনটি একটু কাত হবে
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

      {/* Tips List */}
      <div className="grid gap-6">
        {communityTips.map((tip, index) => (
          <motion.div 
            key={tip.id} 
            // এনিমেশন: বাম থেকে স্লাইড হবে এবং হালকা ছোট থেকে বড় হবে
            initial={{ opacity: 0, x: -30, scale: 0.95 }} 
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ 
              duration: 0.6, 
              delay: index * 0.15, // একটির পর একটি আসবে (Stagger)
              ease: "backOut" // হালকা পপ-আপ ইফেক্ট দিবে
            }}
            whileHover={{ y: -5, borderColor: "rgba(34, 197, 94, 0.3)" }}
            className="group bg-[#1d2327] p-6 md:p-8 rounded-[2.5rem] border border-white/5 transition-all duration-500 flex flex-col md:flex-row items-start justify-between gap-6"
          >
            <div className="flex gap-6 items-start flex-1">
              {/* Profile Icon Animation */}
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
                  <motion.span 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: (index * 0.15) + 0.3 }}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-[9px] font-black text-green-500 uppercase tracking-widest"
                  >
                    <Tag size={10} /> {tip.category}
                  </motion.span>
                </div>

                <h4 className="text-xl md:text-2xl font-black text-gray-100 group-hover:text-white transition-colors leading-tight italic tracking-tight">
                  {tip.title}
                </h4>
                
                <p className="text-gray-500 text-sm font-medium line-clamp-2 leading-relaxed">
                  {tip.content}
                </p>

                <div className="pt-2 text-[10px] font-black text-gray-400 uppercase tracking-widest group-hover:text-gray-300">
                   By <span className="text-green-500 italic">@{tip.authorName.replace(/\s+/g, '').toLowerCase()}</span>
                </div>
              </div>
            </div>

            {/* Upvotes Counter with Animated Up Arrow */}
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
                  end={tip.upvotes} 
                  duration={2.5} 
                  enableScrollSpy={true} 
                  scrollSpyOnce={true}
                  useEasing={true}
                />
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default RecentTips;