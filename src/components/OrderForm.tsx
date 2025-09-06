"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Order } from "@/types/order";
import { useOrderStatus } from "@/hooks/useOrderStatus";
import OrderReceipt from "./OrderReceipt";
import FormInput from "./FormInput";

interface FormValues {
  amount: number;
  currency: string;
  token: string;
  note?: string;
}

export default function OrderForm({
  walletConnected,
}: {
  walletConnected: boolean;
}) {
  const [orderId, setOrderId] = useState<string | null>(null);
  const { order, finalized } = useOrderStatus(orderId || "");
  const [submitting, setSubmitting] = useState(false);
  const [timedOut, setTimedOut] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    setSubmitting(true);
    setTimedOut(false);
    try {
      const res = await fetch("/api/mock/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const createdOrder: Order = await res.json();
      setOrderId(createdOrder.order_id);
    } catch (err) {
      console.error("Submission error:", err);
      setSubmitting(false);
    }
  };

  if (submitting && orderId && !order && finalized) {
    setTimedOut(true);
    setSubmitting(false);
  }

  if (!walletConnected)
    return <p>Please connect your wallet to create an order!</p>;

  return (
    <div>
      {!order && (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <FormInput
            placeholder="Amount"
            type="number"
            register={register("amount", { min: 1 })}
            error={errors.amount}
            disabled={submitting}
          />
          <FormInput
            type="text"
            placeholder="Currency (e.g., USD)"
            register={register("currency", { required: true })}
            error={errors.currency}
            disabled={submitting}
          />
          <FormInput
            type="text"
            placeholder="Token (e.g., USDC)"
            register={register("token", { required: true })}
            error={errors.token}
            disabled={submitting}
          />
          <FormInput
            type="text"
            placeholder="Note (optional)"
            register={register("note")}
            disabled={submitting}
          />

          <button
            type="submit"
            disabled={submitting}
            className="cursor-pointer bg-green-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-green-700 transition w-full"
          >
            {submitting && !finalized ? "Processing order..." : "Submit"}
          </button>
        </form>
      )}

      {/* Receipt */}
      {order && <OrderReceipt order={order} />}

      {/* Timeout */}
      {timedOut && (
        <div className="flex flex-col items-center p-6 bg-red-100 rounded-xl shadow-lg gap-4">
          <p className="text-red-700 font-semibold">
            Timed out – please try again.
          </p>
          <button
            onClick={() => {
              setOrderId(null);
              setSubmitting(false);
              setTimedOut(false);
            }}
            className="bg-green-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-700 transition"
          >
            Retry
          </button>
        </div>
      )}
    </div>
  );
}
