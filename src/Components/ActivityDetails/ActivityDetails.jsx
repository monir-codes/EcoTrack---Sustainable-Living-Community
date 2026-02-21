import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import {
  ArrowLeft,
  TrendingUp,
  Award,
  CheckCircle,
  Flame,
  Calendar,
  BarChart3,
} from "lucide-react";
import Loader from "../Loader/Loader";

const ActivityDetails = () => {
  const { id } = useParams();
  const [currentActivity, setCurrentActivity] = useState(null);

  // ডাটা স্ট্রাকচার ঠিক করা হয়েছে (প্রয়োজনীয় ফিল্ডসহ)
  const allActivitiesData = [
    {
      id: 1,
      title: "Coastal Cleanup Drive",
      joinedDate: "Oct 10, 2026",
      location: "Patenga Beach",
      status: "Completed",
      progressValue: 100,
      currentStreak: 14,
      daysCompleted: 30,
      totalDays: 30,
      dailyLogs: [
        {
          date: "Oct 24",
          notes: "Collected 5kg plastic bottles",
          status: "Completed",
        },
        { date: "Oct 23", notes: "Cleaned zone B-12", status: "Completed" },
      ],
    },
    {
      id: 2,
      title: "Urban Tree Plantation",
      joinedDate: "Nov 01, 2026",
      location: "Ramna Park",
      status: "Upcoming",
      progressValue: 0,
      currentStreak: 0,
      daysCompleted: 0,
      totalDays: 10,
      dailyLogs: [],
    },
    {
      id: 3,
      title: "Solar Power Workshop",
      joinedDate: "Nov 10, 2026",
      location: "Community Center",
      status: "Ongoing",
      progressValue: 65,
      currentStreak: 5,
      daysCompleted: 8,
      totalDays: 12,
      dailyLogs: [
        {
          date: "Nov 14",
          notes: "Installed panel group A",
          status: "Completed",
        },
      ],
    },
  ];

  useEffect(() => {
    // ID টি স্ট্রিং থেকে নাম্বারে কনভার্ট করে ম্যাচ করা
    const foundActivity = allActivitiesData.find(
      (item) => item.id === Number(id),
    );
    if (foundActivity) {
      setCurrentActivity(foundActivity);
    }
  }, [id]);

  if (!currentActivity) return <Loader />;

  return (
    <div className="min-h-screen bg-[#121619] text-white py-8 md:py-12 px-4 md:px-6 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto"
      >
        {/* Top Navigation */}
        <Link
          to="/my-activities"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-green-500 font-bold uppercase text-[10px] tracking-widest mb-6 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>

        {/* Header Stats Card */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-[#1d2327] border border-white/5 rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 shadow-2xl mb-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="space-y-3 w-full md:w-2/3">
              <span className="bg-green-500/10 text-green-500 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-green-500/20 inline-block">
                {currentActivity.status}
              </span>
              <h1 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter leading-tight">
                {currentActivity.title}
              </h1>
              <p className="text-gray-500 font-bold text-[10px] md:text-xs uppercase tracking-widest">
                Joined on {currentActivity.joinedDate}
              </p>
            </div>

            {/* Circular Progress */}
            <div className="relative w-28 h-28 md:w-36 md:h-36 flex items-center justify-center self-center md:self-auto">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="50%"
                  cy="50%"
                  r="42%"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-white/5"
                />
                <motion.circle
                  cx="50%"
                  cy="50%"
                  r="42%"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray="100"
                  initial={{ strokeDashoffset: 100 }}
                  animate={{
                    strokeDashoffset: 100 - currentActivity.progressValue,
                  }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  strokePath="100"
                  pathLength="100"
                  className="text-green-500"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl md:text-2xl font-black italic">
                  <CountUp end={currentActivity.progressValue} duration={2.5} />%
                </span>
                <span className="text-[8px] text-gray-500 uppercase font-black">
                  Overall
                </span>
              </div>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-10 pt-10 border-t border-white/5">
            <StatCard
              icon={<Flame className="text-orange-500" size={18} />}
              label="Streak"
              value={currentActivity.currentStreak}
              suffix=" Days"
            />
            <StatCard
              icon={<CheckCircle className="text-green-500" size={18} />}
              label="Completed"
              value={currentActivity.daysCompleted}
              suffix={`/${currentActivity.totalDays}`}
            />
            <StatCard
              icon={<TrendingUp className="text-blue-500" size={18} />}
              label="Impact"
              value={50}
              suffix=" Points"
            />
            <StatCard
              icon={<Award className="text-yellow-500" size={18} />}
              label="Rank"
              value="Eco Hero"
              isString
            />
          </div>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 bg-[#1d2327] border border-white/5 rounded-[2.5rem] p-6 md:p-8"
          >
            <h3 className="text-lg font-black uppercase italic mb-6 flex items-center gap-3">
              <Calendar className="text-green-500" size={20} /> Activity Logs
            </h3>
            <div className="space-y-4">
              {/* FIXED: currentActivity.dailyLogs.map ব্যবহার করা হয়েছে */}
              {currentActivity.dailyLogs.length > 0 ? (
                currentActivity.dailyLogs.map((log, index) => (
                  <motion.div
                    whileHover={{ x: 5 }}
                    key={index}
                    className="bg-black/20 p-4 rounded-2xl border border-white/5 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                      <div>
                        <p className="font-bold text-xs md:text-sm">
                          {log.date}
                        </p>
                        <p className="text-[10px] md:text-xs text-gray-500 font-medium">
                          {log.notes}
                        </p>
                      </div>
                    </div>
                    <span className="text-[9px] font-black uppercase text-green-500 bg-green-500/10 px-2 py-1 rounded-md">
                      {log.status}
                    </span>
                  </motion.div>
                ))
              ) : (
                <p className="text-gray-600 italic text-sm text-center py-10">
                  No logs available for this activity.
                </p>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-6"
          >
            <div className="bg-green-500 p-8 rounded-[2.5rem] text-black shadow-lg shadow-green-500/10">
              <h4 className="text-xs font-black uppercase tracking-widest mb-3">
                Pro Tip
              </h4>
              <p className="text-[11px] font-bold leading-relaxed mb-6 italic">
                "Small steps lead to giant leaps. Keep pushing your limits!"
              </p>
              <motion.button
                whileHover={{
                  scale: 1.02,
                  borderColor: "rgba(34, 197, 94, 0.5)", // Green border glow
                  boxShadow: "0px 0px 25px rgba(34, 197, 94, 0.4)", // Neon green glow
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="w-full bg-black text-green-500 border border-black py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-lg"
              >
                Update Today's Progress
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

const StatCard = ({ icon, label, value, suffix = "", isString = false }) => (
  <div className="flex flex-col gap-1">
    <div className="flex items-center gap-2 mb-1">
      {icon}
      <span className="text-[9px] text-gray-500 font-black uppercase tracking-widest">
        {label}
      </span>
    </div>
    <div className="text-lg md:text-xl font-black italic text-white">
      {isString ? value : <CountUp end={value} duration={2.5} />}
      <span className="text-[10px] ml-1 text-gray-400 not-italic uppercase">
        {suffix}
      </span>
    </div>
  </div>
);

export default ActivityDetails;
