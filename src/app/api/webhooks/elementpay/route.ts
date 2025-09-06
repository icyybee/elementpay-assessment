import { NextRequest, NextResponse } from "next/server";
import { verifyHMAC } from "@/utils/hmac";

export async function POST(req: NextRequest) {
  const raw = await req.text();
  const sigHeader = req.headers.get("X-Webhook-Signature") || "";
  const [tPart, v1Part] = sigHeader.split(",");
  const t = tPart.split("=")[1];
  const v1 = v1Part.split("=")[1];

  if (!verifyHMAC(process.env.WEBHOOK_SECRET!, raw, t, v1)) {
    return NextResponse.json({ error: "invalid_signature" }, { status: 401 });
  }

  return NextResponse.json({ success: true });
}
