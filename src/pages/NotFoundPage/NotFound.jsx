import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, ArrowLeft, Ghost } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#121619] flex flex-col items-center justify-center px-6 text-center">
      {/* Animated Icon Section */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-green-500/20 blur-3xl rounded-full"></div>
        <div className="relative bg-[#1d2327] border border-white/5 p-10 rounded-[3rem] shadow-2xl">
           <Ghost size={80} className="text-green-500 animate-bounce" />
        </div>
      </div>

      {/* Text Content */}
      <h1 className="text-8xl md:text-[12rem] font-black text-white/5 leading-none absolute select-none">
        404
      </h1>
      
      <div className="relative z-10 space-y-4">
        <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter">
          Lost in the <span className="text-green-500">Eco-System?</span>
        </h2>
        <p className="text-gray-500 font-bold uppercase text-xs tracking-[0.3em] max-w-md mx-auto leading-loose">
          The page you are looking for has been recycled or moved to a sustainable location.
        </p>
      </div>

      {/* Action Button */}
      <Link 
        to="/" 
        className="mt-12 flex items-center gap-2 bg-green-500 hover:bg-green-400 text-black px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-2xl shadow-green-500/20 active:scale-95"
      >
        <ArrowLeft size={18} /> Back to Civilization
      </Link>
      
      {/* Branding */}
      <div className="mt-20 flex items-center gap-2 opacity-20">
        <Leaf size={20} className="text-green-500" />
        <span className="font-bold text-white uppercase tracking-tighter">EcoTrack</span>
      </div>
    </div>
  );
};

export default NotFound;