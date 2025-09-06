import { promises as fs } from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { Order } from "@/types/order";

const ordersFile = path.join(process.cwd(), "src/data/orders.json");

export async function POST(req: NextRequest) {
  const body = await req.json();

  // Read existing orders
  let orders: Record<string, Order> = {};
  try {
    const raw = await fs.readFile(ordersFile, "utf-8");
    orders = JSON.parse(raw);
  } catch (e) {
    console.error("Error reading orders file:", e);
  }

  const id = `ord_${Math.random().toString(16).slice(2)}`;

  const newOrder: Order = {
    order_id: id,
    status: "created",
    amount: body.amount,
    currency: body.currency,
    token: body.token,
    note: body.note,
    created_at: new Date().toISOString(),
  };

  orders[id] = newOrder;

  await fs.writeFile(ordersFile, JSON.stringify(orders, null, 2));

  return NextResponse.json(newOrder);
}
