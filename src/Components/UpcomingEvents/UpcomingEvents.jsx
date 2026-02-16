import React from 'react';
import { Calendar, MapPin, ArrowRight, BellRing } from 'lucide-react';

const UpcomingEvents = () => {
  const events = [
    {
      id: 1,
      title: "Coastal Cleanup Drive",
      date: "Oct 24, 2026",
      location: "Patenga Beach, CTG",
      desc: "Join us for a massive beach cleanup to protect marine life from plastic pollution.",
      image: "https://picsum.photos/id/20/600/400"
    },
    {
      id: 2,
      title: "Urban Tree Plantation",
      date: "Nov 02, 2026",
      location: "Ramna Park, Dhaka",
      desc: "Help us plant 500 native saplings to improve our city's air quality and green cover.",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=600"
    },
    {
      id: 3,
      title: "Solar Power Workshop",
      date: "Nov 15, 2026",
      location: "Community Center",
      desc: "A hands-on workshop learning how to switch your home to affordable solar energy.",
      image: "https://picsum.photos/id/30/600/400"
    },
    {
      id: 4,
      title: "Zero Waste Living Expo",
      date: "Dec 05, 2026",
      location: "City Exhibition Hall",
      desc: "Explore products and daily hacks that help you transition to a zero-waste lifestyle.",
      image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=600"
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-green-500 font-black text-xs uppercase tracking-widest">
            <BellRing size={16} className="animate-bounce" />
            <span>Don't Miss Out</span>
          </div>
          <h2 className="text-4xl font-black text-white tracking-tighter uppercase italic">
            Upcoming <span className="text-green-500">Events</span>
          </h2>
          <div className="h-1.5 w-24 bg-green-500 rounded-full"></div>
        </div>
        <button className="flex items-center gap-2 text-gray-400 font-bold text-xs uppercase tracking-widest hover:text-green-500 transition-colors group">
          View Full Calendar <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
        </button>
      </div>

      {/* Events Grid - 4 Columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {events.map((event) => (
          <div 
            key={event.id} 
            className="group bg-[#1d2327] rounded-[2.5rem] border border-white/5 overflow-hidden hover:border-green-500/30 transition-all duration-500 flex flex-col shadow-2xl"
          >
            {/* Image Section */}
            <div className="h-44 overflow-hidden relative">
              <img 
                src={event.image} 
                alt={event.title} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = "https://images.unsplash.com/photo-1501854140801-50d01674aa3e?q=60&w=600";
                }}
              />
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-[10px] font-black px-3 py-1.5 rounded-xl border border-white/10 flex items-center gap-2">
                <Calendar size={12} className="text-green-500" />
                {event.date}
              </div>
            </div>

            {/* Content Section */}
            <div className="p-6 flex-grow flex flex-col">
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors">
                {event.title}
              </h3>
              
              <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-2">
                {event.desc}
              </p>

              <div className="mt-auto space-y-4">
                <div className="flex items-center gap-2 text-gray-500">
                  <MapPin size={14} className="text-green-500" />
                  <span className="text-[11px] font-bold uppercase tracking-tighter italic">
                    {event.location}
                  </span>
                </div>
                
                <button className="w-full py-3 bg-white/5 group-hover:bg-green-500 group-hover:text-black rounded-2xl text-white text-[10px] font-black uppercase tracking-widest transition-all">
                  Register Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UpcomingEvents;