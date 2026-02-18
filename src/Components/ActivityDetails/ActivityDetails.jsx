import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, TrendingUp, Award, CheckCircle, 
  Flame, Calendar, BarChart3, Info 
} from 'lucide-react';

const ActivityDetails = () => {
  const { id } = useParams();
  const [progress, setProgress] = useState(85); // ডেমো প্রগ্রেস পার্সেন্টেজ

  // ডেমো ডাটা (এটি ইউজারের পার্সোনাল ডাটাবেস থেকে আসবে)
  const activityData = {
    title: "Plastic-Free July",
    joinedDate: "Oct 10, 2026",
    daysCompleted: 24,
    totalDays: 30,
    currentStreak: 12,
    impactGenerated: "12.5 kg saved",
    status: "Active",
    dailyLogs: [
      { date: "Oct 24", status: "Completed", notes: "No plastic bottles used today." },
      { date: "Oct 23", status: "Completed", notes: "Used jute bag for grocery." },
      { date: "Oct 22", status: "Missed", notes: "Forgot to bring reusable straw." },
    ]
  };

  return (
    <div className="min-h-screen bg-[#121619] text-white py-12 px-6">
      <div className="max-w-5xl mx-auto">
        
        {/* Top Navigation */}
        <Link to="/my-activities" className="inline-flex items-center gap-2 text-gray-500 hover:text-green-500 font-bold uppercase text-[10px] tracking-widest mb-8 transition-colors">
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>

        {/* Header Stats Card */}
        <div className="bg-[#1d2327] border border-white/5 rounded-[3rem] p-8 md:p-12 shadow-2xl mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-2">
              <span className="bg-green-500/10 text-green-500 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-green-500/20">
                {activityData.status}
              </span>
              <h1 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter leading-none">
                {activityData.title}
              </h1>
              <p className="text-gray-500 font-bold text-xs uppercase tracking-widest">Joined on {activityData.joinedDate}</p>
            </div>

            {/* Circular Progress (Simple CSS version) */}
            <div className="relative w-32 h-32 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
                <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={364.4} strokeDashoffset={364.4 - (364.4 * progress) / 100} className="text-green-500 transition-all duration-1000" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-black">{progress}%</span>
                <span className="text-[8px] text-gray-500 uppercase font-black">Overall</span>
              </div>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12 pt-12 border-t border-white/5">
            <StatCard icon={<Flame className="text-orange-500" />} label="Streak" value={`${activityData.currentStreak} Days`} />
            <StatCard icon={<CheckCircle className="text-green-500" />} label="Completed" value={`${activityData.daysCompleted} / ${activityData.totalDays}`} />
            <StatCard icon={<TrendingUp className="text-blue-500" />} label="Impact" value={activityData.impactMetric || activityData.impactGenerated} />
            <StatCard icon={<Award className="text-yellow-500" />} label="Rank" value="Eco Hero" />
          </div>
        </div>

        {/* Detailed Timeline & Logs */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Daily Logs Table */}
          <div className="lg:col-span-2 bg-[#1d2327] border border-white/5 rounded-[2.5rem] p-8">
            <h3 className="text-xl font-black uppercase italic mb-8 flex items-center gap-3">
              <Calendar className="text-green-500" /> Recent Activity Logs
            </h3>
            <div className="space-y-4">
              {activityData.dailyLogs.map((log, index) => (
                <div key={index} className="bg-black/20 p-5 rounded-2xl border border-white/5 flex items-center justify-between group hover:border-green-500/30 transition-all">
                  <div className="flex items-center gap-4">
                    <div className={`w-2 h-2 rounded-full ${log.status === 'Completed' ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-red-500'}`}></div>
                    <div>
                      <p className="font-bold text-sm text-white">{log.date}</p>
                      <p className="text-xs text-gray-500 font-medium">{log.notes}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg ${log.status === 'Completed' ? 'text-green-500 bg-green-500/10' : 'text-red-500 bg-red-500/10'}`}>
                    {log.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Side Performance Card */}
          <div className="space-y-6">
            <div className="bg-green-500 p-8 rounded-[2.5rem] text-black">
              <h4 className="text-sm font-black uppercase tracking-widest mb-4">Pro Tip</h4>
              <p className="text-xs font-bold leading-relaxed mb-6">
                "Small changes lead to big results. Carry a reusable water bottle today to reduce plastic waste by another 0.5kg!"
              </p>
              <button className="w-full bg-black text-white py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-white hover:text-black transition-all">
                Update Today's Progress
              </button>
            </div>

            <div className="bg-[#1d2327] border border-white/5 p-8 rounded-[2.5rem]">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-6">Badges Earned</h4>
              <div className="flex flex-wrap gap-4">
                 <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group hover:border-green-500 transition-all cursor-help" title="Early Bird Badge">
                   <Award size={20} className="text-green-500" />
                 </div>
                 <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center opacity-30 grayscale cursor-not-allowed">
                   <BarChart3 size={20} />
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Stat Card Component
const StatCard = ({ icon, label, value }) => (
  <div className="flex flex-col gap-2">
    <div className="flex items-center gap-2">
      {icon}
      <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest">{label}</span>
    </div>
    <p className="text-lg font-black">{value}</p>
  </div>
);

export default ActivityDetails;