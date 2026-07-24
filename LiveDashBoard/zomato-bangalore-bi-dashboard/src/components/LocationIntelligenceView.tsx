import React from 'react';
import { motion } from 'motion/react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts';
import { Map, MapPin, Compass, AlertCircle, Award, Landmark, DollarSign, Signal } from 'lucide-react';

interface LocationIntelligenceViewProps {
  stats: any;
}

export default function LocationIntelligenceView({ stats }: LocationIntelligenceViewProps) {
  
  // Format for Top 12 areas sorted by Average Rating (horizontal bar)
  const areasRatingData = stats.areasByRatingPre.map((a: any) => ({
    name: a.name.split(',')[0], // simplify Byresandra,Tavarekere,Madiwala -> Byresandra
    Rating: a.avgRating
  }));

  // Format for Online order adoption by area
  const onlineAdoptionData = stats.areasByOnlineOrder.map((a: any) => ({
    name: a.name.split(',')[0],
    Ratio: Number((a.onlineOrderPct / 100).toFixed(2))
  }));

  // Format for top 8 expensive average costs
  const expensiveAreasData = stats.areasByCost.map((a: any) => ({
    name: a.name.split(',')[0],
    Cost: a.avgCost
  }));

  return (
    <div className="space-y-6">
      {/* View Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-white/5">
        <div>
          <h2 className="text-xl font-display font-black text-white tracking-tight flex items-center gap-2">
            <Compass className="w-5 h-5 text-red-500" /> Location Intelligence — Bangalore Area Performance Analysis
          </h2>
          <p className="text-xs mono text-neutral-400 mt-1">
            "Area-wise restaurant ratings, pricing trends, delivery adoption, and market opportunity analysis"
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs mono bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
          <span className="text-neutral-400">Geographical Insights</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="glass-card p-4 rounded-2xl border-l-4 border-l-yellow-500 flex flex-col justify-between shadow-lg relative group overflow-hidden">
          <div className="absolute right-3 top-3 opacity-10">
            <Award className="w-12 h-12 text-yellow-500" />
          </div>
          <span className="text-[11px] mono tracking-wider text-neutral-400 uppercase">Best Area Rating</span>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-2xl font-display font-black text-white">{stats.bestAreaRating}</span>
            <span className="text-xs mono text-yellow-500">&#9733;</span>
          </div>
          <span className="text-xs text-yellow-500 font-medium mt-1">
            Top general feedback node
          </span>
        </div>

        {/* KPI 2 */}
        <div className="glass-card p-4 rounded-2xl border-l-4 border-l-red-500 flex flex-col justify-between shadow-lg relative group overflow-hidden">
          <div className="absolute right-3 top-3 opacity-10">
            <Landmark className="w-12 h-12 text-red-500" />
          </div>
          <span className="text-[11px] mono tracking-wider text-neutral-400 uppercase">Largest Area Volume</span>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-2xl font-display font-black text-white">{stats.largestAreaCount}</span>
            <span className="text-xs mono text-neutral-400">Stores</span>
          </div>
          <span className="text-xs text-neutral-300 font-medium mt-1 truncate max-w-full">
            {stats.largestAreaName.split(',')[0]} (BTM)
          </span>
        </div>

        {/* KPI 3 */}
        <div className="glass-card p-4 rounded-2xl border-l-4 border-l-purple-500 flex flex-col justify-between shadow-lg relative group overflow-hidden">
          <div className="absolute right-3 top-3 opacity-10">
            <DollarSign className="w-12 h-12 text-purple-400" />
          </div>
          <span className="text-[11px] mono tracking-wider text-neutral-400 uppercase">Most Expensive Area</span>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-2xl font-display font-black text-white">₹{stats.mostExpensiveAreaCost}</span>
          </div>
          <span className="text-xs text-purple-400 font-medium mt-1 truncate">
            {stats.mostExpensiveAreaName}
          </span>
        </div>

        {/* KPI 4 */}
        <div className="glass-card p-4 rounded-2xl border-l-4 border-l-red-400 flex flex-col justify-between shadow-lg relative group overflow-hidden">
          <div className="absolute right-3 top-3 opacity-10">
            <Signal className="w-12 h-12 text-red-400" />
          </div>
          <span className="text-[11px] mono tracking-wider text-neutral-400 uppercase">Lowest Online Order %</span>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-2xl font-display font-black text-white">{stats.lowestOnlineOrderPct}%</span>
          </div>
          <span className="text-xs text-red-400 font-medium mt-1 truncate">
            {stats.lowestOnlineOrderAreaName}
          </span>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side: Top 12 Areas by Average Rating */}
        <div className="glass-card p-5 rounded-2xl border border-white/5 lg:col-span-7 flex flex-col shadow-xl">
          <div className="mb-4">
            <h4 className="text-sm font-display font-bold text-white tracking-wide">Top 12 areas by average rating</h4>
            <p className="text-[11px] mono text-neutral-400">Comparing culinary rep across the high-volume hubs</p>
          </div>

          <div className="h-[310px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={areasRatingData}
                margin={{ top: 5, right: 20, left: 15, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="peachGradientGlow" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#fca5a5" stopOpacity={0.85}/>
                    <stop offset="100%" stopColor="#f87171" stopOpacity={0.25}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" horizontal={false} />
                <XAxis type="number" domain={[0, 5]} stroke="rgba(255,255,255,0.3)" fontSize={9} tickLine={false} />
                <YAxis dataKey="name" type="category" stroke="rgba(255,255,255,0.4)" fontSize={9} width={90} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f0f0f', borderRadius: '8px', borderColor: 'rgba(239, 68, 68, 0.2)', fontSize: '11px', color: '#fff' }}
                />
                <Bar dataKey="Rating" fill="url(#peachGradientGlow)" radius={[0, 4, 4, 0]} barSize={12}>
                  {areasRatingData.map((entry: any, index: number) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.Rating >= 3.65 ? '#ef4444' : 'url(#peachGradientGlow)'} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Side Stack: Online Order Adoption & Expensive Areas */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Online order adoption ratios */}
          <div className="glass-card p-4 rounded-2xl border border-white/5 flex flex-col shadow-xl flex-1">
            <div className="mb-2">
              <h4 className="text-sm font-display font-bold text-white tracking-wide">Online order adoption by area</h4>
              <p className="text-[11px] mono text-neutral-400">Ratio of online deliveries compared to dine-outs</p>
            </div>

            <div className="h-[140px] w-full mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={onlineAdoptionData}
                  margin={{ top: 5, right: 5, left: -25, bottom: 5 }}
                >
                  <defs>
                    <linearGradient id="deliveryPinkGlow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f43f5e" stopOpacity={0.8}/>
                      <stop offset="100%" stopColor="#ec4899" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" vertical={false} />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.4)" fontSize={8} tickLine={false} />
                  <YAxis stroke="rgba(255,255,255,0.3)" fontSize={8} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f0f0f', borderRadius: '8px', borderColor: 'rgba(239, 68, 68, 0.2)', fontSize: '11px', color: '#fff' }}
                  />
                  <Bar dataKey="Ratio" fill="url(#deliveryPinkGlow)" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top 8 Expensive Areas */}
          <div className="glass-card p-4 rounded-2xl border border-white/5 flex flex-col shadow-xl flex-1">
            <div className="mb-2">
              <h4 className="text-sm font-display font-bold text-white tracking-wide">Avg cost by area — top 8 most expensive</h4>
              <p className="text-[11px] mono text-neutral-400">Luxury nodes pricing baseline (INR)</p>
            </div>

            <div className="h-[140px] w-full mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={expensiveAreasData}
                  margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
                >
                  <defs>
                    <linearGradient id="goldGradientGlow" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.85}/>
                      <stop offset="100%" stopColor="#b45309" stopOpacity={0.25}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" horizontal={false} />
                  <XAxis type="number" stroke="rgba(255,255,255,0.3)" fontSize={8} tickLine={false} />
                  <YAxis dataKey="name" type="category" stroke="rgba(255,255,255,0.4)" fontSize={8} width={70} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f0f0f', borderRadius: '8px', borderColor: 'rgba(245, 158, 11, 0.2)', fontSize: '11px', color: '#fff' }}
                  />
                  <Bar dataKey="Cost" fill="url(#goldGradientGlow)" radius={[0, 3, 3, 0]} barSize={8} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
