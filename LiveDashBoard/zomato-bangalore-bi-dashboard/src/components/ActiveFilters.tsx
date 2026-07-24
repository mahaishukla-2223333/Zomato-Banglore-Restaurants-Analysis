import React from 'react';
import { Filter, RotateCcw, MapPin, UtensilsCrossed, IndianRupee, Layers } from 'lucide-react';
import { AREAS, CUISINES, COST_RANGES, TYPES } from '../data';
import { DashboardFilters } from '../types';

interface ActiveFiltersProps {
  filters: DashboardFilters;
  onChange: (filters: DashboardFilters) => void;
  onReset: () => void;
}

export default function ActiveFilters({ filters, onChange, onReset }: ActiveFiltersProps) {
  const handleSelectChange = (key: keyof DashboardFilters, value: string) => {
    onChange({
      ...filters,
      [key]: value
    });
  };

  return (
    <div className="w-full glass-card p-4 rounded-2xl border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl z-20">
      {/* Search Header */}
      <div className="flex items-center gap-2.5">
        <div className="p-2.5 rounded-xl bg-gradient-to-tr from-red-650/15 via-purple-650/10 to-transparent text-red-500 border border-red-500/20">
          <Filter className="w-5 h-5 animate-pulse" />
        </div>
        <div>
          <h3 className="text-sm font-display font-bold text-white tracking-wide">Interactive Dataset Filters</h3>
          <p className="text-[11px] mono text-neutral-400">Filter Zomato Bangalore restaurant records by area, cuisine, cost, and type</p>
        </div>
      </div>

      {/* Selectors */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 flex-1 max-w-4xl">
        {/* Area */}
        <div className="relative group">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-red-500 transition-colors">
            <MapPin className="w-4 h-4" />
          </div>
          <select
            value={filters.area}
            onChange={(e) => handleSelectChange('area', e.target.value)}
            className="w-full bg-neutral-950/90 text-neutral-200 pl-9 pr-3 py-2 text-xs rounded-xl border border-white/10 focus:border-red-500/50 focus:outline-none transition-all cursor-pointer appearance-none hover:bg-neutral-900"
          >
            <option value="All">Area: All Bangalore</option>
            {AREAS.map((a) => (
              <option key={a} value={a}>
                {a.length > 22 ? `${a.slice(0, 20)}...` : a}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none border-l border-r border-t border-transparent border-t-neutral-500 w-0 h-0" />
        </div>

        {/* Cuisine */}
        <div className="relative group">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-yellow-500 transition-colors">
            <UtensilsCrossed className="w-4 h-4" />
          </div>
          <select
            value={filters.cuisine}
            onChange={(e) => handleSelectChange('cuisine', e.target.value)}
            className="w-full bg-neutral-950/90 text-neutral-200 pl-9 pr-3 py-2 text-xs rounded-xl border border-white/10 focus:border-yellow-500/50 focus:outline-none transition-all cursor-pointer appearance-none hover:bg-neutral-900"
          >
            <option value="All">Cuisine: All Food</option>
            {CUISINES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Cost Range */}
        <div className="relative group">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-purple-500 transition-colors">
            <IndianRupee className="w-4 h-4" />
          </div>
          <select
            value={filters.costRange}
            onChange={(e) => handleSelectChange('costRange', e.target.value)}
            className="w-full bg-neutral-950/90 text-neutral-200 pl-9 pr-3 py-2 text-xs rounded-xl border border-white/10 focus:border-purple-500/50 focus:outline-none transition-all cursor-pointer appearance-none hover:bg-neutral-900"
          >
            {COST_RANGES.map((cr) => (
              <option key={cr} value={cr}>
                {cr === "All" ? "Cost Range: All" : cr}
              </option>
            ))}
          </select>
        </div>

        {/* Service Type */}
        <div className="relative group">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-red-400 transition-colors">
            <Layers className="w-4 h-4" />
          </div>
          <select
            value={filters.restaurantType}
            onChange={(e) => handleSelectChange('restaurantType', e.target.value)}
            className="w-full bg-neutral-950/90 text-neutral-200 pl-9 pr-3 py-2 text-xs rounded-xl border border-white/10 focus:border-red-500/50 focus:outline-none transition-all cursor-pointer appearance-none hover:bg-neutral-900"
          >
            {TYPES.map((t) => (
              <option key={t} value={t}>
                {t === "All" ? "Type: All Service" : `Type: ${t}`}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Reset Button */}
      <button
        onClick={onReset}
        className="px-4 py-2 text-xs mono font-medium rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md hover:border-red-500/40 active:scale-95"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        Reset Filter
      </button>
    </div>
  );
}
