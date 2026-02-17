import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, LogIn, Loader2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // এটি একটি ডেমো লগইন প্রসেস। আপনার ব্যাকএন্ড API এখানে কানেক্ট করবেন।
      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (email === "user@example.com" && password === "password123") {
        toast.success("Successfully logged in!");
        setTimeout(() => navigate("/"), 1000);
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    toast.loading("Redirecting to Google...", { duration: 2000 });
    // Google Auth Logic Here
  };

  return (
    <div className="min-h-screen bg-[#121619] flex items-center justify-center px-6 py-12">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="max-w-md w-full space-y-8 bg-[#1d2327] p-10 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden">
        {/* Decorative Background Blur */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-green-500/10 blur-3xl rounded-full"></div>

        <div className="text-center relative z-10">
          <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">
            Login to <span className="text-green-500">EcoTrack</span>
          </h2>
          <p className="mt-2 text-sm text-gray-500 font-bold uppercase tracking-widest">
            Welcome back, Eco Warrior!
          </p>
        </div>

        <form className="mt-8 space-y-6 relative z-10" onSubmit={handleLogin}>
          <div className="space-y-4">
            {/* Email Field */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-green-500 transition-colors">
                <Mail size={18} />
              </div>
              <input
                type="email"
                required
                className="block w-full pl-11 pr-4 py-4 bg-black/20 border border-white/5 rounded-2xl text-white placeholder-gray-600 focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/50 transition-all sm:text-sm font-medium"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password Field */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-green-500 transition-colors">
                <Lock size={18} />
              </div>
              <input
                type="password"
                required
                className="block w-full pl-11 pr-4 py-4 bg-black/20 border border-white/5 rounded-2xl text-white placeholder-gray-600 focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/50 transition-all sm:text-sm font-medium"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-end">
            <Link
              to="/forgot-password"
              className="text-xs font-black text-green-500 uppercase tracking-widest hover:text-green-400 transition-colors"
            >
              Forgot Password?
            </Link>
          </div>

          <div className="space-y-4">
            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-black uppercase tracking-[0.2em] rounded-2xl text-black bg-green-500 hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <span className="flex items-center gap-2">
                  Login <LogIn size={18} />
                </span>
              )}
            </button>

            {/* Google Login Button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex justify-center items-center gap-3 py-4 px-4 bg-white/5 border border-white/10 rounded-2xl text-white text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all"
            >
             <FcGoogle size={20}/>
              Continue with Google
            </button>
          </div>
        </form>

        <div className="text-center mt-8 relative z-10">
          <p className="text-sm text-gray-500 font-bold uppercase tracking-tighter">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-green-500 hover:text-green-400 underline underline-offset-4"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
