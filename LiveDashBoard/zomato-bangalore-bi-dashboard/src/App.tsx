import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  Map, 
  UtensilsCrossed, 
  IndianRupee, 
  LineChart, 
  Sparkles, 
  TrendingUp, 
  Info, 
  Smartphone,
  CheckCircle,
  Clock,
  ChevronRight,
  Maximize2,
  Sparkle
} from 'lucide-react';

import { getFilteredStats } from './data';
import { DashboardFilters } from './types';

// Importing custom styled sub-components
import ScooterRiders from './components/ScooterRiders';
import ActiveFilters from './components/ActiveFilters';
import ExecutiveOverview from './components/ExecutiveOverview';
import LocationIntelligenceView from './components/LocationIntelligenceView';
import CuisineAnalysisView from './components/CuisineAnalysisView';
import PriceRatingView from './components/PriceRatingView';
import MarketStrategyView from './components/MarketStrategyView';

const SECTIONS = [
  { id: 'overview', label: 'Executive Overview', icon: LineChart },
  { id: 'location', label: 'Location Analysis', icon: Map },
  { id: 'cuisine', label: 'Cuisine Analysis', icon: UtensilsCrossed },
  { id: 'pricing', label: 'Price & Rating', icon: IndianRupee },
  { id: 'strategy', label: 'Market Strategy', icon: TrendingUp },
];

export default function App() {
  const [filters, setFilters] = useState<DashboardFilters>({
    area: 'All',
    cuisine: 'All',
    costRange: 'All',
    restaurantType: 'All',
  });

  const [activeTab, setActiveTab] = useState<string>('overview');
  const [showInsights, setShowInsights] = useState<boolean>(true);

  const containerRef = useRef<HTMLDivElement>(null);

  // Live Stats Calculator based on filters
  const stats = getFilteredStats(filters);

  // Navigate function: switches active view tab
  const handleNavClick = (sectionId: string) => {
    setActiveTab(sectionId);
  };

  const resetAllFilters = () => {
    setFilters({
      area: 'All',
      cuisine: 'All',
      costRange: 'All',
      restaurantType: 'All',
    });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-neutral-100 flex font-sans antialiased overflow-hidden relative">
      
      {/* BACKGROUND FLOATING BLURRY EFFECT COLORS (ARTISTIC FLAIR THEME GLOW) */}
      <div className="absolute top-[-100px] left-[-100px] bg-blur-red pointer-events-none z-0" />
      <div className="absolute bottom-[-100px] right-[-100px] bg-blur-purple pointer-events-none z-0" />
      <div className="absolute top-[20%] right-[10%] bg-blur-yellow pointer-events-none z-0" />

      {/* LEFT SIDEBAR NAVIGATION */}
      <aside className="w-72 hidden md:flex flex-col glass border-r border-white/5 p-5 relative z-30 shrink-0">
        
        {/* Zomato Bangalore BI Header */}
        <div className="mb-8 flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-red-650 via-purple-650 to-yellow-500 flex items-center justify-center text-white font-black font-display text-xl shadow-lg shadow-red-500/20">
              ZB
            </div>
          </div>
          <div>
            <h1 className="text-sm font-display font-black tracking-normal text-white">ZOMATO ANALYTICS</h1>
            <p className="text-[10px] mono tracking-widest text-neutral-400">BANGALORE DATASET</p>
          </div>
        </div>

        {/* Dataset Stats strip */}
        <div className="bg-white/5 p-2.5 rounded-xl border border-white/5 flex items-center justify-between mb-6 text-[10px] mono text-neutral-400">
          <span className="flex items-center gap-1.5 text-neutral-300 font-medium">
            TOTAL RECORDS:
          </span>
          <span className="text-red-500 font-bold">7,105 RESTAURANTS</span>
        </div>

        {/* Navigation Section Buttons */}
        <div className="space-y-1.5 flex-1">
          <h2 className="text-[10px] mono tracking-widest text-neutral-500 uppercase px-3 mb-2.5">Data Viewpoints</h2>
          
          {SECTIONS.map((sec) => {
            const Icon = sec.icon;
            const isSelected = activeTab === sec.id;
            
            return (
              <button
                key={sec.id}
                onClick={() => handleNavClick(sec.id)}
                className={`w-full flex items-center justify-between p-3 rounded-xl text-left border text-xs font-medium transition-all group relative cursor-pointer ${
                  isSelected 
                    ? 'bg-gradient-to-r from-red-500/10 via-purple-500/5 to-transparent text-white border-red-500/35 shadow-lg shadow-black/40' 
                    : 'text-neutral-400 hover:text-white hover:bg-white/5 border-transparent'
                }`}
              >
                {/* Visual Accent bar on select */}
                {isSelected && (
                  <motion.div 
                    layoutId="activeBarAccent"
                    className="absolute left-0 top-1/4 bottom-1/4 w-0.5 rounded-r bg-gradient-to-b from-red-500 to-purple-500" 
                  />
                )}

                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                    isSelected ? 'text-red-500' : 'text-neutral-500 group-hover:text-neutral-300'
                  }`} />
                  <span className="font-display font-medium text-xs">{sec.label}</span>
                </div>
                
                <ChevronRight className={`w-3.5 h-3.5 opacity-0 transition-all ${
                  isSelected ? 'opacity-100 text-red-500 translate-x-0' : 'group-hover:opacity-40 group-hover:translate-x-0.5'
                }`} />
              </button>
            );
          })}
        </div>

        {/* SVG Delivery Riders animation module inside the sidebar */}
        <ScooterRiders />

      </aside>

      {/* MAIN VIEWPORT AND CONTROL REGION */}
      <main className="flex-1 flex flex-col min-w-0 h-screen relative z-10">
        
        {/* APP TOP BAR */}
        <header className="p-4 bg-white/[0.02] backdrop-blur-md border-b border-white/5 flex items-center justify-between gap-4">
          
          {/* Quick Filters Indicator pill */}
          <div className="flex items-center gap-4">
            {/* Small burger button for mobile view placeholder */}
            <div className="md:hidden flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-gradient-to-tr from-red-600 to-purple-600 flex items-center justify-center text-white font-bold text-sm">Z</span>
              <span className="text-xs font-display font-semibold text-white tracking-tight">Bangalore BI</span>
            </div>

            <div className="flex flex-col">
              <h1 className="text-sm md:text-base font-bold tracking-tight text-white/90">
                Zomato Bangalore Analytics Dashboard
              </h1>
            </div>
          </div>

          {/* Quick help panel toggle */}
          <button 
            onClick={() => setShowInsights(!showInsights)}
            className={`p-2 rounded-xl border transition-all cursor-pointer ${
              showInsights 
                ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' 
                : 'bg-white/5 border-white/5 text-neutral-400 hover:text-white'
            }`}
          >
            <Info className="w-4 h-4" />
          </button>
        </header>

        {/* DYNAMIC SCROLL OR ISOLATED PORTAL CONTENT AREA */}
        <div className="flex-1 flex flex-col overflow-hidden">
          
          {/* Quick Informative Insight Strip (Togglable) */}
          <AnimatePresence>
            {showInsights && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-r from-red-500/10 via-yellow-500/10 to-purple-950/15 border-b border-white/5 px-6 py-2.5 overflow-hidden text-xs flex items-center justify-between gap-4 text-neutral-300"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400 animate-bounce shrink-0" />
                  <p className="font-display">
                    <span className="text-white font-semibold">Silicon Valley Insights: </span>
                    Toggle filters dynamically! Selected <span className="text-red-400 font-semibold">{filters.area === 'All' ? 'Whole Bangalore' : filters.area}</span> with <span className="text-amber-400 font-semibold">{filters.cuisine === 'All' ? 'any food styles' : filters.cuisine}</span> updates rating histograms, t-test bars, and segment weights in real time.
                  </p>
                </div>
                <button 
                  onClick={() => setShowInsights(false)}
                  className="mono text-neutral-500 hover:text-white px-2 py-0.5 border border-white/5 rounded hover:bg-white/5 transition-all text-[10px] uppercase shrink-0"
                >
                  Dismiss
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* MASTER ACTIVE DYNAMIC FILTERING BAR */}
          <div className="p-4 bg-neutral-950/20 border-b border-white/5 shrink-0">
            <ActiveFilters 
              filters={filters} 
              onChange={setFilters} 
              onReset={resetAllFilters} 
            />
          </div>

          {/* VIEWPORT CONTROLLER FOR THE RENDER LAYOUT */}
          <div 
            ref={containerRef}
            className="flex-1 overflow-y-auto p-4 md:p-6 space-y-12 custom-scrollbar"
          >
            {/* Isolated Viewport layout (one tab page rendered at a time, smooth transition state) */}
            <div className="pb-16 min-h-[450px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="glass-card p-6 rounded-3xl"
                >
                  {activeTab === 'overview' && <ExecutiveOverview stats={stats} />}
                  {activeTab === 'location' && <LocationIntelligenceView stats={stats} />}
                  {activeTab === 'cuisine' && <CuisineAnalysisView stats={stats} />}
                  {activeTab === 'pricing' && <PriceRatingView stats={stats} />}
                  {activeTab === 'strategy' && <MarketStrategyView stats={stats} />}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* APP FOOTER STATUS STATEMENTS */}
        <footer className="p-3 bg-white/[0.02] border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between text-[10px] mono text-neutral-500 gap-2 shrink-0">
          <div className="flex gap-4 opacity-75">
            <span>DATABASE: ZOMATO BANGALORE</span>
            <span className="text-neutral-700">|</span>
            <span>TOTAL ANALYZED: 7,105 RESTAURANTS</span>
          </div>
          <div className="flex items-center gap-3 opacity-75">
            <span>© 2026 ZOMATO BANGALORE ANALYTICS</span>
          </div>
        </footer>

      </main>

      {/* Dynamic quick floating indicators for mobile screens */}
      <div className="fixed bottom-4 right-4 md:hidden z-40 flex flex-col gap-2">
        <div className="bg-neutral-950 border border-white/10 p-2.5 rounded-full shadow-2xl flex items-center gap-1 shadow-black/80">
          {SECTIONS.map((sec) => {
            const isSelected = activeTab === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => handleNavClick(sec.id)}
                className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  isSelected ? 'bg-red-500 text-white' : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                }`}
                title={sec.label}
              >
                {sec.label.charAt(0)}
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
}
