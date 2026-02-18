import React from 'react';
import { motion } from 'framer-motion';
import { Target, ArrowRight } from 'lucide-react';

const ActiveChallenges = () => {
  const ongoingChallenges = [
    {
      id: 1,
      title: "Plastic-Free July",
      category: "Waste Reduction",
      metric: "5kg reduced/mo",
      image: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?q=80&w=400",
    },
    {
      id: 2,
      title: "Water Conservation",
      category: "Resource Saving",
      metric: "120L saved/wk",
      image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=500",
    },
    {
      id: 3,
      title: "Meal-less Mondays",
      category: "Carbon Merits",
      metric: "2kg CO2 saved",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=400",
    },
    {
      id: 4,
      title: "Cycle to Work",
      category: "Eco-Transport",
      metric: "50km traveled/wk",
      image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=400",
    },
    {
      id: 5,
      title: "Composting Hero",
      category: "Recycling",
      metric: "10kg organic waste",
      image: "https://picsum.photos/id/14/500/400",
    },
    {
      id: 6,
      title: "Solar Transition",
      category: "Home Energy",
      metric: "15kWh generated",
      image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=400",
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      {/* Header Animation */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.6 }}
        className="flex justify-between items-end mb-10"
      >
        <div>
          <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">
            Active <span className="text-green-500">Challenges</span>
          </h2>
          <div className="h-1 w-12 bg-green-500 mt-2 rounded-full"></div>
        </div>
        
        <motion.button 
          whileHover={{ x: 5 }}
          className="text-green-500 font-bold flex items-center gap-2 transition-all text-sm uppercase tracking-widest"
        >
          View All <ArrowRight size={18} />
        </motion.button>
      </motion.div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
        {ongoingChallenges.map((item, index) => (
          <motion.div 
            key={item.id} 
            // কার্ডগুলো নিচ থেকে স্লাইড হয়ে আসবে
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }} // স্ট্যাগার ইফেক্ট
            whileHover={{ y: -8 }} // হোভারে উপরে উঠবে
            className="group bg-[#1d2327] rounded-[2rem] p-4 border border-white/5 hover:border-green-500/40 transition-all duration-300 flex flex-col h-full shadow-xl"
          >
            {/* Image Container */}
            <div className="h-32 bg-gray-800 rounded-2xl mb-4 overflow-hidden relative">
              <motion.img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700"
                whileHover={{ scale: 1.15 }}
                onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1518173946687-a4c8a9833d8e?q=60&w=400"; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1d2327] to-transparent opacity-0 group-hover:opacity-40 transition-opacity"></div>
            </div>

            {/* Content */}
            <div className="flex-grow">
              <p className="text-green-500 text-[9px] font-black uppercase mb-1 tracking-widest">
                {item.category}
              </p>
              <h3 className="text-sm font-bold text-gray-200 line-clamp-2 leading-tight group-hover:text-white transition-colors">
                {item.title}
              </h3>
            </div>

            {/* Footer Stats */}
            <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
              <div className="p-1.5 bg-white/5 rounded-lg text-gray-500 group-hover:text-green-500 transition-colors">
                <Target size={14} />
              </div>
              <span className="text-white font-black text-[10px] uppercase tracking-tighter">
                {item.metric}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ActiveChallenges;