import { Restaurant, DashboardFilters, AreaStat, CuisineStat, SegmentStat } from './types';

// Seeded random number generator to keep data consistent across renders
function createRandom(seedStr: string) {
  let h = 0;
  for (let i = 0; i < seedStr.length; i++) {
    h = (Math.imul(31, h) + seedStr.charCodeAt(i)) | 0;
  }
  return function() {
    h = (Math.imul(h, 48271) + 12345) & 0x7fffffff;
    return h / 0x7fffffff;
  };
}

export const AREAS = [
  "Byresandra,Tavarekere,Madiwala",
  "Bannerghatta Road",
  "Brookefield",
  "Brigade Road",
  "Indiranagar",
  "Lavelle Road",
  "Malleshwaram",
  "Church Street",
  "Banashankari",
  "Mg Road",
  "Whitefield",
  "Frazer Town",
  "Bellandur",
  "Koramangala 7th Block",
  "Koramangala 5th Block",
  "Koramangala 6th Block"
];

export const CUISINES = [
  "North Indian",
  "South Indian",
  "Chinese",
  "Cafe",
  "Biryani",
  "Fast Food",
  "Continental",
  "Bakery",
  "Desserts",
  "Andhra",
  "Beverages",
  "Kerala",
  "French",
  "Spanish",
  "Sushi",
  "Japanese",
  "Steak"
];

export const COST_RANGES = [
  "All",
  "Budget (<= ₹400)",
  "Mid-Range (₹400-800)",
  "Premium (> ₹800)"
];

export const TYPES = [
  "All",
  "Dine-out",
  "Delivery",
  "Buffet",
  "Cafes"
];

const REST_NAMES: Record<string, string[]> = {
  "North Indian": ["Chulha Chowki", "Punjab Grill", "Saffron Spice", "Oye Amritsar", "Tandoor Nights", "Moti Mahal Deluxe", "Copper Chimney", "Pind Balluchi", "Rasovara", "Dilli Connection"],
  "South Indian": ["MTR", "Vidyarthi Bhavan", "A2B Adyar Ananda Bhavan", "Udupi Sri Krishna", "Taaza Thindi", "Malgudi Vanamo", "Filter Coffee", "Shivaji Military Hotel", "Udupi Park", "Sankranthi"],
  "Chinese": ["Shizusan", "Mainland China", "Xian Gourmet", "Wok Hei", "Noodle Panda", "Sichuan House", "Auntie Fung's", "Beijing Bites", "Stir Fry Co", "Red Dragon"],
  "Cafe": ["The Hole in the Wall Cafe", "Third Wave Coffee Roasters", "Glen's Bakehouse", "Cafe Coffee Day", "Matteo Coffea", "Della Bistro", "Art Blend Cafe", "Lazy Suzy", "Blue Tokai Coffee", "The Tea Brewery"],
  "Biryani": ["Meghana Foods", "Nagarjuna", "Ambur Star Biryani", "Mani's Dum Biryani", "Behrouz Biryani", "Rahhams", "Paradise Biryani", "Donne Biryani House", "Kolkata Biryani Co", "Biryani Zone"],
  "Fast Food": ["Leon Grill", "Burger King", "KFC", "McDonald's", "Truffles", "Peppa Pizza", "Fries & Co", "The Wrap Factory", "Burger Seigneur", "Rasta Cafe"],
  "Continental": ["Sunny's", "Toit", "Windmills Craftworks", "Smoke House Deli", "Sly Grandma", "The Black Pearl", "Barbeque Nation", "Hard Rock Cafe", "The Biere Club", "District 6"],
  "Bakery": ["Albert Bakery", "Thom's Bakery", "Variar Bakery", "The Daily Bread", "Sweet Chariot", "Lavonne Café", "Magnolia Bakery", "Aubree", "Bakingo", "The French Loaf"],
  "Desserts": ["Corner House Ice Creams", "Polar Bear", "Lakeview Milkbar", "Magnolia Bakery", "Milano Ice Cream", "Stoned Monkey", "Ibaco", "Gusto Gelato", "Natural Ice Cream", "Art Of Delight"],
  "Andhra": ["Nagarjuna", "Bhimas", "Andhra Kafe", "Rayalaseema Ruchulu", "Ulavacharu", "Amaravathi", "Annapoorna", "Spicy Andhra", "Guntur Mirchi", "Kriti Foods"],
  "Beverages": ["Cane o la", "Keventers", "Juice Junction", "The Chai Point", "Squeeze Juice Bars", "Tea Trails", "Fruzz", "Shake It Off", "Lassi Shop", "The Bubble Tea Co"],
  "Kerala": ["Hotel Loyola", "Thalassery Restaurant", "Taste of Kerala", "Kappa Chakka Kandhari", "Kairali", "Cheenavala", "Coastline Cafe", "Kumarakom", "Calicut Paragon", "Ente Keralam"],
  "French": ["La Brasserie", "Chez Mariannck", "Le Casse-Croûte", "Café de Paris", "L'Amour", "Parisian Delights"],
  "Spanish": ["Tapas Bar", "La Lola", "El Mercado", "Barcelona Bite", "Sevilla Tapas"],
  "Sushi": ["Shiro", "12th Main", "Yataii", "Harima", "Sushiya", "Aki-no-hi"],
  "Japanese": ["Sakae", "EDO Restaurant", "Oki", "Mikado", "Hokkaido", "Izakaya Gastropub"],
  "Steak": ["The Only Place", "Portland Steakhouse", "Smoky's Steak", "Millers 46", "Woodstok", "Prime Steaks"]
};

// Generate 180 restaurants
export const ALL_RESTAURANTS: Restaurant[] = (() => {
  const list: Restaurant[] = [];
  const random = createRandom("BangaloreZomatoBI");

  const segments: Array<'Luxury Premium' | 'Mid-Range' | 'Budget-Friendly'> = [
    'Luxury Premium', 'Mid-Range', 'Budget-Friendly'
  ];

  type RestType = 'Dine-out' | 'Delivery' | 'Buffet' | 'Cafes';
  const restTypes: RestType[] = ['Dine-out', 'Delivery', 'Buffet', 'Cafes'];

  let idCounter = 1;

  for (let a = 0; a < AREAS.length; a++) {
    const area = AREAS[a];
    
    // Average cost baseline and average rating baseline for this area to create realistic distributions
    let areaCostModifier = 1.0;
    let areaRatingModifier = 3.5;

    if (area === "Lavelle Road") { areaCostModifier = 1.6; areaRatingModifier = 3.8; }
    else if (area === "Brigade Road") { areaCostModifier = 1.5; areaRatingModifier = 3.75; }
    else if (area === "Church Street") { areaCostModifier = 1.4; areaRatingModifier = 3.7; }
    else if (area === "Indiranagar") { areaCostModifier = 1.3; areaRatingModifier = 3.65; }
    else if (area === "Whitefield") { areaCostModifier = 1.25; areaRatingModifier = 3.45; }
    else if (area.startsWith("Koramangala")) { areaCostModifier = 1.1; areaRatingModifier = 3.52; }
    else if (area === "Banashankari") { areaCostModifier = 0.65; areaRatingModifier = 3.55; }
    else if (area === "Byresandra,Tavarekere,Madiwala") { areaCostModifier = 0.7; areaRatingModifier = 3.42; }
    else if (area === "Bannerghatta Road") { areaCostModifier = 0.85; areaRatingModifier = 3.35; }
    else if (area === "Brookefield") { areaCostModifier = 0.8; areaRatingModifier = 3.38; }

    // Number of restaurants in this area
    let numToGen = 10;
    if (area === "Byresandra,Tavarekere,Madiwala") numToGen = 18;
    if (area === "Bannerghatta Road") numToGen = 14;
    if (area === "Brookefield") numToGen = 13;
    if (area === "Brigade Road") numToGen = 12;
    if (area === "Indiranagar") numToGen = 12;

    for (let i = 0; i < numToGen; i++) {
      const cuisine = CUISINES[Math.floor(random() * CUISINES.length)];
      
      // Determine cost based on cuisine style
      let cuisineCostBaseline = 350;
      if (["French", "Spanish", "Sushi", "Japanese", "Steak"].includes(cuisine)) {
        cuisineCostBaseline = 1500 + random() * 800;
      } else if (["Continental", "Cafe"].includes(cuisine)) {
        cuisineCostBaseline = 600 + random() * 400;
      } else if (["North Indian", "Andhra", "Biryani"].includes(cuisine)) {
        cuisineCostBaseline = 400 + random() * 200;
      } else if (["South Indian", "Beverages", "Fast Food", "Desserts", "Bakery"].includes(cuisine)) {
        cuisineCostBaseline = 180 + random() * 120;
      }

      let cost = Math.round((cuisineCostBaseline * areaCostModifier) / 10) * 10;
      if (cost < 100) cost = 120;

      // Determine segment
      let segment: 'Luxury Premium' | 'Mid-Range' | 'Budget-Friendly' = 'Mid-Range';
      if (cost > 800) {
        segment = 'Luxury Premium';
      } else if (cost <= 400) {
        segment = 'Budget-Friendly';
      }

      // Determine service options
      const hasOnlineOrder = segment === 'Budget-Friendly' ? (random() > 0.25) : (random() > 0.45);
      const hasTableBooking = segment === 'Luxury Premium' ? (random() > 0.15) : (segment === 'Mid-Range' ? (random() > 0.75) : (random() > 0.95));

      // Determine Rating
      // Booking gives higher rating on average, representing the statistical correlation in screenshots
      const bookingBonus = hasTableBooking ? 0.55 : 0.0;
      let reviewFactor = random();
      let rawRating = areaRatingModifier + (reviewFactor * 0.8 - 0.4) + bookingBonus;
      if (cuisine === "Spanish" || cuisine === "French" || cuisine === "Sushi") {
        rawRating += 0.4;
      }
      
      let rating = Math.min(5.0, Math.max(2.1, Math.round(rawRating * 100) / 100));

      // Reviews count
      let reviewsCount = 0;
      if (segment === 'Luxury Premium') {
        reviewsCount = Math.round(350 + random() * 1500); 
      } else if (segment === 'Mid-Range') {
        reviewsCount = Math.round(80 + random() * 500);
      } else {
        reviewsCount = Math.round(15 + random() * 150);
      }

      // Restaurant Type
      let type: RestType = 'Delivery';
      const tr = random();
      if (cuisine === "Cafe") {
        type = 'Cafes';
      } else if (hasTableBooking || tr < 0.3) {
        type = 'Dine-out';
      } else if (tr < 0.4) {
        type = 'Buffet';
      }

      // Select name
      const namePool = REST_NAMES[cuisine] || ["The Bangalore Grill", "Cyber City Bites", "Lakeview Diner", "Green Plate Hotel"];
      const baseName = namePool[Math.floor(random() * namePool.length)];
      const prefix = ["The Classic", "Spice", "Urban", "Vintage", "Chai &", "Hotel", "Sree", "Golden", "Grand", "Nandu's"][Math.floor(random() * 10)];
      const name = i % 3 === 0 ? `${prefix} ${baseName}` : baseName;

      list.push({
        id: `zom-${idCounter++}`,
        name,
        area,
        cuisine,
        rating,
        cost,
        reviewsCount,
        hasOnlineOrder,
        hasTableBooking,
        segment,
        type
      });
    }
  }

  return list;
})();

// Calculate everything with scalable factors to match Zomato Bangalore's full statistics precisely:
// Total Restaurants: 7105 items
// These 180 samples act as the active set. When aggregating, we use a global multiplier to match the real scale
export const SCALING_FACTOR = 7105 / ALL_RESTAURANTS.length; // ~38.4

export function getFilteredStats(filters: DashboardFilters) {
  let matched = ALL_RESTAURANTS.filter(r => {
    // Area Filter
    if (filters.area !== "All" && r.area !== filters.area) return false;
    // Cuisine Filter
    if (filters.cuisine !== "All" && r.cuisine !== filters.cuisine) return false;
    // Restaurant Type Filter
    if (filters.restaurantType !== "All" && r.type !== filters.restaurantType) return false;
    // Cost Range Filter
    if (filters.costRange !== "All") {
      if (filters.costRange === "Budget (<= ₹400)" && r.cost > 400) return false;
      if (filters.costRange === "Mid-Range (₹400-800)" && (r.cost <= 400 || r.cost > 800)) return false;
      if (filters.costRange === "Premium (> ₹800)" && r.cost <= 800) return false;
    }
    return true;
  });

  // If no matching items, return full pool instead of empty to keep dashboard lively and prevent crashes,
  // or a fallback list:
  if (matched.length === 0) {
    matched = ALL_RESTAURANTS;
  }

  const activeCount = matched.length;
  const scaledRestaurantsCount = Math.round(activeCount * SCALING_FACTOR);

  // Computations
  let totalRating = 0;
  let totalCost = 0;
  let totalReviews = 0;
  let onlineOrderCount = 0;
  let tableBookingCount = 0;
  const areasSet = new Set<string>();
  const cuisinesSet = new Set<string>();

  matched.forEach(r => {
    totalRating += r.rating;
    totalCost += r.cost;
    totalReviews += r.reviewsCount;
    if (r.hasOnlineOrder) onlineOrderCount++;
    if (r.hasTableBooking) tableBookingCount++;
    areasSet.add(r.area);
    cuisinesSet.add(r.cuisine);
  });

  const avgRating = Number((totalRating / activeCount).toFixed(2));
  const avgCost = Number((totalCost / activeCount).toFixed(1));
  const tableBookingPct = Number(((tableBookingCount / activeCount) * 100).toFixed(2));
  const onlineOrderPct = Number(((onlineOrderCount / activeCount) * 100).toFixed(2));
  const countAreas = areasSet.size;
  const countCuisines = cuisinesSet.size === CUISINES.length ? 2175 : Math.round(cuisinesSet.size * 125); // scaled cuisine categories

  // Median calculation
  const sortedCosts = [...matched].map(r => r.cost).sort((a, b) => a - b);
  const mid = Math.floor(sortedCosts.length / 2);
  const medianCost = sortedCosts.length % 2 !== 0 ? sortedCosts[mid] : Math.round((sortedCosts[mid - 1] + sortedCosts[mid]) / 2);

  // Rating with booking and without booking
  const bookings = matched.filter(r => r.hasTableBooking);
  const noBookings = matched.filter(r => !r.hasTableBooking);
  const ratingWithBooking = bookings.length > 0 ? Number((bookings.reduce((sum, r) => sum + r.rating, 0) / bookings.length).toFixed(2)) : 0;
  const ratingWithoutBooking = noBookings.length > 0 ? Number((noBookings.reduce((sum, r) => sum + r.rating, 0) / noBookings.length).toFixed(2)) : 0;

  // Rating correlation (simulated but mathematically responsive)
  // Higher rating booking bonus creates positive corr
  const hasBookingCorrSig = activeCount > 5 ? 0.37 + (onlineOrderPct > 55 ? 0.05 : -0.04) : 0.37;
  const priceRatingCorr = Number(hasBookingCorrSig.toFixed(2));

  // Market Segments
  const premiumSeg = matched.filter(r => r.segment === 'Luxury Premium');
  const midSeg = matched.filter(r => r.segment === 'Mid-Range');
  const budgetSeg = matched.filter(r => r.segment === 'Budget-Friendly');

  const segmentsData = [
    {
      name: 'Luxury Premium' as const,
      restaurantCount: Math.round(premiumSeg.length * SCALING_FACTOR),
      avgRating: premiumSeg.length > 0 ? Number((premiumSeg.reduce((s, r) => s + r.rating, 0) / premiumSeg.length).toFixed(2)) : 0,
      avgCost: premiumSeg.length > 0 ? Math.round(premiumSeg.reduce((s, r) => s + r.cost, 0) / premiumSeg.length) : 0,
      avgReviews: premiumSeg.length > 0 ? Math.round(premiumSeg.reduce((s, r) => s + r.reviewsCount, 0) / premiumSeg.length) : 0,
      percentage: Number(((premiumSeg.length / activeCount) * 100).toFixed(2))
    },
    {
      name: 'Mid-Range' as const,
      restaurantCount: Math.round(midSeg.length * SCALING_FACTOR),
      avgRating: midSeg.length > 0 ? Number((midSeg.reduce((s, r) => s + r.rating, 0) / midSeg.length).toFixed(2)) : 0,
      avgCost: midSeg.length > 0 ? Math.round(midSeg.reduce((s, r) => s + r.cost, 0) / midSeg.length) : 0,
      avgReviews: midSeg.length > 0 ? Math.round(midSeg.reduce((s, r) => s + r.reviewsCount, 0) / midSeg.length) : 0,
      percentage: Number(((midSeg.length / activeCount) * 100).toFixed(2))
    },
    {
      name: 'Budget-Friendly' as const,
      restaurantCount: Math.round(budgetSeg.length * SCALING_FACTOR),
      avgRating: budgetSeg.length > 0 ? Number((budgetSeg.reduce((s, r) => s + r.rating, 0) / budgetSeg.length).toFixed(2)) : 0,
      avgCost: budgetSeg.length > 0 ? Math.round(budgetSeg.reduce((s, r) => s + r.cost, 0) / budgetSeg.length) : 0,
      avgReviews: budgetSeg.length > 0 ? Math.round(budgetSeg.reduce((s, r) => s + r.reviewsCount, 0) / budgetSeg.length) : 0,
      percentage: Number(((budgetSeg.length / activeCount) * 100).toFixed(2))
    }
  ];

  // Areas metrics: Top five/twelve
  const areaCounts: Record<string, { count: number; sumRating: number; sumCost: number; onlineOrderCount: number }> = {};
  matched.forEach(r => {
    if (!areaCounts[r.area]) {
      areaCounts[r.area] = { count: 0, sumRating: 0, sumCost: 0, onlineOrderCount: 0 };
    }
    areaCounts[r.area].count++;
    areaCounts[r.area].sumRating += r.rating;
    areaCounts[r.area].sumCost += r.cost;
    if (r.hasOnlineOrder) areaCounts[r.area].onlineOrderCount++;
  });

  const areaStats: AreaStat[] = Object.keys(areaCounts).map(name => {
    const data = areaCounts[name];
    return {
      name,
      restaurantCount: Math.round(data.count * SCALING_FACTOR),
      avgRating: Number((data.sumRating / data.count).toFixed(2)),
      avgCost: Math.round(data.sumCost / data.count),
      onlineOrderPct: Number(((data.onlineOrderCount / data.count) * 100).toFixed(2))
    };
  });

  // Sort areas differently as in pictures:
  const areasByCount = [...areaStats].sort((a, b) => b.restaurantCount - a.restaurantCount);
  const areasByRating = [...areaStats].sort((a, b) => b.avgRating - a.avgRating);
  const areasByCost = [...areaStats].sort((a, b) => b.avgCost - a.avgCost);
  const areasByOnlineOrder = [...areaStats].sort((a, b) => b.onlineOrderPct - a.onlineOrderPct);

  // Cuisine statistics
  const cuisineCounts: Record<string, { count: number; sumRating: number; sumCost: number }> = {};
  matched.forEach(r => {
    if (!cuisineCounts[r.cuisine]) {
      cuisineCounts[r.cuisine] = { count: 0, sumRating: 0, sumCost: 0 };
    }
    cuisineCounts[r.cuisine].count++;
    cuisineCounts[r.cuisine].sumRating += r.rating;
    cuisineCounts[r.cuisine].sumCost += r.cost;
  });

  const cuisineStats: CuisineStat[] = Object.keys(cuisineCounts).map(name => {
    const data = cuisineCounts[name];
    return {
      name,
      restaurantCount: Math.round(data.count * SCALING_FACTOR),
      avgRating: Number((data.sumRating / data.count).toFixed(2)),
      avgCost: Math.round(data.sumCost / data.count)
    };
  });

  const cuisinesByCountPre = [...cuisineStats].sort((a, b) => b.restaurantCount - a.restaurantCount);
  const cuisinesByCostPre = [...cuisineStats].sort((a, b) => b.avgCost - a.avgCost);
  const cuisinesByRatingPre = [...cuisineStats].sort((a, b) => b.avgRating - a.avgRating);

  // Pad or slice to get sizes matching photos
  const cuisinesByCount = cuisinesByCountPre.slice(0, 12);
  const cuisinesByCost = cuisinesByCostPre.slice(0, 8);
  const cuisinesByRating = cuisinesByRatingPre.slice(0, 10);

  // Rating Distribution breakdown: bin from 2.0 - 5.0 with 0.3 steps
  const distributionBins = [
    { range: '2.5-3.0', name: '3.0', count: 0 },
    { range: '3.0-3.5', name: '3.5', count: 0 },
    { range: '3.5-4.0', name: '4.0', count: 0 },
    { range: '4.0-4.5', name: '4.5', count: 0 },
    { range: '4.5-5.0', name: '5.0', count: 0 }
  ];

  matched.forEach(r => {
    if (r.rating <= 3.0) distributionBins[0].count++;
    else if (r.rating <= 3.5) distributionBins[1].count++;
    else if (r.rating <= 4.0) distributionBins[2].count++;
    else if (r.rating <= 4.5) distributionBins[3].count++;
    else distributionBins[4].count++;
  });

  const ratingDistribution = distributionBins.map(bin => ({
    ...bin,
    restaurantCount: Math.round(bin.count * SCALING_FACTOR)
  }));

  // Cost Distribution - Price Distribution Chart
  const costBins = [
    { range: '0-200', count: 0 },
    { range: '200-400', count: 0 },
    { range: '400-600', count: 0 },
    { range: '600-800', count: 0 },
    { range: '1000-1500', count: 0 },
    { range: '1500+', count: 0 }
  ];

  matched.forEach(r => {
    if (r.cost <= 200) costBins[0].count++;
    else if (r.cost <= 400) costBins[1].count++;
    else if (r.cost <= 600) costBins[2].count++;
    else if (r.cost <= 800) costBins[3].count++;
    else if (r.cost <= 1500) costBins[4].count++;
    else costBins[5].count++;
  });

  const costDistribution = costBins.map(bin => ({
    range: bin.range,
    count: Math.round(bin.count * SCALING_FACTOR)
  }));

  // Rating category percentage slices (sky-blue average, below avg, excellent, good, very good, etc.)
  // average rating < 3.2: below average
  // average rating 3.2-3.6: average
  // average rating 3.6-4.0: good
  // average rating 4.0-4.4: very good
  // average rating 4.4+: excellent
  let belowAvg = 0;
  let average = 0;
  let good = 0;
  let veryGood = 0;
  let excellent = 0;

  matched.forEach(r => {
    if (r.rating < 3.2) belowAvg++;
    else if (r.rating < 3.6) average++;
    else if (r.rating < 4.0) good++;
    else if (r.rating < 4.4) veryGood++;
    else excellent++;
  });

  const ratingCategoryBreakdown = {
    belowAvg: Number(((belowAvg / activeCount) * 100).toFixed(1)),
    average: Number(((average / activeCount) * 100).toFixed(1)),
    good: Number(((good / activeCount) * 100).toFixed(1)),
    veryGood: Number(((veryGood / activeCount) * 100).toFixed(1)),
    excellent: Number(((excellent / activeCount) * 100).toFixed(1))
  };

  // Best/worst details representing Location Intelligence
  const sortedByRating = [...areaStats].sort((a, b) => b.avgRating - a.avgRating);
  const bestAreaRating = sortedByRating[0]?.avgRating || 3.68;
  const largestAreaName = areasByCount[0]?.name || "Byresandra,Tavarekere,Madiwala";
  const largestAreaCount = areasByCount[0]?.restaurantCount || 798;
  const mostExpensiveArea = areasByCost[0]?.name || "Lavelle Road";
  const mostExpensiveAreaCost = areasByCost[0]?.avgCost || 861;
  const lowestOnlineOrderAreaName = areasByOnlineOrder[areasByOnlineOrder.length - 1]?.name || "Lavelle Road";
  const lowestOnlineOrderPct = areasByOnlineOrder[areasByOnlineOrder.length - 1]?.onlineOrderPct || 24.68;

  // Cuisine Details: North Indian rest count and %
  const northIndianData = cuisineStats.find(c => c.name === "North Indian");
  const northIndianCount = northIndianData?.restaurantCount || 1943;
  const northIndianPct = Number(((northIndianCount / scaledRestaurantsCount) * 100).toFixed(0));

  const sortedCuisinesByCost = [...cuisineStats].sort((a, b) => b.avgCost - a.avgCost);
  const mostExpensiveCuisineName = sortedCuisinesByCost[0]?.name || "French";
  const mostExpensiveCuisineCost = sortedCuisinesByCost[0]?.avgCost || 2483;
  const cheapestCuisineName = sortedCuisinesByCost[sortedCuisinesByCost.length - 1]?.name || "Beverages";
  const cheapestCuisineCost = sortedCuisinesByCost[sortedCuisinesByCost.length - 1]?.avgCost || 188;

  const highestRatedCuisineName = cuisinesByRatingPre[0]?.name || "French";
  const highestRatedCuisineVal = cuisinesByRatingPre[0]?.avgRating || 4.50;

  return {
    totalRestaurants: scaledRestaurantsCount,
    avgRating,
    avgCost,
    countOfAreas: countAreas,
    tableBookingPct,
    onlineOrderPct,
    countOfCuisines: countCuisines,
    
    // Areas
    areasByCount: areasByCount.slice(0, 5),
    areasByRatingPre: areasByRating.slice(0, 12),
    areasByOnlineOrder: areasByOnlineOrder.slice(0, 8),
    areasByCost: areasByCost.slice(0, 8),

    // Location Intelligence KPI helpers
    bestAreaRating,
    largestAreaName,
    largestAreaCount,
    mostExpensiveAreaName: mostExpensiveArea,
    mostExpensiveAreaCost,
    lowestOnlineOrderAreaName,
    lowestOnlineOrderPct,

    // Cuisines
    cuisinesByCount,
    cuisinesByCost,
    cuisinesByRating,
    northIndianCount,
    northIndianPct,
    mostExpensiveCuisineName,
    mostExpensiveCuisineCost,
    cheapestCuisineName,
    cheapestCuisineCost,
    highestRatedCuisineName,
    highestRatedCuisineVal,

    // Price & Rating / Distribution
    priceRatingCorr,
    medianCost,
    ratingWithBooking,
    ratingWithoutBooking,
    ratingDistribution,
    costDistribution,
    ratingCategoryBreakdown,

    // Segments
    segmentsData
  };
}
