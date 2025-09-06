"use client";
import OrderForm from "@/components/OrderForm";
import Link from "next/link";
import { useAccount } from "wagmi";

export default function OrdersPage() {
  const { isConnected } = useAccount();

  return (
    <>
      <h2 className="hidden lg:block sm:text-2xl font-bold mb-6 text-gray-800 text-center">
        Create an Order
      </h2>
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 sm:p-8">
        <OrderForm walletConnected={isConnected} />
      </div>
      <Link
        href="/wallet"
        className="mt-10 sm:mt-5 inline-block text-green-600 font-bold underline"
      >
        Go back to wallet
      </Link>
    </>
  );
}
