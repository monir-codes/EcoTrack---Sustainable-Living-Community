import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Mail, Lock, LogIn, Loader2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../../Auth/AuthContext/AuthContext";

const LoginPage = () => {
  const { signInWithGoogle, setUser, loginWithEmail } = useContext(AuthContext); // loginWithEmail অ্যাড করা হয়েছে (যদি থাকে)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  // ইউজার যে পেজ থেকে এসেছে সেই পেজের পাথ, না থাকলে হোম পেজ
  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // আপনার অরিজিনাল লগইন লজিক এখানে হবে (Firebase/Custom Auth)
      // ডেমো চেক:
      if (email === "user@example.com" && password === "password123") {
        toast.success("Welcome Back!");
        // ১ সেকেন্ড পর আগের পেজে বা হোমে রিডাইরেক্ট
        setTimeout(() => navigate(from, { replace: true }), 1000);
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (err) {
      toast.error(err.message || "Failed to login");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    const loadingToast = toast.loading("Connecting to Google...");
    
    signInWithGoogle()
      .then((res) => {
        setUser(res.user); // Firebase হলে সাধারণত res.user থাকে
        toast.success("Google Sign-In Successful!", { id: loadingToast });
        
        // স্মার্ট রিডাইরেক্ট: আগের লোকেশনে পাঠিয়ে দেওয়া
        navigate(from, { replace: true });
      })
      .catch((err) => {
        toast.error("Google Login Failed", { id: loadingToast });
        console.error(err);
      });
  };

  return (
    <div className="min-h-screen bg-[#121619] flex items-center justify-center px-6 py-12">
      <Toaster position="top-center" reverseOrder={false} />

      {/* --- Login Card --- */}
      <div className="max-w-md w-full space-y-8 bg-[#1d2327] p-10 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden">
        {/* Glow Effect */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-green-500/10 blur-3xl rounded-full"></div>

        <div className="text-center relative z-10">
          <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">
            Login to <span className="text-green-500">EcoTrack</span>
          </h2>
          <p className="mt-2 text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em]">
            Auth State: Redirecting to {from === "/" ? "Home" : from}
          </p>
        </div>

        <form className="mt-8 space-y-6 relative z-10" onSubmit={handleLogin}>
          <div className="space-y-4">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-500 group-focus-within:text-green-500">
                <Mail size={18} />
              </div>
              <input
                type="email"
                required
                className="block w-full pl-11 pr-4 py-4 bg-black/20 border border-white/5 rounded-2xl text-white focus:border-green-500/50 transition-all font-medium"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-500 group-focus-within:text-green-500">
                <Lock size={18} />
              </div>
              <input
                type="password"
                required
                className="block w-full pl-11 pr-4 py-4 bg-black/20 border border-white/5 rounded-2xl text-white focus:border-green-500/50 transition-all font-medium"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-4 bg-green-500 text-black text-sm font-black uppercase tracking-widest rounded-2xl hover:bg-green-400 disabled:opacity-50 transition-all"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : "Login Now"}
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/5"></span></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-[#1d2327] px-2 text-gray-500 font-bold">Or</span></div>
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex justify-center items-center gap-3 py-4 bg-white/5 border border-white/10 rounded-2xl text-white text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all"
          >
            <FcGoogle size={20} /> Continue with Google
          </button>
        </form>

        <p className="text-center text-xs text-gray-500 font-bold uppercase mt-6">
          New here? <Link to="/register" className="text-green-500 underline">Join the Movement</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;