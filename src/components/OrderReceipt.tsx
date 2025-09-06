import React from "react";
import { Order } from "@/types/order";

export default function OrderReceipt({ order }: { order: Order }) {
  const statusColor = {
    created: "text-gray-500 bg-gray-100",
    processing: "text-blue-700 bg-blue-100",
    settled: "text-green-700 bg-green-100",
    failed: "text-red-700 bg-red-100",
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md mx-auto flex flex-col gap-4">
      <h2 className="sm:text-2xl text-xl text-center mb-4 bg-green-600 rounded-sm text-white sm:font-semibold font-bold">
        Order Receipt
      </h2>

      <div className="flex justify-between">
        <span className="font-semibold">Order ID:</span>
        <span className="text-gray-700">{order.order_id}</span>
      </div>

      <div className="flex justify-between">
        <span className="font-semibold">Amount:</span>
        <span className="text-gray-700">
          {order.amount} {order.currency}
        </span>
      </div>

      <div className="flex justify-between">
        <span className="font-semibold">Token:</span>
        <span className="text-gray-700">{order.token}</span>
      </div>

      {order.note && (
        <div className="flex justify-between">
          <span className="font-semibold">Note:</span>
          <span className="text-gray-700">{order.note}</span>
        </div>
      )}

      <div className="flex justify-between items-center mt-3">
        <span className="font-semibold">Status:</span>
        <span
          className={`font-bold px-3 py-1 rounded-full text-sm ${
            statusColor[order.status]
          }`}
        >
          {order.status.toUpperCase()}
        </span>
      </div>

      <div className="text-sm text-gray-500 text-center mt-2">
        Created at: {new Date(order.created_at).toLocaleString()}
      </div>
    </div>
  );
}
