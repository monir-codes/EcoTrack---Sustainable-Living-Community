import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Heart, ArrowRight, MousePointer2, BarChart3, Share2 } from 'lucide-react';

const StaticInfo = () => {
  const benefits = [
    {
      title: "Save Money",
      desc: "Energy-efficient habits and waste reduction can significantly lower your monthly utility bills.",
      icon: <Zap className="text-yellow-400" />,
      color: "from-yellow-500/20"
    },
    {
      title: "Better Health",
      desc: "Reducing pollution and using organic alternatives leads to a cleaner environment and healthier life.",
      icon: <Heart className="text-red-400" />,
      color: "from-red-500/20"
    },
    {
      title: "Future Ready",
      desc: "Preserving natural resources ensures a livable and thriving planet for the next generations.",
      icon: <ShieldCheck className="text-green-400" />,
      color: "from-green-500/20"
    }
  ];

  const steps = [
    { 
      title: "Join a Challenge", 
      desc: "Pick a goal that fits your lifestyle from our diverse range of eco-challenges.",
      icon: <MousePointer2 size={20} /> 
    },
    { 
      title: "Track Progress", 
      desc: "Log your daily activities and watch your real-time impact on the community dashboard.",
      icon: <BarChart3 size={20} /> 
    },
    { 
      title: "Share Tips", 
      desc: "Inspire others by sharing your green hacks and earning community upvotes.",
      icon: <Share2 size={20} /> 
    }
  ];

  return (
    <section className="py-24 bg-[#0e1113] relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-500/5 rounded-full blur-[120px] -mr-64 -mt-64"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* --- Part 1: Why Go Green? --- */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Why Go <span className="text-green-500">Green?</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto italic font-medium">
            Sustainable living isn't just about the planet; it's about improving your quality of life and securing your future.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-32">
          {benefits.map((item, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              whileHover={{ y: -10 }}
              className="group p-8 rounded-[2.5rem] bg-[#1d2327] border border-white/5 hover:border-green-500/30 transition-all duration-500"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} to-transparent flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                {item.icon}
              </div>
              <h4 className="text-xl font-bold text-white mb-4 italic uppercase tracking-tighter">{item.title}</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* --- Part 2: How It Works --- */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-[#1d2327]/50 border border-white/5 rounded-[3rem] p-10 md:p-16"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4 uppercase italic">How It Works</h2>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-1.5 bg-green-500 mx-auto rounded-full"
            ></motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connecting Line (Desktop Only) */}
            <div className="hidden md:block absolute top-10 left-0 w-full h-0.5 border-t-2 border-dashed border-green-500/20"></div>

            {steps.map((step, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.3 }}
                className="relative flex flex-col items-center text-center group"
              >
                {/* Step Number & Icon */}
                <motion.div 
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                  className="w-20 h-20 rounded-full bg-[#121619] border-4 border-[#1d2327] flex items-center justify-center mb-6 z-10 group-hover:border-green-500 transition-all duration-300 shadow-2xl shadow-green-500/5"
                >
                  <div className="text-green-500 group-hover:scale-110 transition-transform">
                    {step.icon}
                  </div>
                </motion.div>
                
                {/* Step Content */}
                <span className="text-green-500 font-black text-[10px] uppercase tracking-[0.3em] mb-2">Step 0{i+1}</span>
                <h4 className="text-xl font-bold text-white mb-3 italic tracking-tight">{step.title}</h4>
                <p className="text-gray-400 text-xs font-medium leading-relaxed px-4">
                  {step.desc}
                </p>

                {/* Mobile Arrow */}
                {i < 2 && (
                  <div className="md:hidden my-6 text-green-500/30">
                    <ArrowRight className="rotate-90" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StaticInfo;