import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  Calendar, Users, Trophy, Target, 
  ArrowLeft, Share2, Info, Clock, ShieldCheck, Loader2 
} from "lucide-react";

const ChallengeDetails = () => {
  const { id } = useParams(); // URL থেকে আইডি ধরছে
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);

  // ডেমো ডাটাবেস (বাস্তবে এটি ডাটাবেস বা API থেকে আসবে)
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

  useEffect(() => {
    // এখানে আইডি অনুযায়ী ডাটা ফিল্টার করা হচ্ছে
    setLoading(true);
    const found = allChallenges.find((item) => item._id === id);
    
    // ১ সেকেন্ড দেরি করানো হয়েছে যাতে রিয়েলস্টিক ফিল আসে
    setTimeout(() => {
      setChallenge(found);
      setLoading(false);
    }, 1000);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#121619] flex items-center justify-center">
        <Loader2 className="animate-spin text-green-500" size={48} />
      </div>
    );
  }

  if (!challenge) {
    return (
      <div className="min-h-screen bg-[#121619] text-white flex flex-col items-center justify-center">
        <h2 className="text-2xl font-black uppercase italic mb-4">Challenge Not Found</h2>
        <Link to="/challenges" className="text-green-500 underline">Back to All Challenges</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121619] text-white pb-20">
      {/* Hero Image Section */}
      <div className="relative h-[450px] w-full">
        <img 
          src={challenge.imageUrl} 
          alt={challenge.title} 
          className="w-full h-full object-cover opacity-50 transition-opacity duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121619] via-[#121619]/40 to-transparent"></div>
        
        <div className="absolute top-8 left-6 md:left-12">
          <Link to="/challenges" className="flex items-center gap-2 text-white/70 hover:text-green-500 transition-colors font-bold uppercase text-[10px] tracking-widest bg-black/40 backdrop-blur-md px-6 py-2.5 rounded-full border border-white/10">
            <ArrowLeft size={16} /> Back to Challenges
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Side: Information */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-[#1d2327] border border-white/5 p-8 md:p-12 rounded-[3rem] shadow-2xl">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="bg-green-500 text-black px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                  {challenge.category}
                </span>
                <span className="bg-white/5 border border-white/10 text-gray-400 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                  <Clock size={12}/> {challenge.duration} Days
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-6 leading-none">
                {challenge.title}
              </h1>

              <p className="text-gray-400 text-lg leading-relaxed mb-10">
                {challenge.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4 p-5 bg-black/20 rounded-3xl border border-white/5">
                  <div className="bg-green-500/10 p-3 rounded-xl text-green-500"><Target size={24}/></div>
                  <div>
                    <h4 className="font-bold text-sm text-white uppercase tracking-wider">Primary Goal</h4>
                    <p className="text-xs text-gray-500 mt-1">{challenge.target}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-5 bg-black/20 rounded-3xl border border-white/5">
                  <div className="bg-green-500/10 p-3 rounded-xl text-green-500"><Trophy size={24}/></div>
                  <div>
                    <h4 className="font-bold text-sm text-white uppercase tracking-wider">Impact Metric</h4>
                    <p className="text-xs text-gray-500 mt-1">{challenge.impactMetric}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Instruction List */}
            <div className="bg-[#1d2327] border border-white/5 p-10 rounded-[3rem]">
              <h3 className="text-xl font-black uppercase italic mb-8 flex items-center gap-3">
                <Info className="text-green-500" /> Participation Guidelines
              </h3>
              <div className="space-y-6">
                {[
                  "Sign in to your EcoTrack account to track progress.",
                  "Commit to the challenge rules for the full duration.",
                  "Submit your impact metrics weekly in your dashboard.",
                  "Earn an Eco-Badge upon successful completion."
                ].map((step, index) => (
                  <div key={index} className="flex items-start gap-5 text-gray-400">
                    <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-white/5 text-green-500 flex items-center justify-center text-sm font-black border border-white/10">
                      {index + 1}
                    </div>
                    <p className="text-sm font-medium pt-1">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Sidebar Actions */}
          <div className="space-y-6">
            <div className="bg-green-500 p-[1px] rounded-[3rem]">
              <div className="bg-[#1d2327] p-10 rounded-[2.9rem] text-center">
                <div className="flex justify-center -space-x-4 mb-6">
                   {[1,2,3,4].map(i => (
                     <img key={i} className="w-12 h-12 rounded-full border-4 border-[#1d2327] object-cover" src={`https://i.pravatar.cc/100?img=${i+20}`} alt=""/>
                   ))}
                   <div className="w-12 h-12 rounded-full border-4 border-[#1d2327] bg-green-500 flex items-center justify-center text-[10px] font-black text-black">+{challenge.participants}</div>
                </div>
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-8">Active Participants</p>
                
                <Link to={'/challenges/add'} className="w-full bg-green-500 hover:bg-green-400 text-black py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl shadow-green-500/20 transition-all transform hover:-translate-y-1 active:scale-95 mb-6">
                  Join Challenge Now
                </Link>
                
                <button className="flex items-center justify-center gap-2 text-gray-500 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest mx-auto">
                  <Share2 size={14} /> Invite Friends
                </button>
              </div>
            </div>

            {/* Meta Data Box */}
            <div className="bg-[#1d2327] border border-white/5 p-8 rounded-[3rem] space-y-6">
              <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                <div className="p-3 bg-white/5 rounded-2xl text-green-500"><Calendar size={20}/></div>
                <div>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Timeline</p>
                  <p className="text-xs font-black text-white">{challenge.startDate} — {challenge.endDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/5 rounded-2xl text-green-500"><ShieldCheck size={20}/></div>
                <div>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Verified By</p>
                  <p className="text-xs font-black text-white truncate w-40">{challenge.createdBy}</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ChallengeDetails;