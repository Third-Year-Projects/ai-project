import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ProductsChartProps {
  products: Array<{productId: string, revenue: number}>;
}

const ProductsChart: React.FC<ProductsChartProps> = ({ products }) => {
  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={products}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="productId" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="revenue" fill="#468847" /> {/* Using your primary color */}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProductsChart;