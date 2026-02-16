import React from 'react';
import { ArrowUpCircle, User, Clock, MessageSquareQuote } from 'lucide-react';

const RecentTips = () => {
  // ডাইনামিক ডেটা যা ডেটাবেস থেকে আসবে
  const communityTips = [
    {
      id: 1,
      title: "Use bamboo tooth brushes to reduce ocean plastic waste.",
      authorName: "Ariful Islam",
      upvotes: 142,
      createdAt: "2 hours ago"
    },
    {
      id: 2,
      title: "Collecting rain water can save up to 30% on your water bill.",
      authorName: "Sara Karim",
      upvotes: 89,
      createdAt: "5 hours ago"
    },
    {
      id: 3,
      title: "Switch to LED bulbs—they use 75% less energy than incandescents.",
      authorName: "Rony Ahmed",
      upvotes: 210,
      createdAt: "1 day ago"
    },
    {
      id: 4,
      title: "Start a small compost bin even if you live in an apartment.",
      authorName: "Mitu Sen",
      upvotes: 56,
      createdAt: "1 day ago"
    },
    {
      id: 5,
      title: "Walking or biking for trips under 2km is better for your heart and air.",
      authorName: "Tanvir Hossain",
      upvotes: 77,
      createdAt: "2 days ago"
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="flex items-center gap-3 mb-10">
        <div className="p-3 bg-green-500/10 rounded-2xl text-green-500">
          <MessageSquareQuote size={28} />
        </div>
        <div>
          <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic">
            Community <span className="text-green-500">Tips</span>
          </h2>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-1">
            Latest sustainable hacks from our members
          </p>
        </div>
      </div>

      {/* Tips List */}
      <div className="grid gap-4">
        {communityTips.map((tip) => (
          <div 
            key={tip.id} 
            className="group bg-[#1d2327] p-5 md:p-6 rounded-[2rem] border border-white/5 hover:border-green-500/30 transition-all duration-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          >
            <div className="flex gap-4 items-start">
              {/* Avatar Placeholder */}
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-white/5 flex items-center justify-center text-green-500 group-hover:bg-green-500 group-hover:text-black transition-colors duration-300">
                <User size={20} />
              </div>
              
              <div>
                <h4 className="text-base font-bold text-gray-200 group-hover:text-white transition-colors leading-snug">
                  {tip.title}
                </h4>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-[10px] font-black text-green-500 uppercase tracking-widest">
                    @{tip.authorName.replace(/\s+/g, '').toLowerCase()}
                  </span>
                  <div className="flex items-center gap-1 text-gray-500 text-[10px] font-bold uppercase">
                    <Clock size={12} />
                    {tip.createdAt}
                  </div>
                </div>
              </div>
            </div>

            {/* Upvotes Section */}
            <div className="flex items-center gap-3 bg-black/20 self-end md:self-auto px-4 py-2 rounded-2xl border border-white/5 group-hover:border-green-500/20 transition-all">
              <div className="flex flex-col items-center">
                <ArrowUpCircle 
                  size={24} 
                  className="text-green-500 cursor-pointer hover:scale-125 transition-transform active:scale-95" 
                />
              </div>
              <div className="h-8 w-[1px] bg-white/5 mx-1"></div>
              <span className="text-lg font-black text-white tabular-nums">
                {tip.upvotes}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Action Footer */}
      <div className="mt-10 text-center">
        <button className="px-8 py-3 bg-transparent border border-white/10 rounded-full text-gray-400 text-xs font-black uppercase tracking-widest hover:border-green-500 hover:text-green-500 transition-all">
          Browse All Community Hacks
        </button>
      </div>
    </section>
  );
};

export default RecentTips;