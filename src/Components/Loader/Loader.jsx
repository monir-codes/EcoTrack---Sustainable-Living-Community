import React from 'react';
import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';

const Loader = () => {
  return (
    <div className="fixed inset-0 z-[999] bg-[#05070a] flex flex-col items-center justify-center overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute w-[40vw] h-[40vw] bg-green-500/10 blur-[120px] rounded-full animate-pulse" />

      {/* Main Spinner Container */}
      <div className="relative flex items-center justify-center w-32 h-32 md:w-40 md:h-40">
        
        {/* Outer Rotating Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border-t-2 border-b-2 border-green-500/30 border-l-2 border-l-green-500 rounded-full shadow-[0_0_15px_rgba(34,197,94,0.1)]"
        />

        {/* Center Icon with Pulse Effect */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0.5 }}
          animate={{ scale: [0.8, 1.1, 0.8], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-center justify-center z-10"
        >
          <div className="bg-green-500/10 p-4 rounded-full backdrop-blur-sm border border-green-500/20 shadow-[0_0_20px_rgba(34,197,94,0.2)]">
            <Leaf size={32} className="text-green-500" strokeWidth={2.5} />
          </div>
        </motion.div>
      </div>

      {/* Loading Text - Spinner এর নিচে দেখাবে */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-12 flex flex-col items-center"
      >
        <span className="text-[10px] font-black uppercase tracking-[0.6em] text-green-500 animate-pulse">
          Eco System Loading
        </span>
        <div className="mt-3 h-[2px] w-32 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="h-full w-full bg-gradient-to-r from-transparent via-green-500 to-transparent"
          />
        </div>
      </motion.div>

      {/* Bottom Status Badge */}
      <div className="absolute bottom-10 flex items-center gap-3 opacity-40">
        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
        <span className="text-[9px] font-black text-white uppercase tracking-[0.2em] italic">
          Synchronizing Data
        </span>
      </div>
    </div>
  );
};

export default Loader;