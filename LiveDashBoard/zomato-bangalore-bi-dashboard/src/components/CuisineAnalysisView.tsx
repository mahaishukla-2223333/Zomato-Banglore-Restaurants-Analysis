import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, Legend } from 'recharts';
import { Utensils, Star, Flame, Sparkles, TrendingUp, IndianRupee } from 'lucide-react';

interface CuisineAnalysisViewProps {
  stats: any;
}

export default function CuisineAnalysisView({ stats }: CuisineAnalysisViewProps) {
  const [hoveredCostBar, setHoveredCostBar] = useState<number | null>(null);
  const [hoveredCountBar, setHoveredCountBar] = useState<number | null>(null);

  // Formatting chart data for premium styling
  const cuisinesByCountData = stats.cuisinesByCount.map((item: any) => ({
    name: item.name,
    Count: item.restaurantCount,
    Rating: item.avgRating
  }));

  const cuisinesByCostData = stats.cuisinesByCost.map((item: any) => ({
    name: item.name,
    Cost: item.avgCost
  }));

  const cuisinesByRatingData = stats.cuisinesByRating.map((item: any) => ({
    name: item.name,
    Rating: item.avgRating
  }));

  return (
    <div className="space-y-6">
      {/* Top Heading */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-white/5">
        <div>
          <h2 className="text-xl font-display font-black text-white tracking-tight flex items-center gap-2">
            <Utensils className="w-5 h-5 text-red-500" /> Cuisine Analysis — What Does Bangalore Eat?
          </h2>
          <p className="text-xs mono text-neutral-400 mt-1">
            "Popularity, ratings and pricing analysis of cuisines across Bangalore restaurants"
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs mono bg-white/5 pl-3 pr-4 py-1.5 rounded-full border border-white/5">
          <span className="text-neutral-400">Cuisine Statistics</span>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="glass-card p-4 rounded-2xl border-l-4 border-l-red-500 flex flex-col justify-between shadow-lg relative group overflow-hidden">
          <div className="absolute right-3 top-3 opacity-10">
            <Utensils className="w-12 h-12 text-red-500" />
          </div>
          <span className="text-[11px] mono tracking-wider text-neutral-400 uppercase">Primary Demand</span>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-2xl font-display font-black text-white">{stats.northIndianCount}</span>
            <span className="text-xs mono text-neutral-500">K+</span>
          </div>
          <span className="text-xs text-red-500 font-medium mt-1 flex items-center gap-1">
            North Indian ({stats.northIndianPct}%)
          </span>
        </div>

        {/* KPI 2 */}
        <div className="glass-card p-4 rounded-2xl border-l-4 border-l-yellow-500 flex flex-col justify-between shadow-lg relative group overflow-hidden">
          <div className="absolute right-3 top-3 opacity-10">
            <Star className="w-12 h-12 text-yellow-500" />
          </div>
          <span className="text-[11px] mono tracking-wider text-neutral-400 uppercase">Top Scorer Cuisine</span>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-2xl font-display font-black text-white">{stats.highestRatedCuisineVal}</span>
            <span className="text-xs text-yellow-500 font-bold">&#9733;</span>
          </div>
          <span className="text-xs text-yellow-500 font-medium mt-1">
            {stats.highestRatedCuisineName}
          </span>
        </div>

        {/* KPI 3 */}
        <div className="glass-card p-4 rounded-2xl border-l-4 border-l-red-400 flex flex-col justify-between shadow-lg relative group overflow-hidden">
          <div className="absolute right-3 top-3 opacity-10">
            <IndianRupee className="w-12 h-12 text-red-400" />
          </div>
          <span className="text-[11px] mono tracking-wider text-neutral-400 uppercase">Budget Savvy Entry</span>
          <div className="mt-2">
            <span className="text-2xl font-display font-black text-white">₹{stats.cheapestCuisineCost}</span>
          </div>
          <span className="text-xs text-red-400 font-medium mt-1">
            {stats.cheapestCuisineName}
          </span>
        </div>

        {/* KPI 4 */}
        <div className="glass-card p-4 rounded-2xl border-l-4 border-l-purple-500 flex flex-col justify-between shadow-lg relative group overflow-hidden">
          <div className="absolute right-3 top-3 opacity-10">
            <TrendingUp className="w-12 h-12 text-purple-500" />
          </div>
          <span className="text-[11px] mono tracking-wider text-neutral-400 uppercase">Premium Category</span>
          <div className="mt-2">
            <span className="text-2xl font-display font-black text-white">₹{stats.mostExpensiveCuisineCost.toLocaleString()}</span>
          </div>
          <span className="text-xs text-purple-400 font-medium mt-1">
            {stats.mostExpensiveCuisineName}
          </span>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Big Chart - Top 12 Cuisines by Restaurant Count */}
        <div className="glass-card p-5 rounded-2xl border border-white/5 lg:col-span-7 flex flex-col shadow-xl">
          <div className="mb-4">
            <h4 className="text-sm font-display font-bold text-white tracking-wide">Top Cuisines by Restaurant Count</h4>
            <p className="text-[11px] mono text-neutral-400 mt-0.5">Distribution volume scaled based on current filters</p>
          </div>
          
          <div className="h-[280px] w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={cuisinesByCountData}
                margin={{ top: 10, right: 10, left: -20, bottom: 20 }}
                onMouseMove={(state) => {
                  if (state && state.activeTooltipIndex !== undefined) {
                    setHoveredCountBar(state.activeTooltipIndex);
                  }
                }}
                onMouseLeave={() => setHoveredCountBar(null)}
              >
                <defs>
                  <linearGradient id="purpleBarGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#c084fc" stopOpacity={0.8}/>
                    <stop offset="100%" stopColor="#7c3aed" stopOpacity={0.2}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                <XAxis 
                   dataKey="name" 
                  stroke="rgba(255,255,255,0.4)" 
                  fontSize={9} 
                  angle={-30} 
                  textAnchor="end" 
                  interval={0}
                  tickLine={false}
                />
                <YAxis stroke="rgba(255,255,255,0.4)" fontSize={9} tickLine={false} />
                <Tooltip
                  cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
                  contentStyle={{
                    backgroundColor: '#0f0f0f',
                    borderColor: 'rgba(239, 68, 68, 0.2)',
                    borderRadius: '8px',
                    fontSize: '11px',
                    color: '#fff'
                  }}
                />
                <Bar dataKey="Count" fill="url(#purpleBarGlow)" radius={[4, 4, 0, 0]}>
                  {cuisinesByCountData.map((entry: any, index: number) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={hoveredCountBar === index ? '#ef4444' : 'url(#purpleBarGlow)'} 
                      className="transition-all duration-300 pointer-events-auto"
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Columns: Avg Cost and Avg Rating */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Average Cost by Cuisine */}
          <div className="glass-card p-5 rounded-2xl border border-white/5 flex flex-col shadow-xl flex-1">
            <div className="mb-3">
              <h4 className="text-sm font-display font-bold text-white tracking-wide">Avg Cost by Cuisine (₹)</h4>
              <p className="text-[11px] mono text-neutral-400">Comparing luxury vs street delicacies</p>
            </div>
            
            <div className="h-[180px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={cuisinesByCostData}
                  margin={{ top: 5, right: 15, left: 10, bottom: 5 }}
                  onMouseMove={(state) => {
                    if (state && state.activeTooltipIndex !== undefined) {
                      setHoveredCostBar(state.activeTooltipIndex);
                    }
                  }}
                  onMouseLeave={() => setHoveredCostBar(null)}
                >
                  <defs>
                    <linearGradient id="pinkBarGlow" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#f472b6" stopOpacity={0.8}/>
                      <stop offset="100%" stopColor="#db2777" stopOpacity={0.3}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" horizontal={false} />
                  <XAxis type="number" stroke="rgba(255,255,255,0.4)" fontSize={9} tickLine={false} />
                  <YAxis dataKey="name" type="category" stroke="rgba(255,255,255,0.4)" fontSize={9} width={55} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f0f0f',
                      borderColor: 'rgba(139, 92, 246, 0.15)',
                      borderRadius: '8px',
                      fontSize: '11px',
                      color: '#fff'
                    }}
                  />
                  <Bar dataKey="Cost" fill="url(#pinkBarGlow)" radius={[0, 4, 4, 0]}>
                    {cuisinesByCostData.map((entry: any, index: number) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={hoveredCostBar === index ? '#f59e0b' : 'url(#pinkBarGlow)'}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Average Rating by Top 10 Cuisines */}
          <div className="glass-card p-5 rounded-2xl border border-white/5 flex flex-col shadow-xl flex-1">
            <div className="mb-3">
              <h4 className="text-sm font-display font-bold text-white tracking-wide">Average Rating of Top Cuisines</h4>
              <p className="text-[11px] mono text-neutral-400">Consolidated high-reputation favorites</p>
            </div>

            <div className="h-[180px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={cuisinesByRatingData}
                  margin={{ top: 5, right: 15, left: 15, bottom: 5 }}
                >
                  <defs>
                    <linearGradient id="orangeBarGlow" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#f87171" stopOpacity={0.85}/>
                      <stop offset="100%" stopColor="#ef4444" stopOpacity={0.3}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" horizontal={false} />
                  <XAxis type="number" domain={[0, 5]} ticks={[1, 2, 3, 4, 5]} stroke="rgba(255,255,255,0.4)" fontSize={9} tickLine={false} />
                  <YAxis dataKey="name" type="category" stroke="rgba(255,255,255,0.4)" fontSize={9} width={65} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f0f0f',
                      borderColor: 'rgba(239, 68, 68, 0.2)',
                      borderRadius: '8px',
                      fontSize: '11px',
                      color: '#fff'
                    }}
                  />
                  <Bar dataKey="Rating" fill="url(#orangeBarGlow)" radius={[0, 4, 4, 0]}>
                    {cuisinesByRatingData.map((entry: any, index: number) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.Rating >= 4.2 ? '#f59e0b' : 'url(#orangeBarGlow)'}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
