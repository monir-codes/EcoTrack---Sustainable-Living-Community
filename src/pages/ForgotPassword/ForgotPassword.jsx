import React, { useState, useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mail, ArrowLeft, Loader2, Send } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from '../../Auth/AuthContext/AuthContext';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { resetPassword } = useContext(AuthContext);
  const location = useLocation();


  useEffect(()=>{
    if(location?.state?.email){
      setEmail(location.state.email)
    }
  },[location.state])

  const handleReset = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await resetPassword(email);
      toast.success("Password reset email sent! Check your inbox.");
      // ইমেইল পাঠানোর পর ইউজারকে জিমেইলে পাঠানোর জন্য একটি বাটন বা ইনস্ট্রাকশন দেওয়া যেতে পারে
    } catch (err) {
      toast.error(err.message || "Failed to send reset email");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#121619] flex items-center justify-center px-6 py-12">
      <Toaster position="top-center" />
      
      <div className="max-w-md w-full space-y-8 bg-[#1d2327] p-10 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden">
        {/* Decorative Background Blur */}
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-green-500/10 blur-3xl rounded-full"></div>

        <div className="text-center relative z-10">
          <div className="bg-green-500/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-green-500/20">
            <Mail className="text-green-500" size={32} />
          </div>
          <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">
            Reset <span className="text-green-500">Password</span>
          </h2>
          <p className="mt-2 text-sm text-gray-500 font-bold uppercase tracking-widest leading-relaxed">
            Enter your email to receive a <br /> reset link
          </p>
        </div>

        <form className="mt-8 space-y-6 relative z-10" onSubmit={handleReset}>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-green-500 transition-colors">
              <Mail size={18} />
            </div>
            <input
              type="email"
              required
              className="block w-full pl-11 pr-4 py-4 bg-black/20 border border-white/5 rounded-2xl text-white placeholder-gray-600 focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/50 transition-all font-medium"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-black uppercase tracking-[0.2em] rounded-2xl text-black bg-green-500 hover:bg-green-400 focus:outline-none transition-all disabled:opacity-70"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <span className="flex items-center gap-2">
                Send Reset Link <Send size={18} />
              </span>
            )}
          </button>
        </form>

        <div className="text-center mt-8 relative z-10 border-t border-white/5 pt-6">
          <Link 
            to="/login" 
            className="inline-flex items-center gap-2 text-xs font-black text-gray-500 uppercase tracking-widest hover:text-green-500 transition-colors"
          >
            <ArrowLeft size={14} /> Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;