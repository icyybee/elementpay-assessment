import { promises as fs } from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { Order } from "@/types/order";

const ordersFile = path.join(process.cwd(), "src/data/orders.json");

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ order_id: string }> }
) {
  const { order_id } = await params;

  // Read existing orders
  let orders: Record<string, Order> = {};
  try {
    const raw = await fs.readFile(ordersFile, "utf-8");
    orders = JSON.parse(raw);
  } catch (e) {
    console.error("Error reading orders file:", e);
    return NextResponse.json(
      { error: "internal_error", message: "Could not read orders data" },
      { status: 500 }
    );
  }

  const order = orders[order_id];

  if (!order) {
    return NextResponse.json(
      { error: "order_not_found", message: `No order with id ${order_id}` },
      { status: 404 }
    );
  }

  const elapsed = (Date.now() - new Date(order.created_at).getTime()) / 1000;

  if (elapsed >= 18) order.status = Math.random() < 0.8 ? "settled" : "failed";
  else if (elapsed >= 8) order.status = "processing";
  else order.status = "created";

  return NextResponse.json(order);
}
