import React from 'react';
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
      <div className="flex justify-between items-end mb-10">
        <h2 className="text-3xl font-black text-white uppercase italic">Active Challenges</h2>
        <button className="text-green-500 font-bold hover:gap-3 flex items-center gap-2 transition-all">
          View All <ArrowRight size={20} />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
        {ongoingChallenges.map((item) => (
          <div key={item.id} className="group bg-[#1d2327] rounded-[2rem] p-4 border border-white/5 hover:border-green-500/40 transition-all duration-300 flex flex-col h-full">
            <div className="h-32 bg-gray-800 rounded-2xl mb-4 overflow-hidden relative">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-transform duration-500"
                onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1518173946687-a4c8a9833d8e?q=60&w=400"; }}
              />
            </div>
            <div className="flex-grow">
              <p className="text-green-500 text-[10px] font-black uppercase mb-1">{item.category}</p>
              <h3 className="text-sm font-bold text-gray-200 line-clamp-2">{item.title}</h3>
            </div>
            <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
              <Target size={12} className="text-gray-500" />
              <span className="text-white font-bold text-[10px]">{item.metric}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ActiveChallenges;