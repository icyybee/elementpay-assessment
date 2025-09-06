import { useState, useEffect, useRef } from "react";
import { Order } from "@/types/order";
import { POLL_INTERVAL, POLL_TIMEOUT } from "@/utils/constants";

type WebhookEvent = {
  order_id: string;
  status: "settled" | "failed" | "processing" | "created";
};

export function useOrderStatus(orderId: string) {
  const [order, setOrder] = useState<Order | null>(null);
  const [finalized, setFinalized] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // helper to finalize the order
  const finalize = (data: Order) => {
    if (!finalized) {
      setOrder(data);
      setFinalized(true);
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    if (!orderId) return;

    async function poll() {
      try {
        const res = await fetch(`/api/mock/orders/${orderId}`);
        if (res.status === 404) return;
        if (!res.ok) throw new Error("Network error");

        const data: Order = await res.json();
        setOrder(data);

        if (data.status === "settled" || data.status === "failed") {
          finalize(data);
        }
      } catch (err) {
        console.error("Polling error:", err);
      }
    }

    poll();
    intervalRef.current = setInterval(poll, POLL_INTERVAL);
    timeoutRef.current = setTimeout(() => setFinalized(true), POLL_TIMEOUT);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [orderId]);

  useEffect(() => {
    if (finalized && intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, [finalized]);

  // Webhook listener
  useEffect(() => {
    if (!orderId) return;

    function handleWebhook(event: CustomEvent<WebhookEvent>) {
      if (event.detail.order_id === orderId) {
        if (
          event.detail.status === "settled" ||
          event.detail.status === "failed"
        ) {
          finalize({
            order_id: orderId,
            status: event.detail.status,
            amount: order?.amount || 0,
            currency: order?.currency || "",
            token: order?.token || "",
            note: order?.note,
            created_at: order?.created_at || new Date().toISOString(),
          });
        }
      }
    }

    window.addEventListener(
      "elementpay-webhook",
      handleWebhook as EventListener
    );

    return () => {
      window.removeEventListener(
        "elementpay-webhook",
        handleWebhook as EventListener
      );
    };
  }, [orderId, order, finalized]);

  return { order, finalized };
}
