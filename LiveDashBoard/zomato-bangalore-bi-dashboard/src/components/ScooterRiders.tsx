import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ShoppingBag, Bike } from 'lucide-react';

export default function ScooterRiders() {
  const [isHovered, setIsHovered] = useState(false);
  const [bellCount, setBellCount] = useState(0);

  const ringBell = (e: React.MouseEvent) => {
    e.stopPropagation();
    setBellCount(prev => prev + 1);
    setTimeout(() => {
      setBellCount(prev => Math.max(0, prev - 1));
    }, 1500);
  };

  return (
    <div 
      className="relative mt-auto p-4 rounded-2xl bg-gradient-to-br from-neutral-900/80 to-neutral-950/80 border border-white/5 overflow-hidden group shadow-lg shadow-black/40"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Dynamic Glow background indicator */}
      <div className="absolute -right-4 -bottom-4 w-24 h-24 rounded-full bg-red-500/10 blur-xl group-hover:bg-purple-600/15 transition-all duration-700" />
      <div className="absolute -left-4 -top-4 w-16 h-16 rounded-full bg-yellow-500/10 blur-xl group-hover:bg-red-500/15 transition-all duration-700" />

      <h4 className="text-xs mono tracking-widest text-yellow-500 uppercase flex items-center gap-1.5 mb-1">
        <Sparkles className="w-3.5 h-3.5 text-yellow-500" /> Bangalore Delivery
      </h4>
      <p className="text-sm font-display font-medium text-neutral-300 leading-snug">
        Scooters connecting <span className="text-red-500 font-semibold">Hot Meals</span> to techies 24/7!
      </p>

      {/* Floating Bell Ringer Alerts */}
      <div className="h-20 w-full relative flex items-end justify-center pt-2">
        {Array.from({ length: bellCount }).map((_, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10, scale: 0.5 }}
            animate={{ opacity: [0, 1, 1, 0], y: -45, x: (idx % 2 === 0 ? 15 : -15), scale: [0.8, 1.2, 1, 0.6] }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute bottom-12 text-[10px] mono bg-red-600 text-white px-1.5 py-0.5 rounded-full font-bold shadow-md shadow-black/40 flex items-center gap-0.5"
          >
            TRING! 🔔
          </motion.div>
        ))}

        {/* Dynamic Scooter Rider Vector Render */}
        <motion.div 
          className="relative cursor-pointer transition-all duration-300"
          animate={isHovered ? {
            x: [0, 5, -5, 4, -2, 0],
            translateY: [0, -3, 0, -2, 0]
          } : {
            y: [0, -2, 0, -1, 0]
          }}
          transition={isHovered ? {
            duration: 0.6,
            repeat: Infinity
          } : {
            duration: 2.2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          onClick={ringBell}
        >
          {/* Main Rider Vector Icon & Scooter */}
          <svg width="120" height="70" viewBox="0 0 120 70" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]">
            {/* Speed trail lines */}
            <motion.path 
              d="M10 42H30M5 48H22M15 36H25" 
              stroke="#ef4444" 
              strokeWidth="1.5" 
              strokeLinecap="round"
              animate={{
                opacity: [0.3, 0.8, 0.3],
                stroke: isHovered ? ["#8b5cf6", "#ef4444", "#f59e0b"] : ["#ef4444", "#7c3aed", "#ef4444"],
                strokeDashoffset: [0, 10]
              }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />

            {/* Scooter Frame */}
            <path d="M35 52 L55 52 L62 42 L80 42 L84 30 L95 24" stroke="#404040" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M55 52 L62 42 L80 42 L82 32" stroke="#ef4444" strokeWidth="6" strokeLinecap="round" />
            
            {/* Front Mudguard & Shield */}
            <path d="M84 30 L88 48 M86 42 L92 48" stroke="#ef4444" strokeWidth="5" strokeLinecap="round" />

            {/* Headlight Ray (Glow when hovered) */}
            <motion.polygon 
              points="93,26 115,20 115,38 93,28" 
              fill="url(#lightGlow)" 
              animate={{ opacity: isHovered ? 0.85 : 0.45 }}
            />

            {/* Wheels with rotation */}
            <g className="origin-[45px_52px]">
              <motion.circle 
                cx="45" cy="52" r="10" 
                fill="#171717" 
                stroke="#666" 
                strokeWidth="2.5" 
                animate={{ rotate: 360 }}
                transition={{ duration: isHovered ? 0.3 : 0.8, repeat: Infinity, ease: "linear" }}
              />
              <circle cx="45" cy="52" r="6" fill="#444" />
              <circle cx="45" cy="52" r="2" fill="#fff" />
            </g>

            <g className="origin-[88px_52px]">
              <motion.circle 
                cx="88" cy="52" r="10" 
                fill="#171717" 
                stroke="#666" 
                strokeWidth="2.5"
                animate={{ rotate: 360 }}
                transition={{ duration: isHovered ? 0.3 : 0.8, repeat: Infinity, ease: "linear" }}
              />
              <circle cx="88" cy="52" r="6" fill="#444" />
              <circle cx="88" cy="52" r="2" fill="#fff" />
            </g>

            {/* Delivery Box */}
            <rect x="32" y="24" width="22" height="20" rx="3" fill="#ef4444" stroke="#991b1b" strokeWidth="1" />
            <rect x="36" y="28" width="14" height="4" rx="1" fill="#fff" />
            <text x="38" y="40" fill="#fff" fontSize="6px" fontFamily="monospace" fontWeight="bold">FOOD</text>

            {/* Delivery Rider representation */}
            {/* Body */}
            <circle cx="68" cy="24" r="9" fill="#ef4444" /> {/* Red shirt */}
            <circle cx="70" cy="11" r="5.5" fill="#fcd34d" /> {/* Face */}
            <path d="M70 6 C73 6 76 8 76 11 L64 11 C64 8 67 6 70 6" fill="#ef4444" /> {/* Red Helmet */}
            
            {/* Arms driving */}
            <path d="M64 24 L78 24 L82 28" stroke="#fcd34d" strokeWidth="3.5" strokeLinecap="round" />
            
            {/* Legs */}
            <path d="M68 32 L66 45 L72 45" stroke="#262626" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />

            <defs>
              <linearGradient id="lightGlow" x1="93" y1="27" x2="115" y2="29" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8"/>
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0"/>
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      </div>

      <div className="flex items-center justify-between text-[10px] mono text-neutral-400 border-t border-white/5 pt-2.5 mt-1">
        <span className="flex items-center gap-1">
          <Bike className="w-3 h-3 text-red-500" /> Click rider
        </span>
        <span className="text-neutral-500">Fast Delivery</span>
      </div>
    </div>
  );
}
