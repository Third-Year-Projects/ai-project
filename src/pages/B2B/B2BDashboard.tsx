import { useState, useEffect } from 'react';
import { generateB2BData } from '../../utils/b2bDataGenerator';
import { generatePredictions } from '../../utils/predictionGenerator';
import { Line, Bar } from 'react-chartjs-2';
import { addDays, format, parseISO, subDays } from 'date-fns';
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon, MinusIcon } from '@heroicons/react/24/outline';

export default function B2BDashboard() {
  const [clients, setClients] = useState(generateB2BData());
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const [predictions, setPredictions] = useState(generatePredictions());

  // Add after existing metrics
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">B2B Account Management</h1>

      {/* Existing metrics */}
      
      {/* AI Predictions Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">AI-Driven Insights</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Demand Predictions */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Demand Predictions</h3>
            <div className="space-y-4">
              {predictions.map(prediction => (
                <div key={prediction.product} className="border-b pb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{prediction.product}</span>
                    <div className="flex items-center space-x-2">
                      {prediction.trend === 'up' && (
                        <ArrowTrendingUpIcon className="w-5 h-5 text-green-500" />
                      )}
                      {prediction.trend === 'down' && (
                        <ArrowTrendingDownIcon className="w-5 h-5 text-red-500" />
                      )}
                      {prediction.trend === 'stable' && (
                        <MinusIcon className="w-5 h-5 text-gray-500" />
                      )}
                      <span className="text-sm font-medium">
                        {prediction.confidence}% confidence
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Current Demand</p>
                      <p className="font-medium">{prediction.currentDemand} units</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Predicted Demand</p>
                      <p className="font-medium">{prediction.predictedDemand} units</p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">Seasonal Factors:</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {prediction.seasonalFactors.map(factor => (
                        <span key={factor} className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                          {factor}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sales Trends Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Sales Trends</h3>
            <Line
              data={{
                labels: Array.from({ length: 7 }).map((_, i) => 
                  format(subDays(new Date(), 6 - i), 'MMM dd')
                ),
                datasets: [{
                  label: 'Actual Sales',
                  data: Array.from({ length: 7 }).map(() => 
                    Math.floor(Math.random() * 5000) + 3000
                  ),
                  borderColor: '#468847',
                  tension: 0.4
                }, {
                  label: 'Predicted Sales',
                  data: Array.from({ length: 7 }).map(() => 
                    Math.floor(Math.random() * 5000) + 3000
                  ),
                  borderColor: '#87a2fb',
                  borderDash: [5, 5],
                  tension: 0.4
                }]
              }}
              options={{
                scales: {
                  y: {
                    beginAtZero: true
                  }
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* Existing client list and details */}
    </div>
  );
}