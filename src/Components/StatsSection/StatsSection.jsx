import React from 'react';
import { Wind, Trash2, Droplets, Zap } from 'lucide-react';

const StatsSection = () => {
  // এই ডেটাগুলো সাধারণত backend থেকে আসবে
  const communityStats = [
    {
      id: 1,
      label: "Total CO₂ Saved",
      value: "12,450",
      unit: "kg",
      icon: <Wind size={24} />,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
      borderColor: "group-hover:border-blue-400/50"
    },
    {
      id: 2,
      label: "Plastic Reduced",
      value: "8,200",
      unit: "kg",
      icon: <Trash2 size={24} />,
      color: "text-green-400",
      bg: "bg-green-400/10",
      borderColor: "group-hover:border-green-400/50"
    },
    {
      id: 3,
      label: "Water Conserved",
      value: "45,000",
      unit: "Liters",
      icon: <Droplets size={24} />,
      color: "text-cyan-400",
      bg: "bg-cyan-400/10",
      borderColor: "group-hover:border-cyan-400/50"
    },
    {
      id: 4,
      label: "Energy Saved",
      value: "3,200",
      unit: "kWh",
      icon: <Zap size={24} />,
      color: "text-yellow-400",
      bg: "bg-yellow-400/10",
      borderColor: "group-hover:border-yellow-400/50"
    }
  ];

  return (
    <section className="py-12 bg-[#121619]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {communityStats.map((stat) => (
            <div 
              key={stat.id} 
              className={`group relative p-8 rounded-[2rem] bg-[#1d2327] border border-white/5 transition-all duration-300 hover:-translate-y-2 ${stat.borderColor}`}
            >
              {/* Icon Background */}
              <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                {stat.icon}
              </div>

              {/* Stats Data */}
              <div className="space-y-1">
                <div className="flex items-baseline gap-1">
                  <h3 className="text-3xl font-black text-white tabular-nums tracking-tight">
                    {stat.value}
                  </h3>
                  <span className={`${stat.color} font-bold text-sm uppercase`}>
                    {stat.unit}
                  </span>
                </div>
                <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>

              {/* Decorative Gradient Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent rounded-[2rem] pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;