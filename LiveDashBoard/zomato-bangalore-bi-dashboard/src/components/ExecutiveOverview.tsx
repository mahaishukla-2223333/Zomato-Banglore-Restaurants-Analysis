import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Store, Star, Flame, Sparkles, LayoutGrid, CheckCircle, Smartphone } from 'lucide-react';

interface ExecutiveOverviewProps {
  stats: any;
}

export default function ExecutiveOverview({ stats }: ExecutiveOverviewProps) {
  const [activePieIndex, setActivePieIndex] = useState<number | null>(null);

  // Segment colors matching blackish, reddish, yellowish, purplish
  const COLORS = ['#a855f7', '#ef4444', '#fbbf24']; // Luxury Premium (purple), Mid-Range (red), Budget (yellow)

  // Pie chart data
  const pieData = stats.segmentsData.map((seg: any) => ({
    name: seg.name,
    value: seg.restaurantCount,
    percentage: seg.percentage
  }));

  // Top 5 Areas by restaurant count formatted for horizontal bar chart
  const areaChartData = stats.areasByCount.map((a: any) => ({
    name: a.name.split(',')[0], // simplify name
    count: a.restaurantCount
  }));

  // Service adoption chart
  const serviceAdoptionData = [
    {
      name: 'Online Order',
      'Available': stats.onlineOrderPct,
      'Not Available': Number((100 - stats.onlineOrderPct).toFixed(2))
    },
    {
      name: 'Table Booking',
      'Available': stats.tableBookingPct,
      'Not Available': Number((100 - stats.tableBookingPct).toFixed(2))
    }
  ];

  return (
    <div className="space-y-6">
      {/* View Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-white/5">
        <div>
          <h2 className="text-xl font-display font-black text-white tracking-tight flex items-center gap-2">
            <LayoutGrid className="w-5 h-5 text-red-500" /> Zomato Bangalore — Business Intelligence Dashboard
          </h2>
          <p className="text-xs mono text-neutral-400 mt-1">
            "Real-time insights into restaurant performance, customer behavior, cuisine trends, and delivery analytics"
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs mono bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
          <span className="text-neutral-400">Overall Statistics</span>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        {/* Card 1 */}
        <div className="glass-card p-3 rounded-2xl border border-white/5 flex flex-col items-center justify-center text-center shadow-md relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-[3px] bg-red-500 opacity-60" />
          <span className="text-[10px] mono tracking-wider text-neutral-400 uppercase">Total Restaurants</span>
          <span className="text-xl font-display font-black text-white mt-1">{stats.totalRestaurants.toLocaleString()}</span>
          <span className="text-[9px] mono text-neutral-500 mt-0.5">Active Pool</span>
        </div>

        {/* Card 2 */}
        <div className="glass-card p-3 rounded-2xl border border-white/5 flex flex-col items-center justify-center text-center shadow-md relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-[3px] bg-yellow-500 opacity-60" />
          <span className="text-[10px] mono tracking-wider text-neutral-400 uppercase">Avg Rating</span>
          <span className="text-xl font-display font-black text-white mt-1 flex items-center gap-0.5 justify-center">
            {stats.avgRating} <span className="text-xs text-yellow-500">&#9733;</span>
          </span>
          <span className="text-[9px] mono text-neutral-500 mt-0.5">High Stability</span>
        </div>

        {/* Card 3 */}
        <div className="glass-card p-3 rounded-2xl border border-white/5 flex flex-col items-center justify-center text-center shadow-md relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-[3px] bg-purple-500 opacity-60" />
          <span className="text-[10px] mono tracking-wider text-neutral-400 uppercase">Avg Cost</span>
          <span className="text-xl font-display font-black text-white mt-1">₹{stats.avgCost}</span>
          <span className="text-[9px] mono text-neutral-500 mt-0.5">Per 2 Diners</span>
        </div>

        {/* Card 4 */}
        <div className="glass-card p-3 rounded-2xl border border-white/5 flex flex-col items-center justify-center text-center shadow-md relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-[3px] bg-red-400 opacity-60" />
          <span className="text-[10px] mono tracking-wider text-neutral-400 uppercase">Count of Area</span>
          <span className="text-xl font-display font-black text-white mt-1">{stats.countOfAreas}</span>
          <span className="text-[9px] mono text-neutral-500 mt-0.5">Key Nodes</span>
        </div>

        {/* Card 5 */}
        <div className="glass-card p-3 rounded-2xl border border-white/5 flex flex-col items-center justify-center text-center shadow-md relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-[3px] bg-purple-600 opacity-60" />
          <span className="text-[10px] mono tracking-wider text-neutral-400 uppercase">Table Booking %</span>
          <span className="text-xl font-display font-black text-white mt-1">{stats.tableBookingPct}%</span>
          <span className="text-[9px] mono text-red-500 font-semibold mt-0.5">Real-time stats</span>
        </div>

        {/* Card 6 */}
        <div className="glass-card p-3 rounded-2xl border border-white/5 flex flex-col items-center justify-center text-center shadow-md relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-[3px] bg-yellow-600 opacity-60" />
          <span className="text-[10px] mono tracking-wider text-neutral-400 uppercase">Total Cuisines</span>
          <span className="text-xl font-display font-black text-white mt-1">{stats.countOfCuisines}</span>
          <span className="text-[9px] mono text-neutral-500 mt-0.5">Categories</span>
        </div>
      </div>

      {/* Main Charts Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Chart 1: Market Segments Donut */}
        <div className="glass-card p-4 rounded-2xl border border-white/5 lg:col-span-5 flex flex-col shadow-xl">
          <div className="mb-2">
            <h4 className="text-sm font-display font-bold text-white tracking-wide">Market segments</h4>
            <p className="text-[11px] mono text-neutral-400">KMeans clustering — 3 tiers found</p>
          </div>
          
          <div className="h-[180px] w-full flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="42%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={65}
                  paddingAngle={4}
                  dataKey="value"
                  onMouseEnter={(_, idx) => setActivePieIndex(idx)}
                  onMouseLeave={() => setActivePieIndex(null)}
                >
                  {pieData.map((entry: any, index: number) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]} 
                      stroke="rgba(0,0,0,0.4)" 
                      strokeWidth={2}
                      style={{
                        filter: activePieIndex === index ? 'drop-shadow(0 0 8px rgba(239, 68, 68, 0.4))' : 'none',
                        transition: 'all 0.3s ease'
                      }}
                    />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0f0f0f', 
                    borderRadius: '8px', 
                    borderColor: 'rgba(255,255,255,0.1)',
                    fontSize: '11px',
                    color: '#fff' 
                  }}
                  formatter={(val: number) => [`${val.toLocaleString()} Restaurants`, 'Volume']}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Custom overlay stats positioned nicely on the right inside our flex container */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2.5">
              {pieData.map((d: any, i: number) => (
                <div key={d.name} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                  <div className="flex flex-col">
                    <span className="text-[11px] font-medium text-neutral-200 leading-none">{d.name}</span>
                    <span className="text-[9px] mono text-neutral-400 mt-0.5">{d.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chart 2: Top 5 Areas by Restaurant Count */}
        <div className="glass-card p-4 rounded-2xl border border-white/5 lg:col-span-7 flex flex-col shadow-xl">
          <div className="mb-2">
            <h4 className="text-sm font-display font-bold text-white tracking-wide">Top 5 areas by restaurant count</h4>
            <p className="text-[11px] mono text-neutral-400">Brigade Road leads on quality · BTM on volume</p>
          </div>

          <div className="h-[180px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={areaChartData}
                margin={{ top: 5, right: 25, left: 20, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="redGradientGlow" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity={0.8}/>
                    <stop offset="100%" stopColor="#991b1b" stopOpacity={0.2}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" horizontal={false} />
                <XAxis type="number" stroke="rgba(255,255,255,0.3)" fontSize={9} tickLine={false} />
                <YAxis dataKey="name" type="category" stroke="rgba(255,255,255,0.4)" fontSize={9} width={80} tickLine={false} />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                  contentStyle={{ backgroundColor: '#0f0f0f', borderRadius: '8px', borderColor: 'rgba(239, 68, 68, 0.2)', fontSize: '11px', color: '#fff' }}
                />
                <Bar dataKey="count" fill="url(#redGradientGlow)" radius={[0, 4, 4, 0]} barSize={14}>
                  {areaChartData.map((_: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#ef4444' : 'url(#redGradientGlow)'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Restaurant Rating Distribution (Big Histogram) */}
        <div className="glass-card p-4 rounded-2xl border border-white/5 lg:col-span-7 flex flex-col shadow-xl">
          <div className="mb-2">
            <h4 className="text-sm font-display font-bold text-white tracking-wide">Restaurant Rating Distribution</h4>
            <p className="text-[11px] mono text-neutral-400">Comparing sample distribution across standard 2.5-5.0 bins</p>
          </div>

          <div className="h-[210px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={stats.ratingDistribution}
                margin={{ top: 10, right: 10, left: -20, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="ratingGradientGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity={0.85}/>
                    <stop offset="100%" stopColor="#ef4444" stopOpacity={0.2}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.4)" fontSize={9} tickLine={false} />
                <YAxis stroke="rgba(255,255,255,0.3)" fontSize={9} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f0f0f', borderRadius: '8px', borderColor: 'rgba(239, 68, 68, 0.2)', fontSize: '11px', color: '#fff' }}
                  formatter={(val: number) => [`${val} Restaurants`, 'Rating Count']}
                />
                <Bar dataKey="restaurantCount" fill="url(#ratingGradientGlow)" radius={[4, 4, 0, 0]} barSize={42} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: Service adoption stacked bars */}
        <div className="glass-card p-4 rounded-2xl border border-white/5 lg:col-span-5 flex flex-col shadow-xl">
          <div>
            <h4 className="text-sm font-display font-bold text-white tracking-wide">Service adoption</h4>
            <p className="text-[11px] mono text-neutral-400">Online order vs table booking availability</p>
          </div>

          <div className="h-[210px] w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={serviceAdoptionData}
                margin={{ top: 10, right: 5, left: -20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.4)" fontSize={9} tickLine={false} />
                <YAxis unit="%" stroke="rgba(255,255,255,0.3)" fontSize={9} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f0f0f', borderRadius: '8px', borderColor: 'rgba(255,255,255,0.1)', fontSize: '11px', color: '#fff' }}
                />
                <Legend 
                  verticalAlign="top" 
                  height={32} 
                  iconSize={8}
                  wrapperStyle={{ fontSize: '10px', color: '#fff', opacity: 0.8 }}
                />
                <Bar dataKey="Available" stackId="a" fill="#3b82f6" radius={[0, 0, 0, 0]} barSize={42} />
                <Bar dataKey="Not Available" stackId="a" fill="#8b5cf6" radius={[4, 4, 0, 0]} barSize={42} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}
