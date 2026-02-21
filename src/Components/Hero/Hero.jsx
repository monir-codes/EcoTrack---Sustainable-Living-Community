import React from "react";
import { ArrowRight, Sparkles, Leaf } from "lucide-react";

// Swiper modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade"; // For fade effect
import { Link } from "react-router-dom";

const heroSlides = [
  {
    id: 1,
    titleHighlight: "Plastic-Free",
    titleRest: "Living Dashboard",
    description:
      "Join the global movement to reduce plastic waste. Track your impact, earn badges, and compete with your local community.",
    cta: "JOIN CHALLENGE",
    cardTitle: "Superstars Unite!",
    cardSubtitle: "Championing Sustainability",
  },
  {
    id: 2,
    titleHighlight: "Carbon Footprint",
    titleRest: "Reduction Quest",
    description:
      "Take on daily challenges to significantly cut your carbon emissions and foster a greener planet.",
    cta: "START REDUCING",
    cardTitle: "Eco Warriors",
    cardSubtitle: "Protecting Our Planet",
  },
  {
    id: 3,
    titleHighlight: "Water Saving",
    titleRest: "Initiatives",
    description:
      "Discover innovative ways to conserve water in your daily life and help preserve this vital resource.",
    cta: "SAVE WATER NOW",
    cardTitle: "Hydration Heroes",
    cardSubtitle: "Every Drop Counts",
  },
];

const Hero = () => {
  return (
    <section className="relative overflow-hidden py-12 lg:py-20">
      {/* Background glowing circles - subtle animation */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-green-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          pagination={{ clickable: true }}
          className="hero-swiper" // Custom class for styling pagination
        >
          {heroSlides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[500px]">
                {/* Left Side: Text and CTAs */}
                <div className="space-y-6 animate-fade-in-up">
                  <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 px-4 py-2 rounded-full text-green-400 text-sm font-medium transform hover:scale-105 transition-transform duration-300">
                    <Sparkles size={16} />
                    <span>Featured Challenge 2026</span>
                  </div>
                  <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight">
                    {slide.titleHighlight} <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">
                      {slide.titleRest}
                    </span>
                  </h1>
                  <p className="text-gray-400 text-lg max-w-lg leading-relaxed animate-fade-in-up animation-delay-300">
                    {slide.description}
                  </p>
                  <div className="flex flex-wrap gap-4 pt-4">
                    <Link to={`/challenges`} className="bg-green-500 hover:bg-green-400 text-black ml-2 px-8 py-4 rounded-2xl font-black flex items-center gap-2 transition-all transform hover:scale-105 shadow-xl shadow-green-500/20">
                      {slide.cta} <ArrowRight size={20} />
                    </Link>
                    <button className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 ml-2 py-4 rounded-2xl font-bold transition-all transform hover:scale-105">
                      View Leaderboard
                    </button>
                  </div>
                </div>

                {/* Right Side: Visual Card (Image-like from your design) */}
                <div className="relative group p-4 animate-fade-in-right">
                  <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-600 rounded-[2.5rem] blur-xl opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                  <div className="relative bg-[#1d2327] rounded-[2rem] p-8 border border-white/10 overflow-hidden h-80 flex flex-col justify-between transform group-hover:scale-[1.02] transition-transform duration-300">
                    <div className="flex justify-between items-start">
                      <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center animate-pulse">
                        <Leaf size={32} className="text-green-500" />
                      </div>
                      <div className="text-right">
                        <p className="text-green-500 font-black text-xl italic tracking-widest">
                          ECO-TRACK
                        </p>
                        <p className="text-gray-500 text-[10px] uppercase">
                          Sustainability Certified
                        </p>
                      </div>
                    </div>
                    <div>
                      <h2 className="text-4xl font-black italic text-white uppercase leading-none">
                        {slide.cardTitle} <br />
                        <span className="text-2xl text-gray-400">
                          {slide.cardSubtitle}
                        </span>
                      </h2>
                      <p className="text-gray-500 mt-2 text-sm italic">
                        #EnvironmentFirst #Sustainability2026
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Hero;
