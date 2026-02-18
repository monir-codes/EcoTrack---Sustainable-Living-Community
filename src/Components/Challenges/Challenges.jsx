import React, { useState, useEffect } from 'react';
import { Leaf, Users, Calendar, ArrowRight, Filter, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const Challenges = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // আপনার দেওয়া ডাটা স্ট্রাকচার অনুযায়ী ডেমো ডাটা
  const allChallenges = [
    {
      _id: "1",
      title: "Plastic-Free July",
      category: "Waste Reduction",
      description: "Avoid single-use plastic for one month and embrace reusable alternatives.",
      duration: 30,
      target: "Reduce plastic waste",
      participants: 1240,
      impactMetric: "kg plastic saved",
      startDate: "2024-07-01",
      endDate: "2024-07-31",
      imageUrl: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?q=80&w=400"
    },
    {
      _id: "2",
      title: "Public Transport Week",
      category: "Sustainable Transport",
      description: "Ditch your car and use buses, trains or bicycles for your daily commute.",
      duration: 7,
      target: "Reduce carbon footprint",
      participants: 850,
      impactMetric: "CO2 emissions reduced",
      startDate: "2024-08-10",
      endDate: "2024-08-17",
      imageUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800"
    },
    {
      _id: "3",
      title: "5-Minute Shower",
      category: "Water Conservation",
      description: "Save water by limiting your shower time to just five minutes every day.",
      duration: 15,
      target: "Conserve water",
      participants: 3200,
      impactMetric: "Liters of water saved",
      startDate: "2024-09-01",
      endDate: "2024-09-15",
      imageUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800"
    }
  ];

  const categories = ["All", "Waste Reduction", "Energy Conservation", "Water Conservation", "Sustainable Transport", "Green Living"];

  // ফিল্টারিং লজিক
  const filteredChallenges = allChallenges.filter(challenge => {
    const matchesCategory = activeCategory === "All" || challenge.category === activeCategory;
    const matchesSearch = challenge.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#121619] text-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
          <div className="space-y-3">
            <h1 className="text-5xl font-black uppercase italic tracking-tighter">
              Active <span className="text-green-500">Challenges</span>
            </h1>
            <p className="text-gray-400 font-bold uppercase text-xs tracking-[0.3em]">
              Join a movement. Make a real impact.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80 group">
            <Search className="absolute left-4 top-4 text-gray-500 group-focus-within:text-green-500 transition-colors" size={20} />
            <input 
              type="text"
              placeholder="Search challenges..."
              className="w-full bg-[#1d2327] border border-white/5 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-green-500/50 transition-all font-medium"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Filter Categories */}
        <div className="flex flex-wrap gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border ${
                activeCategory === cat 
                ? "bg-green-500 text-black border-green-500" 
                : "bg-white/5 text-gray-400 border-white/5 hover:border-white/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Challenges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredChallenges.map((item) => (
            <Link to={`/challenges/${item._id}`} key={item._id} className="group bg-[#1d2327] rounded-[2.5rem] border border-white/5 overflow-hidden flex flex-col hover:border-green-500/30 transition-all duration-500 shadow-2xl">
              
              {/* Image Header */}
              <div className="h-60 overflow-hidden relative">
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-6 left-6">
                  <span className="bg-black/60 backdrop-blur-md text-green-500 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/10">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-black tracking-tighter uppercase italic">{item.title}</h3>
                  <div className="flex items-center gap-1 text-green-500 bg-green-500/10 px-3 py-1 rounded-lg">
                    <Users size={14} />
                    <span className="text-xs font-bold">{item.participants}</span>
                  </div>
                </div>

                <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
                  {item.description}
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-black/20 p-4 rounded-2xl border border-white/5">
                    <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">Duration</p>
                    <div className="flex items-center gap-2 text-white font-black">
                      <Calendar size={14} className="text-green-500" />
                      <span>{item.duration} Days</span>
                    </div>
                  </div>
                  <div className="bg-black/20 p-4 rounded-2xl border border-white/5">
                    <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">Target</p>
                    <p className="text-white font-black text-xs truncate">{item.impactMetric}</p>
                  </div>
                </div>

                {/* Join Button */}
                <button className="w-full bg-white text-black py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 group-hover:bg-green-500 transition-all duration-300">
                  Join Challenge <ArrowRight size={16} />
                </button>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filteredChallenges.length === 0 && (
          <div className="text-center py-20 bg-white/5 rounded-[3rem] border border-dashed border-white/10">
            <Leaf className="mx-auto text-gray-600 mb-4" size={48} />
            <p className="text-gray-500 font-bold uppercase tracking-widest">No challenges found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Challenges;