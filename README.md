# ElementPay Frontend Assessment

## Description

A small Next.js (App Router + TypeScript) app that allows users to connect wallets, create orders, and view order status. Uses a mock API to simulate order creation, status progression, and webhook events.

## Features

- 🔑 Connect/disconnect wallets (MetaMask + WalletConnect via RainbowKit & Wagmi)
- 📝 Order creation form (amount, currency, token, note)
- ✅ Validation: amount > 0, required currency/token fields
- 🚫 Form disabled until a wallet is connected
- 📄 Displays receipt card after order creation
- 🔄 Updates order status via **polling** (every 3s) and simulated **webhook events**

## Assumptions

- Orders are stored in memory (no persistent database used).
- Mock API simulates order lifecycle:
  `created → processing → settled / failed`.
- Webhook simulation is handled via a browser `CustomEvent` (`elementpay-webhook`).

## Setup

1. **Clone repo:**

   ```bash
   git clone <repo_url>
   cd <repo_folder>
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Copy `.env.example` into `.env.local`:

   ```bash
   cp .env.example .env.local
   ```

   Then update with your values.

4. **Run development server:**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## .env.example

```env
WEBHOOK_SECRET=your_webhook_secret_here
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
```

- `WEBHOOK_SECRET`: placeholder for simulating webhook signing.
- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`: required for WalletConnect to work (safe to expose).

## Deployment

The app can be deployed easily to [Vercel](https://vercel.com).
If deployed, set the same environment variables in your Vercel project settings.
