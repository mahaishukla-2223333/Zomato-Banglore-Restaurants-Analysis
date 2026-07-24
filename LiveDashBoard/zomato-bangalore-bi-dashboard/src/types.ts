export interface Restaurant {
  id: string;
  name: string;
  area: string;
  cuisine: string;
  rating: number;
  cost: number;
  reviewsCount: number;
  hasOnlineOrder: boolean;
  hasTableBooking: boolean;
  segment: 'Luxury Premium' | 'Mid-Range' | 'Budget-Friendly';
  type: 'Dine-out' | 'Delivery' | 'Buffet' | 'Cafes';
}

export interface DashboardFilters {
  area: string;
  cuisine: string;
  costRange: string;
  restaurantType: string;
}

export interface AreaStat {
  name: string;
  restaurantCount: number;
  avgRating: number;
  avgCost: number;
  onlineOrderPct: number;
}

export interface CuisineStat {
  name: string;
  restaurantCount: number;
  avgRating: number;
  avgCost: number;
}

export interface SegmentStat {
  name: 'Luxury Premium' | 'Mid-Range' | 'Budget-Friendly';
  restaurantCount: number;
  avgRating: number;
  avgCost: number;
  avgReviews: number;
}
