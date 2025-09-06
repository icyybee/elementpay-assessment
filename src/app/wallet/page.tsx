import WalletConnect from "@/components/WalletConnect";
import Link from "next/link";

export default function WalletPage() {
  return (
    <>
      <div className="bg-white flex flex-col items-center rounded-xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-800 text-center">
          Connect Your Wallet
        </h2>
        <WalletConnect />
      </div>

      <Link
        href="/orders"
        className="mt-10 sm:mt-5 inline-block text-green-600 font-bold underline"
      >
        Go to Orders
      </Link>
    </>
  );
}
