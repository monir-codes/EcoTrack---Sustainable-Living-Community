import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import toast from "react-hot-toast";
import { Github, Mail, Lock, User, Image as ImageIcon } from "lucide-react";

const Register = () => {
    const { createUser, signInWithGoogle, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        const { email, password, name, photo } = data;

        createUser(email, password)
            .then(() => {
                updateUserProfile(name, photo)
                    .then(() => {
                        toast.success("অ্যাকাউন্ট তৈরি সফল হয়েছে!");
                        navigate("/");
                    });
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };

    const handleGoogleLogin = () => {
        signInWithGoogle()
            .then(() => {
                toast.success("গুগল লগইন সফল!");
                navigate("/");
            })
            .catch(err => toast.error(err.message));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4">
            <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl shadow-green-100 p-10 border border-gray-100">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-black text-slate-900 font-heading italic">Join EcoTrack</h2>
                    <p className="text-gray-400 text-sm mt-2">সবুজ পৃথিবীর পথে আপনার যাত্রা শুরু হোক।</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* Name Field */}
                    <div className="relative">
                        <User className="absolute left-4 top-3.5 text-gray-400" size={18} />
                        <input {...register("name", { required: "নাম দিতে হবে" })} placeholder="Full Name" className="input input-bordered w-full pl-12 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-green-500 transition-all" />
                        {errors.name && <span className="text-red-500 text-xs mt-1 ml-2">{errors.name.message}</span>}
                    </div>

                    {/* Photo URL Field */}
                    <div className="relative">
                        <ImageIcon className="absolute left-4 top-3.5 text-gray-400" size={18} />
                        <input {...register("photo", { required: "ছবির লিঙ্ক দিন" })} placeholder="Photo URL" className="input input-bordered w-full pl-12 bg-gray-50 border-none rounded-2xl" />
                    </div>

                    {/* Email Field */}
                    <div className="relative">
                        <Mail className="absolute left-4 top-3.5 text-gray-400" size={18} />
                        <input {...register("email", { required: "ইমেইল প্রয়োজন" })} type="email" placeholder="Email Address" className="input input-bordered w-full pl-12 bg-gray-50 border-none rounded-2xl" />
                    </div>

                    {/* Password Field with Validation */}
                    <div className="relative">
                        <Lock className="absolute left-4 top-3.5 text-gray-400" size={18} />
                        <input 
                            {...register("password", { 
                                required: "পাসওয়ার্ড প্রয়োজন",
                                minLength: { value: 6, message: "কমপক্ষে ৬ অক্ষরের হতে হবে" },
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z]).+$/,
                                    message: "একটি বড় হাতের ও একটি ছোট হাতের অক্ষর লাগবে"
                                }
                            })} 
                            type="password" placeholder="Password" className="input input-bordered w-full pl-12 bg-gray-50 border-none rounded-2xl" 
                        />
                        {errors.password && <span className="text-red-500 text-xs mt-1 ml-2">{errors.password.message}</span>}
                    </div>

                    <button className="btn btn-primary w-full bg-green-600 border-none text-white rounded-2xl h-14 hover:bg-green-700 shadow-lg shadow-green-100 font-bold">Register Now</button>
                </form>

                <div className="divider text-gray-300 my-8">বা লগইন করুন</div>

                <button onClick={handleGoogleLogin} className="btn btn-outline w-full rounded-2xl h-14 border-gray-200 hover:bg-slate-50 hover:text-slate-900 font-bold flex gap-3 italic">
                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/action/google.svg" className="w-5" alt="" />
                    Login with Google
                </button>

                <p className="text-center mt-8 text-sm text-gray-500 italic">
                    ইতোমধ্যেই অ্যাকাউন্ট আছে? <Link to="/login" className="text-green-600 font-bold underline">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;