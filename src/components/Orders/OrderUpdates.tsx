import { useState } from "react";

interface OrderUpdate {
  orderId: string;
  status: 'processing' | 'shipped' | 'delivered';
  message: string;
  timestamp: Date;
}

export const OrderUpdates = () => {
  const [updates, setUpdates] = useState<OrderUpdate[]>([]);

  return (
    <div className="fixed bottom-4 left-4 z-50">
      {updates.map((update) => (
        <div key={update.orderId} className="bg-white rounded-lg shadow-lg p-4 mb-2">
          <h4 className="font-medium">Order #{update.orderId}</h4>
          <p className="text-sm text-gray-600">{update.message}</p>
        </div>
      ))}
    </div>
  );
};