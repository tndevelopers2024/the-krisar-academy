import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, GraduationCap, ChevronRight } from 'lucide-react';
import logo from '../../assets/images/logo/logo.png';
import { Link } from 'react-router-dom';

const AdmissionPopup = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show popup after a short delay on first load in a session
    const timer = setTimeout(() => {
      const hasSeenPopup = sessionStorage.getItem('hasSeenAdmissionPopup');
      if (!hasSeenPopup) {
        setIsVisible(true);
        sessionStorage.setItem('hasSeenAdmissionPopup', 'true');
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  // Features list
  const features = [
    "NEET/IIT-JEE Foundation",
    "Excellent Results",
    "Smart Classrooms",
    "Modern Science Lab",
    "Dedicated Faculty",
    "Safety & Security",
    "& much more..."
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-3 md:p-4 bg-black/80 backdrop-blur-md font-sans">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-2xl max-h-[92vh] flex flex-col bg-[#0B1221] rounded-2xl md:rounded-3xl shadow-2xl border border-white/10"
          >
            {/* Premium Background Elements (clipped to modal) */}
            <div className="absolute inset-0 overflow-hidden rounded-2xl md:rounded-3xl pointer-events-none">
              <div className="absolute top-0 right-0 w-60 md:w-80 h-60 md:h-80 bg-yellow-400/20 rounded-full blur-[100px] md:blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
              <div className="absolute bottom-0 left-0 w-60 md:w-80 h-60 md:h-80 bg-blue-500/20 rounded-full blur-[100px] md:blur-[120px] translate-y-1/3 -translate-x-1/3"></div>
            </div>

            {/* Close Button - Stays fixed at the top right of the modal */}
            <button 
              onClick={handleClose}
              className="absolute top-3 right-3 md:top-4 md:right-4 z-20 text-gray-400 hover:text-white transition-colors p-1.5 md:p-2 bg-white/5 rounded-full hover:bg-white/10 backdrop-blur-md border border-white/10"
            >
              <X size={20} />
            </button>

            {/* Scrollable Inner Content */}
            <div className="relative z-10 p-5 pt-8 sm:p-8 md:p-10 flex flex-col items-center text-center overflow-y-auto w-full no-scrollbar rounded-2xl md:rounded-3xl">
              
              {/* Logo */}
              <img src={logo} alt="The Krisar Academy" className="h-10 sm:h-14 md:h-20 mb-3 md:mb-4 object-contain shrink-0" />

              {/* Header Text */}
              <p className="text-[10px] sm:text-xs md:text-sm font-semibold tracking-widest text-gray-400 uppercase mb-1 md:mb-2">
                The Krisar Academy Announces
              </p>

              {/* Main Headline */}
              <h2 className="text-[22px] leading-[1.1] sm:text-3xl md:text-5xl font-black uppercase mb-3 md:mb-4 tracking-tight text-white">
                <span className="text-transparent bg-clip-text bg-linear-to-r from-red-400 to-red-600">Admissions</span> <br className="sm:hidden" />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-300 to-yellow-600">Open For Vijayadashami</span>
              </h2>

              {/* Session Badge */}
              <div className="bg-white/10 border border-white/20 text-yellow-400 font-bold py-1 px-4 sm:py-1.5 sm:px-6 rounded-full mb-4 md:mb-6 uppercase tracking-wider text-[11px] sm:text-sm backdrop-blur-md shadow-inner shrink-0">
                Academy year 2026-27
              </div>

              {/* Features Tags */}
              <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-5 md:mb-8 max-w-xl">
                {features.map((feature, idx) => (
                  <span 
                    key={idx} 
                    className="px-2.5 py-1 sm:px-3 sm:py-1.5 bg-white/5 text-gray-300 border border-white/10 rounded-full text-[10px] sm:text-xs md:text-sm font-medium shadow-sm backdrop-blur-md"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              {/* Achievement Banner */}
              <div className="w-full bg-white/5 backdrop-blur-2xl border border-white/10 shadow-xl rounded-xl sm:rounded-2xl p-3 sm:p-5 md:p-6 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 md:gap-5 mb-5 md:mb-8">
                <div className="bg-yellow-400/10 border border-yellow-400/20 p-2 sm:p-3 md:p-4 rounded-full text-yellow-400 shrink-0">
                  <GraduationCap size={28} className="sm:w-8 sm:h-8 md:w-10 md:h-10" />
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-gray-200 text-sm sm:text-base md:text-lg font-medium leading-tight">
                    Every <strong className="text-red-400 text-base sm:text-lg md:text-xl">5th</strong> KRISAR Student scored<br className="hidden sm:block" />
                    <strong className="text-transparent bg-clip-text bg-linear-to-r from-yellow-300 to-yellow-600 text-lg sm:text-xl md:text-3xl font-black drop-shadow-sm ml-1 sm:ml-0">above 95%</strong> at BOARD Exams 2026
                  </p>
                </div>
              </div>

              {/* CTA Section */}
              <a
                href="tel:+917540088387"
                onClick={handleClose}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 md:px-8 md:py-3.5 text-sm sm:text-base md:text-lg bg-yellow-400 hover:bg-yellow-500 text-[#0B1221] font-bold rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_4px_24px_rgba(250,204,21,0.2)] shrink-0"
              >
                Schedule a Call Today
                <ChevronRight size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6 opacity-80" />
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AdmissionPopup;
