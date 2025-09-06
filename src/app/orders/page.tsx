"use client";
import OrderForm from "@/components/OrderForm";
import { useAccount } from "wagmi";

export default function OrdersPage() {
  const { isConnected } = useAccount();

  return (
    <>
      <h3 className="text-[18px] font-semibold mb-5 text-gray-800 sm:block hidden">
        Create an Order
      </h3>
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
        <OrderForm walletConnected={isConnected} />
      </div>
    </>
  );
}
