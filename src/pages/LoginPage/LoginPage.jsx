import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Mail, Lock, LogIn, Loader2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../../Auth/AuthContext/AuthContext";

const LoginPage = () => {
  const { signInWithGoogle, setUser, loginWithEmail } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Behavior: On success → navigate to the intended route or Home.
  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Firebase/Auth Logic
      const result = await loginWithEmail(email, password);
      setUser(result.user);

      toast.success("Login Successful!");

      // Navigate to intended route
      setTimeout(() => navigate(from, { replace: true }), 1000);
    } catch (err) {
      // Behavior: On error → show toast message
      toast.error(err.message || "Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const loadingToast = toast.loading("Connecting to Google...");
    try {
      const res = await signInWithGoogle();
      setUser(res.user);
      toast.success("Google Sign-In Successful!", { id: loadingToast });
      navigate(from, { replace: true });
    } catch (err) {
      toast.error("Google Login Failed", { id: loadingToast });
    }
  };

  const handleForgotPassword = () => {
    // navigate করার সময় ইমেইলটি 'state' হিসেবে পাঠিয়ে দিচ্ছি
    navigate("/forgot-password", { state: { email: email } });
  };

  return (
    <div className="min-h-screen bg-[#121619] flex items-center justify-center px-6 py-12">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="max-w-md w-full space-y-8 bg-[#1d2327] p-10 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden">
        {/* Decorative Glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-green-500/10 blur-3xl rounded-full"></div>

        <div className="text-center relative z-10">
          {/* Title: Login to EcoTrack */}
          <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">
            Login to <span className="text-green-500">EcoTrack</span>
          </h2>
          <p className="mt-2 text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em]">
            Welcome back, Eco Warrior!
          </p>
        </div>

        <form className="mt-8 space-y-6 relative z-10" onSubmit={handleLogin}>
          <div className="space-y-4">
            {/* Field: Email */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-500 group-focus-within:text-green-500 transition-colors">
                <Mail size={18} />
              </div>
              <input
                type="email"
                required
                className="block w-full pl-11 pr-4 py-4 bg-black/20 border border-white/5 rounded-2xl text-white placeholder-gray-600 focus:outline-none focus:border-green-500/50 transition-all font-medium"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Field: Password */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-500 group-focus-within:text-green-500 transition-colors">
                <Lock size={18} />
              </div>
              <input
                type="password"
                required
                className="block w-full pl-11 pr-4 py-4 bg-black/20 border border-white/5 rounded-2xl text-white placeholder-gray-600 focus:outline-none focus:border-green-500/50 transition-all font-medium"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Link: Forgot Password (route: /forgot-password) */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-[10px] font-bold text-green-500/80 uppercase tracking-widest hover:text-green-500 transition-colors"
            >
              Forgot Password?
            </button>
          </div>

          <div className="space-y-4">
            {/* Button: Login with Loading State */}
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-black uppercase tracking-[0.2em] rounded-2xl text-black bg-green-500 hover:bg-green-400 focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <span className="flex items-center gap-2">
                  Login <LogIn size={18} />
                </span>
              )}
            </button>

            {/* Button: Google Login */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex justify-center items-center gap-3 py-4 bg-white/5 border border-white/10 rounded-2xl text-white text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all"
            >
              <FcGoogle size={20} /> Continue with Google
            </button>
          </div>
        </form>

        {/* Link: Register Page */}
        <div className="text-center mt-8 relative z-10">
          <p className="text-[11px] text-gray-500 font-bold uppercase tracking-tight">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-green-500 hover:text-green-400 underline underline-offset-4"
            >
              Join the Movement
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
