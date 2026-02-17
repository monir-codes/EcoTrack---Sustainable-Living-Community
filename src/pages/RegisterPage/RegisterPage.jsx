import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Image as ImageIcon, Loader2, UserPlus, CheckCircle2, XCircle } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { FcGoogle } from "react-icons/fc";


const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    photoURL: '',
    password: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState([]);
  const navigate = useNavigate();

  
  const validatePassword = (pass) => {
    const errors = [];
    if (pass.length < 6) errors.push("Minimum 6 characters");
    if (!/[A-Z]/.test(pass)) errors.push("At least 1 uppercase letter");
    if (!/[a-z]/.test(pass)) errors.push("At least 1 lowercase letter");
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(pass)) errors.push("At least 1 special character");
    return errors;
  };

  useEffect(() => {
    setPasswordErrors(validatePassword(formData.password));
  }, [formData.password]);

  const handleRegister = async (e) => {
    e.preventDefault();
    
    // ফাইনাল ভ্যালিডেশন চেক
    if (passwordErrors.length > 0) {
      toast.error("Please fix password errors before submitting");
      return;
    }

    setIsLoading(true);
    try {
      // এখানে আপনার Firebase বা Backend API কল হবে
      await new Promise((resolve) => setTimeout(resolve, 2000)); 
      
      toast.success('Registration successful! Welcome to EcoTrack.');
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      toast.error(err.message || 'Registration failed!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#121619] flex items-center justify-center px-6 py-12">
      <Toaster position="top-center" />
      
      <div className="max-w-xl w-full space-y-8 bg-[#1d2327] p-8 md:p-12 rounded-[2.5rem] border border-white/5 shadow-2xl">
        <div className="text-center">
          <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter">
            Join <span className="text-green-500">EcoTrack</span>
          </h2>
          <p className="mt-2 text-xs text-gray-500 font-bold uppercase tracking-[0.3em]">
            Start your green journey today
          </p>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleRegister}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name Field */}
            <div className="relative group">
              <User className="absolute left-4 top-5 text-gray-500 group-focus-within:text-green-500 transition-colors" size={18} />
              <input
                name='name'
                type="text"
                required
                className="w-full pl-11 pr-4 py-4 bg-black/20 border border-white/5 rounded-2xl text-white focus:border-green-500/50 focus:outline-none transition-all"
                placeholder="Full Name"
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            {/* Email Field */}
            <div className="relative group">
              <Mail className="absolute left-4 top-5.5 text-gray-500 group-focus-within:text-green-500 transition-colors" size={18} />
              <input
                name='email'
                type="email"
                required
                className="w-full pl-11 pr-4 py-4 bg-black/20 border border-white/5 rounded-2xl text-white focus:border-green-500/50 focus:outline-none transition-all"
                placeholder="Email Address"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          {/* Photo URL Field */}
          <div className="relative group">
            <ImageIcon className="absolute left-4 top-5 text-gray-500 group-focus-within:text-green-500 transition-colors" size={18} />
            <input
             name='photo'
              type="url"
              className="w-full pl-11 pr-4 py-4 bg-black/20 border border-white/5 rounded-2xl text-white focus:border-green-500/50 focus:outline-none transition-all"
              placeholder="Photo URL (Optional)"
              onChange={(e) => setFormData({...formData, photoURL: e.target.value})}
            />
          </div>

          {/* Password Field */}
          <div className="relative group">
            <Lock className="absolute left-4 top-5 text-gray-500 group-focus-within:text-green-500 transition-colors" size={18} />
            <input
            name='password'
              type="password"
              required
              className={`w-full pl-11 pr-4 py-4 bg-black/20 border rounded-2xl text-white focus:outline-none transition-all ${
                formData.password && passwordErrors.length > 0 ? 'border-red-500/50' : 'border-white/5 focus:border-green-500/50'
              }`}
              placeholder="Create Password"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          {/* Inline Password Validation Display */}
          {formData.password && (
            <div className="bg-black/30 p-4 rounded-2xl border border-white/5 grid grid-cols-1 md:grid-cols-2 gap-2 transition-all">
              <ValidationItem label="6+ Characters" isValid={formData.password.length >= 6} />
              <ValidationItem label="1 Uppercase" isValid={/[A-Z]/.test(formData.password)} />
              <ValidationItem label="1 Lowercase" isValid={/[a-z]/.test(formData.password)} />
              <ValidationItem label="1 Special Character" isValid={/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)} />
            </div>
          )}

          <div className="space-y-4 pt-4">
            <button
              type="submit"
              disabled={isLoading || (formData.password && passwordErrors.length > 0)}
              className="w-full flex justify-center py-4 bg-green-500 hover:bg-green-400 disabled:opacity-50 disabled:cursor-not-allowed text-black font-black uppercase tracking-widest rounded-2xl transition-all shadow-lg shadow-green-500/20"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : <span className="flex items-center gap-2">Register <UserPlus size={18}/></span>}
            </button>

            <div className="flex items-center gap-4 py-2">
              <div className="h-[1px] flex-grow bg-white/5"></div>
              <span className="text-gray-600 text-[10px] font-bold uppercase">Or use social</span>
              <div className="h-[1px] flex-grow bg-white/5"></div>
            </div>

            <button
              type="button"
              className="w-full flex justify-center items-center gap-3 py-4 bg-white/5 border border-white/10 rounded-2xl text-white text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all"
            >
             <FcGoogle size={20} />
              Register with Google
            </button>
          </div>
        </form>

        <p className="text-center text-sm text-gray-500 font-bold uppercase tracking-tight">
          Already have an account?{' '}
          <Link to="/login" className="text-green-500 hover:text-green-400 underline underline-offset-4">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

// হেল্পার কম্পোনেন্ট পাসওয়ার্ড চেকলিস্টের জন্য
const ValidationItem = ({ label, isValid }) => (
  <div className="flex items-center gap-2">
    {isValid ? (
      <CheckCircle2 size={14} className="text-green-500" />
    ) : (
      <XCircle size={14} className="text-gray-600" />
    )}
    <span className={`text-[10px] font-bold uppercase tracking-tighter ${isValid ? 'text-green-500' : 'text-gray-500'}`}>
      {label}
    </span>
  </div>
);

export default RegisterPage;