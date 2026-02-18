import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Auth/AuthContext/AuthContext';
import { 
  PlusCircle, Image as ImageIcon, Layout, 
  Target, Calendar, AlignLeft, BarChart3, Loader2 
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const AddChallenge = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const newChallenge = {
      title: form.title.value,
      category: form.category.value,
      description: form.description.value,
      duration: parseInt(form.duration.value),
      target: form.target.value,
      participants: 0,
      impactMetric: form.impactMetric.value,
      createdBy: user?.email, // লগইন করা ইউজারের ইমেইল অটোমেটিক বসে যাবে
      startDate: form.startDate.value,
      endDate: form.endDate.value,
      imageUrl: form.imageUrl.value,
    };

    console.log("New Challenge Data:", newChallenge);

    // এখানে আপনার Firebase বা MongoDB তে ডাটা পাঠানোর লজিক হবে
    setTimeout(() => {
      toast.success("Challenge Created Successfully!");
      setLoading(false);
      form.reset();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#121619] py-16 px-6">
      <Toaster position="top-center" />
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex p-4 rounded-3xl bg-green-500/10 border border-green-500/20 mb-6 text-green-500">
            <PlusCircle size={40} />
          </div>
          <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter">
            Create New <span className="text-green-500">Challenge</span>
          </h2>
          <p className="text-gray-500 font-bold uppercase text-[10px] tracking-[0.3em] mt-2">
            Set a new goal for the Eco-Warriors
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#1d2327] p-8 md:p-12 rounded-[3rem] border border-white/5 shadow-2xl">
          
          {/* Title */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-black uppercase text-gray-500 tracking-widest ml-1 flex items-center gap-2">
              <Layout size={14}/> Challenge Title
            </label>
            <input 
              name="title" required type="text" placeholder="e.g., Plastic-Free July"
              className="w-full bg-black/20 border border-white/5 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-green-500/50 transition-all font-medium"
            />
          </div>

          {/* Category Dropdown */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-gray-500 tracking-widest ml-1 flex items-center gap-2">
              <PlusCircle size={14}/> Category
            </label>
            <select name="category" required className="w-full bg-black/20 border border-white/5 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-green-500/50 transition-all font-medium appearance-none">
              <option value="Waste Reduction">Waste Reduction</option>
              <option value="Energy Conservation">Energy Conservation</option>
              <option value="Water Conservation">Water Conservation</option>
              <option value="Sustainable Transport">Sustainable Transport</option>
              <option value="Green Living">Green Living</option>
            </select>
          </div>

          {/* Image URL */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-gray-500 tracking-widest ml-1 flex items-center gap-2">
              <ImageIcon size={14}/> Image URL
            </label>
            <input 
              name="imageUrl" required type="url" placeholder="https://image-link.jpg"
              className="w-full bg-black/20 border border-white/5 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-green-500/50 transition-all font-medium"
            />
          </div>

          {/* Description */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-black uppercase text-gray-500 tracking-widest ml-1 flex items-center gap-2">
              <AlignLeft size={14}/> Description
            </label>
            <textarea 
              name="description" required rows="3" placeholder="Explain the challenge..."
              className="w-full bg-black/20 border border-white/5 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-green-500/50 transition-all font-medium resize-none"
            ></textarea>
          </div>

          {/* Duration & Impact Metric */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-gray-500 tracking-widest ml-1 flex items-center gap-2">
              <Calendar size={14}/> Duration (Days)
            </label>
            <input 
              name="duration" required type="number" placeholder="30"
              className="w-full bg-black/20 border border-white/5 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-green-500/50 transition-all font-medium"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-gray-500 tracking-widest ml-1 flex items-center gap-2">
              <BarChart3 size={14}/> Impact Metric
            </label>
            <input 
              name="impactMetric" required type="text" placeholder="kg plastic saved"
              className="w-full bg-black/20 border border-white/5 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-green-500/50 transition-all font-medium"
            />
          </div>

          {/* Start & End Date */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-gray-500 tracking-widest ml-1">Start Date</label>
            <input name="startDate" required type="date" className="w-full bg-black/20 border border-white/5 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-green-500/50 transition-all font-medium inverted-scheme" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-gray-500 tracking-widest ml-1">End Date</label>
            <input name="endDate" required type="date" className="w-full bg-black/20 border border-white/5 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-green-500/50 transition-all font-medium" />
          </div>

          {/* Target Goal */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-black uppercase text-gray-500 tracking-widest ml-1 flex items-center gap-2">
              <Target size={14}/> Target Goal
            </label>
            <input 
              name="target" required type="text" placeholder="e.g., Reduce single-use plastic by 50%"
              className="w-full bg-black/20 border border-white/5 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-green-500/50 transition-all font-medium"
            />
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 pt-6">
            <button 
              disabled={loading}
              className="w-full bg-green-500 hover:bg-green-400 text-black py-5 rounded-[2rem] font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all shadow-2xl shadow-green-500/20 active:scale-95 disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" size={20}/> : "Create Challenge"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddChallenge;