import React from 'react';
import { motion } from 'motion/react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, Legend } from 'recharts';
import { Flag, Trophy, ShieldAlert, Sparkles, TrendingUp } from 'lucide-react';

interface MarketStrategyViewProps {
  stats: any;
}

export default function MarketStrategyView({ stats }: MarketStrategyViewProps) {
  
  // Format data for Segment comparisons
  const avgRatingData = stats.segmentsData.map((seg: any) => ({
    name: seg.name,
    Rating: seg.avgRating
  }));

  const avgReviewsData = stats.segmentsData.map((seg: any) => ({
    name: seg.name,
    Reviews: seg.avgReviews
  }));

  const totalReviewsData = stats.segmentsData.map((seg: any) => ({
    name: seg.name.slice(0, 9), // limit name
    Reviews: Math.round(seg.avgReviews * (seg.restaurantCount / 30)) // proportional representation of total impact
  }));

  // Feature Importance data
  const featureImportance = [
    { name: 'num_ratings', Importance: 80 },
    { name: 'avg_cost', Importance: 15 },
    { name: 'has_online_order', Importance: 3.5 },
    { name: 'has_table_booking', Importance: 1.5 }
  ];

  // Restaurant count by segment
  const countBySegmentData = stats.segmentsData.map((seg: any) => ({
    name: seg.name,
    Count: seg.restaurantCount
  }));

  return (
    <div className="space-y-6">
      {/* View Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-white/5">
        <div>
          <h2 className="text-xl font-display font-black text-white tracking-tight flex items-center gap-2">
            <Flag className="w-5 h-5 text-red-500" /> Market Segments & Strategy
          </h2>
          <p className="text-xs mono text-neutral-400 mt-1">
            "Business opportunities, customer behavior, and restaurant segment analysis"
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs mono bg-white/5 pl-3 pr-4 py-1.5 rounded-full border border-white/5">
          <span className="text-neutral-400">Strategic Performance</span>
        </div>
      </div>

      {/* Segment Cards Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Luxury Card */}
        <div className="glass-card p-4 rounded-2xl border-t-4 border-t-purple-500 relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-display font-black text-purple-400">Luxury Premium</h4>
            <Trophy className="w-5 h-5 text-purple-400" />
          </div>
          <div className="mt-4 space-y-1.55">
            <p className="text-xs text-neutral-400 flex justify-between">
              <span>Count:</span> <span className="mono text-neutral-200">{stats.segmentsData[0]?.restaurantCount} restaurants</span>
            </p>
            <p className="text-xs text-neutral-400 flex justify-between">
              <span>Avg Rating:</span> <span className="mono text-neutral-200">{stats.segmentsData[0]?.avgRating} &#9733;</span>
            </p>
            <p className="text-xs text-neutral-400 flex justify-between">
              <span>Avg Reviews:</span> <span className="mono text-neutral-200">{stats.segmentsData[0]?.avgReviews} reviews avg</span>
            </p>
          </div>
          <div className="mt-4 pt-2.5 border-t border-white/5 text-[11px] text-purple-300 mono">
            High cost baseline, high retention
          </div>
        </div>

        {/* Mid-Range Card */}
        <div className="glass-card p-4 rounded-2xl border-t-4 border-t-red-500 relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-display font-black text-red-400">Mid-Range</h4>
            <Sparkles className="w-5 h-5 text-red-400" />
          </div>
          <div className="mt-4 space-y-1.5">
            <p className="text-xs text-neutral-400 flex justify-between">
              <span>Count:</span> <span className="mono text-neutral-200">{stats.segmentsData[1]?.restaurantCount} restaurants</span>
            </p>
            <p className="text-xs text-neutral-400 flex justify-between">
              <span>Avg Rating:</span> <span className="mono text-neutral-200">{stats.segmentsData[1]?.avgRating} &#9733;</span>
            </p>
            <p className="text-xs text-neutral-400 flex justify-between">
              <span>Avg Reviews:</span> <span className="mono text-neutral-200">{stats.segmentsData[1]?.avgReviews} reviews avg</span>
            </p>
          </div>
          <div className="mt-4 pt-2.5 border-t border-white/5 text-[11px] text-red-400 mono">
            Perfect balance point of scale
          </div>
        </div>

        {/* Budget-Friendly Card */}
        <div className="glass-card p-4 rounded-2xl border-t-4 border-t-yellow-500 relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-display font-black text-yellow-500">Budget-Friendly</h4>
            <ShieldAlert className="w-5 h-5 text-yellow-500" />
          </div>
          <div className="mt-4 space-y-1.5">
            <p className="text-xs text-neutral-400 flex justify-between flex-row">
              <span>Count:</span> <span className="mono text-neutral-200">{stats.segmentsData[2]?.restaurantCount} restaurants</span>
            </p>
            <p className="text-xs text-neutral-400 flex justify-between flex-row">
              <span>Avg Rating:</span> <span className="mono text-neutral-200">{stats.segmentsData[2]?.avgRating} &#9733;</span>
            </p>
            <p className="text-xs text-neutral-400 flex justify-between flex-row">
              <span>Avg Reviews:</span> <span className="mono text-neutral-200">{stats.segmentsData[2]?.avgReviews} reviews avg</span>
            </p>
          </div>
          <div className="mt-4 pt-2.5 border-t border-white/5 text-[11px] text-yellow-400 mono">
            High volume density, low cost margin
          </div>
        </div>
      </div>

      {/* Main Charts area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Chart 1: Average Rating by Segment */}
        <div className="glass-card p-4 rounded-2xl border border-white/5 lg:col-span-4 flex flex-col shadow-xl">
          <div className="mb-2">
            <h4 className="text-xs font-display font-bold text-white tracking-wide uppercase">Average Rating by Segment</h4>
            <p className="text-[10px] mono text-neutral-400 mt-0.5">High rating skew on luxury tiers</p>
          </div>

          <div className="h-[160px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={avgRatingData}
                margin={{ top: 10, right: 10, left: -25, bottom: 5 }}
              >
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.4)" fontSize={8} tickLine={false} />
                <YAxis domain={[0, 4.5]} stroke="rgba(255,255,255,0.3)" fontSize={8} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f0f0f', borderRadius: '8px', borderColor: 'rgba(239, 68, 68, 0.25)', fontSize: '11px', color: '#fff' }}
                />
                <Bar dataKey="Rating" radius={[4, 4, 0, 0]} barSize={32}>
                  <Cell fill="#c084fc" />
                  <Cell fill="#f87171" />
                  <Cell fill="#fbbf24" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Average reviews per restaurant */}
        <div className="glass-card p-4 rounded-2xl border border-white/5 lg:col-span-4 flex flex-col shadow-xl">
          <div className="mb-2">
            <h4 className="text-xs font-display font-bold text-white tracking-wide uppercase">Average reviews per restaurant</h4>
            <p className="text-[10px] mono text-neutral-400 mt-0.5">Statistical customer engagement density</p>
          </div>

          <div className="h-[160px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={avgReviewsData}
                margin={{ top: 10, right: 10, left: -25, bottom: 5 }}
              >
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.4)" fontSize={8} tickLine={false} />
                <YAxis stroke="rgba(255,255,255,0.3)" fontSize={8} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f0f0f', borderRadius: '8px', borderColor: 'rgba(239, 68, 68, 0.25)', fontSize: '11px', color: '#fff' }}
                />
                <Bar dataKey="Reviews" radius={[4, 4, 0, 0]} barSize={32}>
                  <Cell fill="#c084fc" />
                  <Cell fill="#f87171" />
                  <Cell fill="#fbbf24" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Average Reviews by Segment */}
        <div className="glass-card p-4 rounded-2xl border border-white/5 lg:col-span-4 flex flex-col shadow-xl">
          <div className="mb-2">
            <h4 className="text-xs font-display font-bold text-white tracking-wide uppercase">Average Reviews by Segment</h4>
            <p className="text-[10px] mono text-neutral-400 mt-0.5">Overall reviews volume distributed proportionally</p>
          </div>

          <div className="h-[160px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={totalReviewsData}
                margin={{ top: 10, right: 10, left: -25, bottom: 5 }}
              >
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.4)" fontSize={8} tickLine={false} />
                <YAxis stroke="rgba(255,255,255,0.3)" fontSize={8} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f0f0f', borderRadius: '8px', borderColor: 'rgba(239, 68, 68, 0.25)', fontSize: '11px', color: '#fff' }}
                />
                <Bar dataKey="Reviews" radius={[4, 4, 0, 0]} barSize={32}>
                  <Cell fill="#c084fc" />
                  <Cell fill="#f87171" />
                  <Cell fill="#fbbf24" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Feature Importance Panel (Bottom Left) */}
        <div className="glass-card p-5 rounded-2xl border border-white/5 lg:col-span-6 flex flex-col shadow-xl">
          <div className="mb-3">
            <h4 className="text-sm font-display font-bold text-white tracking-wide">Feature importance — what drives ratings?</h4>
            <p className="text-[11px] mono text-neutral-400">Statistical relative impact coefficient percentages</p>
          </div>

          <div className="h-[160px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={featureImportance}
                margin={{ top: 5, right: 25, left: 25, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="purpleGradientGlow" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#c084fc" stopOpacity={0.85}/>
                    <stop offset="100%" stopColor="#7c3aed" stopOpacity={0.25}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" horizontal={false} />
                <XAxis type="number" stroke="rgba(255,255,255,0.3)" fontSize={8} tickLine={false} unit="%" />
                <YAxis dataKey="name" type="category" stroke="rgba(255,255,255,0.4)" fontSize={8} tickLine={false} width={85} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f0f0f', borderRadius: '8px', borderColor: 'rgba(139, 92, 246, 0.2)', fontSize: '11px', color: '#fff' }}
                />
                <Bar dataKey="Importance" fill="url(#purpleGradientGlow)" radius={[0, 4, 4, 0]} barSize={10} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Restaurant Count by Segment (Bottom Right) */}
        <div className="glass-card p-5 rounded-2xl border border-white/5 lg:col-span-6 flex flex-col shadow-xl">
          <div className="mb-3">
            <h4 className="text-sm font-display font-bold text-white tracking-wide">Restaurant Count by Segment</h4>
            <p className="text-[11px] mono text-neutral-400">Comparing pure density baseline volume sets</p>
          </div>

          <div className="h-[160px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={countBySegmentData}
                margin={{ top: 10, right: 10, left: -25, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="segmentCountGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.85}/>
                    <stop offset="100%" stopColor="#0284c7" stopOpacity={0.25}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" vertical={false} />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.4)" fontSize={8} tickLine={false} />
                <YAxis stroke="rgba(255,255,255,0.3)" fontSize={8} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f0f0f', borderRadius: '8px', borderColor: 'rgba(2, 132, 199, 0.2)', fontSize: '11px', color: '#fff' }}
                />
                <Bar dataKey="Count" fill="url(#segmentCountGlow)" radius={[4, 4, 0, 0]} barSize={36} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}
