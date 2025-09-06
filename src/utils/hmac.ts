import { createHmac, timingSafeEqual } from "crypto";

export function verifyHMAC(
  secret: string,
  raw: string,
  t: string,
  signature: string
) {
  const mac = createHmac("sha256", secret)
    .update(`${t}.${raw}`)
    .digest("base64");
  return timingSafeEqual(Buffer.from(mac), Buffer.from(signature));
}
