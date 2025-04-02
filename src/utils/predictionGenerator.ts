import { subDays, format, addDays, isSaturday, isSunday, getMonth } from 'date-fns';

interface PredictionData {
  product: string;
  currentDemand: number;
  predictedDemand: number;
  confidence: number;
  trend: 'up' | 'down' | 'stable';
  seasonalFactors: string[];
  historicalData: number[];
  growthRate: number;
}

// Add type definitions at the top
type SeasonalIndex = 'tomatoes' | 'carrots' | 'lettuce' | 'potatoes' | 'onions';
type WeatherType = 'rainy' | 'sunny' | 'moderate';
type EventType = 'festival' | 'holiday' | 'normal';

interface Product {
  name: string;
  basePrice: number;
  seasonalIndex: SeasonalIndex;
}

// Update the seasonalityFactors type
const seasonalityFactors: Record<SeasonalIndex, number[]> = {
  tomatoes: [1.2, 1.1, 1.0, 0.9, 1.1, 1.2, 1.3, 1.2, 1.1, 1.0, 0.9, 1.0],
  carrots: [1.1, 1.0, 0.9, 1.0, 1.1, 1.2, 1.1, 1.0, 0.9, 1.0, 1.1, 1.2],
  lettuce: [0.9, 1.0, 1.1, 1.2, 1.3, 1.2, 1.1, 1.0, 0.9, 0.8, 0.9, 1.0],
  potatoes: [1.0, 1.1, 1.2, 1.1, 1.0, 0.9, 0.8, 0.9, 1.0, 1.1, 1.2, 1.1],
  onions: [1.1, 1.0, 0.9, 1.0, 1.1, 1.2, 1.1, 1.0, 0.9, 1.0, 1.1, 1.2]
};

// Update the weatherImpact type
const weatherImpact: Record<WeatherType, number> = {
  rainy: 0.9,
  sunny: 1.1,
  moderate: 1.0
};

// Update the marketEvents type
const marketEvents: Record<EventType, number> = {
  festival: 1.3,
  holiday: 1.2,
  normal: 1.0
};

export const generatePredictions = (): PredictionData[] => {
  const products: Product[] = [
    { name: 'Organic Tomatoes', basePrice: 5, seasonalIndex: 'tomatoes' },
    { name: 'Premium Carrots', basePrice: 3, seasonalIndex: 'carrots' },
    { name: 'Fresh Lettuce', basePrice: 4, seasonalIndex: 'lettuce' },
    { name: 'Local Potatoes', basePrice: 6, seasonalIndex: 'potatoes' },
    { name: 'Red Onions', basePrice: 4, seasonalIndex: 'onions' }
  ];

  const currentMonth = getMonth(new Date());
  const currentWeather = ['rainy', 'sunny', 'moderate'][Math.floor(Math.random() * 3)] as WeatherType;
  const currentEvent = ['festival', 'holiday', 'normal'][Math.floor(Math.random() * 3)] as EventType;

  return products.map(product => {
    // Generate historical data with seasonal patterns
    const historicalData = Array.from({ length: 30 }).map((_, index) => {
      const day = subDays(new Date(), index);
      const isWeekend = isSaturday(day) || isSunday(day);
      const baseValue = Math.floor(Math.random() * 200) + 800;
      const seasonalFactor = seasonalityFactors[product.seasonalIndex][currentMonth];
      const weekendFactor = isWeekend ? 1.2 : 1.0;
      
      return Math.floor(baseValue * seasonalFactor * weekendFactor);
    });

    // Calculate growth rate based on historical data
    const growthRate = ((historicalData[0] - historicalData[29]) / historicalData[29]) * 100;

    // Current demand with real-world factors
    const currentDemand = Math.floor(
      historicalData[0] * 
      weatherImpact[currentWeather] * 
      marketEvents[currentEvent]
    );

    // Predicted demand using multiple factors
    const predictedDemand = Math.floor(
      currentDemand * 
      (1 + (growthRate / 100)) * 
      seasonalityFactors[product.seasonalIndex][currentMonth]
    );

    // Calculate confidence based on data consistency
    const variance = historicalData.reduce((sum, value) => 
      sum + Math.pow(value - currentDemand, 2), 0
    ) / historicalData.length;
    const confidence = Math.min(95, Math.max(80, 
      90 - (Math.sqrt(variance) / currentDemand) * 100
    ));

    // Determine trend
    const trend = growthRate > 2 ? 'up' : growthRate < -2 ? 'down' : 'stable';

    // Generate relevant seasonal factors
    const seasonalFactors = [
      currentWeather === 'rainy' ? 'Rainy Season Impact' : 
      currentWeather === 'sunny' ? 'Peak Growing Season' : 'Moderate Weather',
      currentEvent === 'festival' ? 'Festival Season' :
      currentEvent === 'holiday' ? 'Holiday Period' : 'Regular Season',
      growthRate > 0 ? 'Growing Market Demand' : 'Market Stabilization'
    ];

    return {
      product: product.name,
      currentDemand,
      predictedDemand,
      confidence: Math.round(confidence),
      trend,
      seasonalFactors,
      historicalData,
      growthRate: Math.round(growthRate * 10) / 10
    };
  });
};