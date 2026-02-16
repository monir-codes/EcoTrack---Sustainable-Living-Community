import React from 'react';
import { Facebook, Twitter, Instagram, Github, Leaf, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative bg-[#0e1113] border-t border-white/10 pt-16 pb-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Section 1: Brand (Same as Navbar) */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 font-bold text-2xl">
              <div className="bg-green-500 p-1.5 rounded-lg">
                <Leaf size={22} className="text-black" />
              </div>
              <span className="text-white">Eco<span className="text-green-500">Track</span></span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Empowering communities to live sustainably by tracking impact and sharing green tips.
            </p>
          </div>

          {/* Section 2: Quick Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 underline decoration-green-500 underline-offset-8">Explore</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-300 hover:text-green-400 transition-all hover:translate-x-1 inline-block">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-green-400 transition-all hover:translate-x-1 inline-block">Contact Support</a></li>
            </ul>
          </div>

          {/* Section 3: Social Media with Hover Effect */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 underline decoration-green-500 underline-offset-8">Follow Us</h4>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Github].map((Icon, idx) => (
                <a key={idx} href="#" className="w-11 h-11 flex items-center justify-center bg-white/5 rounded-xl text-gray-300 hover:bg-green-500 hover:text-black hover:-translate-y-1 transition-all duration-300">
                  <Icon size={22} />
                </a>
              ))}
            </div>
          </div>

          {/* Section 4: Contact */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 underline decoration-green-500 underline-offset-8">Contact</h4>
            <div className="flex items-center gap-3 text-gray-300 group cursor-pointer">
              <div className="p-2 bg-white/5 rounded-lg group-hover:bg-green-500 transition-colors">
                <Mail size={18} className="group-hover:text-black" />
              </div>
              <span className="group-hover:text-green-400">support@ecotrack.com</span>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm italic">
            © 2025 <span className="text-white font-bold">EcoTrack</span>. All rights reserved.
          </p>
          <div className="text-gray-500 text-[10px] tracking-widest uppercase flex gap-4">
            <span>Privacy Policy</span>
            <span>Accessibility</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;