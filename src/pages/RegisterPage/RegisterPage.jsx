import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Image as ImageIcon, Loader2, UserPlus, CheckCircle2, XCircle } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from '../../Auth/AuthContext/AuthContext';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    photoURL: '',
    password: ''
  });

  // নিশ্চিত করুন আপনার AuthContext এ updateUserProfile বা এই ধরণের ফাংশন আছে
  const { signInWithGoogle, setUser, createUser, updateUserProfile } = useContext(AuthContext); 
  const [isLoading, setIsLoading] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState([]);
  
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // পাসওয়ার্ড ভ্যালিডেশন
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
    
    if (passwordErrors.length > 0) {
      toast.error("Please fix password requirements!");
      return;
    }

    setIsLoading(true);
    try {
      // ১. ইউজার ক্রিয়েট করা
      const result = await createUser(formData.email, formData.password);
      
      // ২. ইউজারের নাম এবং ফটো প্রোফাইলে সেট করা (যদি আপনার context এ থাকে)
      if (updateUserProfile) {
        await updateUserProfile(formData.name, formData.photoURL);
      }

      toast.success('Account created! Welcome Eco-Warrior.');
      navigate(from, { replace: true });
      
    } catch (err) {
      console.error(err);
      toast.error(err.message || 'Registration failed!');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    const loadingToast = toast.loading("Connecting to Google...");
    try {
      const result = await signInWithGoogle();
      setUser(result.user);
      toast.success('Google Registration Success!', { id: loadingToast });
      navigate(from, { replace: true });
    } catch (err) {
      toast.error('Google Sign-In failed', { id: loadingToast });
    }
  };

  return (
    <div className="min-h-screen bg-[#121619] flex items-center justify-center px-6 py-12">
      <Toaster position="top-center" />
      
      <div className="max-w-xl w-full space-y-8 bg-[#1d2327] p-8 md:p-12 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden">
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-green-500/5 blur-3xl rounded-full"></div>

        <div className="text-center">
          <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter leading-none">
            Join <span className="text-green-500">EcoTrack</span>
          </h2>
          <p className="mt-3 text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em]">
            Step into a sustainable future
          </p>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleRegister}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative group">
              <User className="absolute left-4 top-5 text-gray-500 group-focus-within:text-green-500 transition-colors" size={18} />
              <input
                type="text"
                required
                className="w-full pl-11 pr-4 py-4 bg-black/20 border border-white/5 rounded-2xl text-white focus:border-green-500/50 outline-none transition-all font-medium"
                placeholder="Full Name"
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div className="relative group">
              <Mail className="absolute left-4 top-5 text-gray-500 group-focus-within:text-green-500 transition-colors" size={18} />
              <input
                type="email"
                required
                className="w-full pl-11 pr-4 py-4 bg-black/20 border border-white/5 rounded-2xl text-white focus:border-green-500/50 outline-none transition-all font-medium"
                placeholder="Email Address"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          <div className="relative group">
            <ImageIcon className="absolute left-4 top-5 text-gray-500 group-focus-within:text-green-500 transition-colors" size={18} />
            <input
              type="url"
              className="w-full pl-11 pr-4 py-4 bg-black/20 border border-white/5 rounded-2xl text-white focus:border-green-500/50 outline-none transition-all font-medium"
              placeholder="Photo URL (Optional)"
              onChange={(e) => setFormData({...formData, photoURL: e.target.value})}
            />
          </div>

          <div className="relative group">
            <Lock className="absolute left-4 top-5 text-gray-500 group-focus-within:text-green-500 transition-colors" size={18} />
            <input
              type="password"
              required
              className={`w-full pl-11 pr-4 py-4 bg-black/20 border rounded-2xl text-white outline-none transition-all font-medium ${
                formData.password && passwordErrors.length > 0 ? 'border-red-500/30' : 'border-white/5 focus:border-green-500/50'
              }`}
              placeholder="Create Password"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          {/* Validation Indicator Layout */}
          {formData.password && (
            <div className="bg-black/40 p-5 rounded-3xl border border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-3">
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
              className="w-full flex justify-center py-4 bg-green-500 hover:bg-green-400 disabled:opacity-50 text-black font-black uppercase tracking-[0.2em] rounded-2xl transition-all shadow-xl shadow-green-500/10"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : <span className="flex items-center gap-2">Register Now <UserPlus size={18}/></span>}
            </button>

            <button
              onClick={handleGoogleSignIn}
              type="button"
              className="w-full flex justify-center items-center gap-3 py-4 bg-white/5 border border-white/10 rounded-2xl text-white text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all"
            >
              <FcGoogle size={20} /> Continue with Google
            </button>
          </div>
        </form>

        <p className="text-center text-[11px] text-gray-500 font-bold uppercase tracking-tight">
          Have an account?{' '}
          <Link to="/login" className="text-green-500 hover:text-green-400 underline underline-offset-4">
            Sign In Here
          </Link>
        </p>
      </div>
    </div>
  );
};

const ValidationItem = ({ label, isValid }) => (
  <div className="flex items-center gap-2">
    <div className={`p-0.5 rounded-full ${isValid ? 'bg-green-500/20' : 'bg-gray-500/10'}`}>
      {isValid ? <CheckCircle2 size={12} className="text-green-500" /> : <XCircle size={12} className="text-gray-600" />}
    </div>
    <span className={`text-[9px] font-black uppercase tracking-tighter ${isValid ? 'text-green-500' : 'text-gray-500'}`}>
      {label}
    </span>
  </div>
);

export default RegisterPage;