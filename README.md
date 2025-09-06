# ElementPay Frontend Assessment

## Description

A small Next.js app that allows users to connect wallets, create orders, and view order status. Uses a mock API for order creation and status polling.

## Features

- Connect/disconnect at least two wallet types
- Order creation form (amount, currency, token, note)
- Form disabled until wallet is connected
- Validation: amount > 0, required fields
- Shows receipt card and updates status via polling & webhook

## Assumptions

- Orders are stored in memory; no database required
- Mock API simulates status progression: `created` → `processing` → `settled`/`failed`
- Webhook simulation triggers status updates via `CustomEvent` in browser

## Setup

1. Clone repo:

```bash
git clone <repo_url>
cd <repo_folder>
```

2. Install dependencies:

```bash
npm install
```

3. Copy `.env.example` to `.env` and add your values:

```bash
cp .env.example .env
```

4. Run development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## .env.example

```env
WEBHOOK_SECRET=your_webhook_secret_here
NEXT_PUBLIC_RPC_URL=<optional_if_needed>
```

---

### 2️⃣ .env.example

Create a simple `.env.example` file:

```env
WEBHOOK_SECRET=your_webhook_secret_here
```

- No real secret required for your mock, just to show you know how to use it.
- If you have any RPC URLs or wallet configs, include them as `NEXT_PUBLIC_` variables.
