import React from 'react';
import { motion } from 'motion/react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, Legend } from 'recharts';
import { TrendingUp, Landmark, ShieldCheck, Heart, CircleDot } from 'lucide-react';

interface PriceRatingViewProps {
  stats: any;
}

export default function PriceRatingView({ stats }: PriceRatingViewProps) {
  
  // Format cost distribution
  const priceDistData = stats.costDistribution.map((item: any) => ({
    name: item.range,
    Restaurants: item.count
  }));

  // Format booking comparison
  const bookingComparisonData = [
    {
      name: 'Has Table Booking',
      Rating: stats.ratingWithBooking,
      color: '#8b5cf6'
    },
    {
      name: 'No Table Booking',
      Rating: stats.ratingWithoutBooking,
      color: '#3b82f6'
    }
  ];

  // Stacked horizontal bar slice data matching the purple-and-blue Zomato rating categories
  const categorySplit = stats.ratingCategoryBreakdown;
  const ratingBreakdownData = [
    {
      name: 'All Restaurants',
      'Average': categorySplit.average,
      'Below Average': categorySplit.belowAvg,
      'Excellent': categorySplit.excellent,
      'Good': categorySplit.good,
      'Very Good': categorySplit.veryGood
    }
  ];

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-white/5">
        <div>
          <h2 className="text-xl font-display font-black text-white tracking-tight flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-red-500" /> Price & Rating Analysis — Does Expensive Mean Better?
          </h2>
          <p className="text-xs mono text-neutral-400 mt-1">
            "Analyzing the relationship between restaurant pricing, customer ratings, and service quality across Bangalore restaurants"
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs mono bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
          <span className="text-neutral-400">Correlation Diagnostics</span>
        </div>
      </div>

      {/* GIFs KPI */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="glass-card p-4 rounded-2xl border-l-4 border-l-purple-500 flex flex-col justify-between shadow-lg relative overflow-hidden">
          <span className="text-[10px] mono tracking-wider text-neutral-400 uppercase">Price Rating Corr</span>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-2xl font-display font-black text-white">{stats.priceRatingCorr}</span>
          </div>
          <span className="text-xs text-purple-400 font-medium mt-1 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5 animate-pulse" /> Moderate Positive Corr
          </span>
        </div>

        {/* KPI 2 */}
        <div className="glass-card p-4 rounded-2xl border-l-4 border-l-red-500 flex flex-col justify-between shadow-lg relative overflow-hidden">
          <span className="text-[10px] mono tracking-wider text-neutral-400 uppercase">Median Cost</span>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-2xl font-display font-black text-white">₹{stats.medianCost}</span>
          </div>
          <span className="text-xs text-red-500 font-medium mt-1">
            Sufficient mid-market density
          </span>
        </div>

        {/* KPI 3 */}
        <div className="glass-card p-4 rounded-2xl border-l-4 border-l-purple-400 flex flex-col justify-between shadow-lg relative overflow-hidden">
          <span className="text-[10px] mono tracking-wider text-neutral-400 uppercase">Rating With Booking</span>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-2xl font-display font-black text-white">{stats.ratingWithBooking}</span>
            <span className="text-xs mono text-yellow-500">&#9733;</span>
          </div>
          <span className="text-xs text-purple-400 font-medium mt-1">
            Higher premium satisfaction
          </span>
        </div>

        {/* KPI 4 */}
        <div className="glass-card p-4 rounded-2xl border-l-4 border-l-red-400 flex flex-col justify-between shadow-lg relative overflow-hidden">
          <span className="text-[10px] mono tracking-wider text-neutral-400 uppercase">Rating Without Booking</span>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-2xl font-display font-black text-white">{stats.ratingWithoutBooking}</span>
            <span className="text-xs mono text-yellow-500">&#9733;</span>
          </div>
          <span className="text-xs text-red-400 font-medium mt-1">
            Standard high density base
          </span>
        </div>
      </div>

      {/* Distribution block */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Cost distribution */}
        <div className="glass-card p-5 rounded-2xl border border-white/5 lg:col-span-7 flex flex-col shadow-xl">
          <div className="mb-4">
            <h4 className="text-sm font-display font-bold text-white tracking-wide">Price distribution — all {stats.totalRestaurants.toLocaleString()} restaurants</h4>
            <p className="text-[11px] mono text-neutral-400 mt-0.5">High volume concentration around ₹200-₹400 budget tiers</p>
          </div>

          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={priceDistData}
                margin={{ top: 10, right: 10, left: -20, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="brownGradientGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#991b1b" stopOpacity={0.95}/>
                    <stop offset="100%" stopColor="#450a0a" stopOpacity={0.45}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.4)" fontSize={9} tickLine={false} />
                <YAxis stroke="rgba(255,255,255,0.3)" fontSize={9} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f0f0f', borderRadius: '8px', borderColor: 'rgba(239, 68, 68, 0.2)', fontSize: '11px', color: '#fff' }}
                />
                <Bar dataKey="Restaurants" fill="url(#brownGradientGlow)" radius={[4, 4, 0, 0]} barSize={42}>
                  {priceDistData.map((entry: any, index: number) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.name === '200-400' ? '#ef4444' : 'url(#brownGradientGlow)'} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Table Booking t-test impact */}
        <div className="glass-card p-5 rounded-2xl border border-white/5 lg:col-span-5 flex flex-col shadow-xl">
          <div className="mb-4">
            <h4 className="text-sm font-display font-bold text-white tracking-wide">Impact of Table Booking on Customer Ratings</h4>
            <p className="text-[11px] mono text-neutral-400 mt-0.5">t-test p &lt; 0.05 — statistically significant +0.59 gap</p>
          </div>

          <div className="h-[200px] w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={bookingComparisonData}
                margin={{ top: 15, right: 20, left: -25, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.4)" fontSize={9} tickLine={false} />
                <YAxis domain={[0, 5]} stroke="rgba(255,255,255,0.3)" fontSize={9} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f0f0f', borderRadius: '8px', borderColor: 'rgba(255,255,255,0.1)', fontSize: '11px', color: '#fff' }}
                />
                <Bar dataKey="Rating" radius={[4, 4, 0, 0]} barSize={45}>
                  {bookingComparisonData.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Rating Category Breakdown Horizontal stacked map */}
        <div className="glass-card p-5 rounded-2xl border border-white/5 lg:col-span-12 flex flex-col shadow-xl">
          <div className="mb-2">
            <h4 className="text-sm font-display font-bold text-white tracking-wide">Rating category breakdown</h4>
            <p className="text-[11px] mono text-neutral-400">Horizontal segment map matching Zomato customer reviews</p>
          </div>

          <div className="h-[120px] w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={ratingBreakdownData}
                margin={{ top: 10, right: 5, left: -25, bottom: 5 }}
              >
                <XAxis type="number" stroke="rgba(255,255,255,0.3)" fontSize={9} tickLine={false} unit="%" />
                <YAxis dataKey="name" type="category" stroke="rgba(255,255,255,0.4)" fontSize={9} tickLine={false} width={80} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f0f0f', borderRadius: '8px', borderColor: 'rgba(255,255,255,0.1)', fontSize: '11px', color: '#fff' }}
                />
                <Legend 
                  verticalAlign="top" 
                  height={32} 
                  iconSize={8}
                  wrapperStyle={{ fontSize: '10px', color: '#fff', opacity: 0.8 }}
                />
                <Bar dataKey="Average" stackId="a" fill="#3b82f6" />
                <Bar dataKey="Below Average" stackId="a" fill="#1e3a8a" />
                <Bar dataKey="Excellent" stackId="a" fill="#f59e0b" />
                <Bar dataKey="Good" stackId="a" fill="#8b5cf6" />
                <Bar dataKey="Very Good" stackId="a" fill="#db2777" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}
