# Interparcel API SDK – Getting Started

---

## 📂 Examples Directory

See the [examples/](../examples/) directory for ready-to-use sample request bodies.

- [`quote-request.json`](../examples/quote-request.json): Example payload for `getQuote` (can be used with curl, Postman, etc.)
- [`add-shipment-request.json`](../examples/add-shipment-request.json): Example payload for `addShipment`
- [`track-parcel-request.json`](../examples/track-parcel-request.json): Example payload for `trackParcel`

**Example using curl:**

```sh
# getQuote
curl -X POST http://localhost:3000/api/quote \
  -H "Content-Type: application/json" \
  --data-binary @../examples/quote-request.json

# addShipment
curl -X POST http://localhost:3000/api/shipment \
  -H "Content-Type: application/json" \
  --data-binary @../examples/add-shipment-request.json

# trackParcel
curl -X POST http://localhost:3000/api/track \
  -H "Content-Type: application/json" \
  --data-binary @../examples/track-parcel-request.json
```

---

## 🚀 Installation

```sh
npm install interparcel-api-sdk
```

---

## 🔑 API Key Setup

Set your Interparcel API key as an environment variable:

```env
INTERPARCEL_API_KEY=your_api_key_here
```

---

## 🟦 Usage in Node.js

```js
import { getQuote, addShipment, trackParcel } from 'interparcel-api-sdk';

const apiKey = process.env.INTERPARCEL_API_KEY;

const quote = await getQuote(apiKey, { /* ... */ });
```

---

## 🟧 Usage in Next.js (App Router)

```ts
// app/api/quote/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getQuote } from 'interparcel-api-sdk';

export async function POST(req: NextRequest) {
  const apiKey = process.env.INTERPARCEL_API_KEY;
  const body = await req.json();
  const quote = await getQuote(apiKey, body);
  return NextResponse.json(quote);
}
```

---

## 🟩 Usage in React

> **Note:** Do not expose your API key in client-side code!  
> Use the SDK in API routes or server components only.

**Client-side:**  
Call your own API route (see Next.js example above) from React components.

```js
// In your React component
const response = await fetch('/api/quote', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
});
const quote = await response.json();
```

---

# 📖 API Reference & Input Tables

---

## getQuote

| Field      | Type            | Required | Description           |
|------------|-----------------|----------|-----------------------|
| collection | AddressDetails  | Yes      | Pickup address info   |
| delivery   | AddressDetails  | Yes      | Delivery address info |
| parcels    | ParcelDetails[] | Yes      | Array of parcels      |

**AddressDetails:**

| Field    | Type   | Required | Description         |
|----------|--------|----------|---------------------|
| city     | string | Yes      | City name           |
| postcode | string | Yes      | Postal code         |
| country  | string | Yes      | Country code (e.g. 'AU') |

**ParcelDetails:**

| Field    | Type    | Required | Description         |
|----------|---------|----------|---------------------|
| weight   | number  | Yes      | Weight in kg        |
| length   | number  | Yes      | Length in cm        |
| width    | number  | Yes      | Width in cm         |
| height   | number  | Yes      | Height in cm        |
| contents | string  | No       | Description         |
| value    | number  | No       | Value in AUD        |

<details>
<summary><strong>Example: getQuote request body</strong></summary>

```json
{
  "collection": { "city": "Sydney", "postcode": "2000", "country": "AU" },
  "delivery": { "city": "Melbourne", "postcode": "3000", "country": "AU" },
  "parcels": [{ "weight": 2, "length": 10, "width": 20, "height": 15 }]
}
```
</details>

---

## addShipment

| Field      | Type             | Required | Description                |
|------------|------------------|----------|----------------------------|
| validate   | boolean          | Yes      | Validate before creating   |
| reference  | string           | Yes      | Reference for shipment     |
| collection | ShipmentContact  | Yes      | Sender info                |
| delivery   | ShipmentContact  | Yes      | Receiver info              |
| parcels    | ShipmentParcel[] | Yes      | Array of parcels           |
| service    | string           | No       | Service code               |
| pickup     | PickupDetails    | No       | Pickup timing              |
| transitCover| boolean         | No       | Transit cover/insurance    |
| customs    | object           | No       | Customs info (if needed)   |

**ShipmentContact:**

| Field    | Type   | Required | Description         |
|----------|--------|----------|---------------------|
| name     | string | Yes      | Name                |
| email    | string | Yes      | Email address       |
| phone    | string | Yes      | Phone number        |
| company  | string | No       | Company name        |
| address  | object | Yes      | AddressDetails      |

**ShipmentParcel:**

| Field    | Type    | Required | Description         |
|----------|---------|----------|---------------------|
| weight   | number  | Yes      | Weight in kg        |
| length   | number  | Yes      | Length in cm        |
| width    | number  | Yes      | Width in cm         |
| height   | number  | Yes      | Height in cm        |
| contents | string  | Yes      | Description         |
| value    | number  | No       | Value in AUD        |

**PickupDetails:**

| Field    | Type   | Required | Description         |
|----------|--------|----------|---------------------|
| date     | string | Yes      | Pickup date (YYYY-MM-DD) |
| earliest | string | Yes      | Earliest time (HH:mm)    |
| latest   | string | Yes      | Latest time (HH:mm)      |

<details>
<summary><strong>Example: addShipment request body</strong></summary>

```json
{
  "validate": true,
  "reference": "ref-123",
  "collection": {
    "name": "Sender",
    "email": "sender@example.com",
    "phone": "123456789",
    "company": "Sender Co",
    "address": {
      "street": "123 Sender St",
      "city": "Sydney",
      "postcode": "2000",
      "country": "AU"
    }
  },
  "delivery": {
    "name": "Receiver",
    "email": "receiver@example.com",
    "phone": "987654321",
    "company": "Receiver Co",
    "address": {
      "street": "456 Receiver Ave",
      "city": "Melbourne",
      "postcode": "3000",
      "country": "AU"
    }
  },
  "parcels": [
    { "weight": 1, "length": 10, "width": 10, "height": 10, "contents": "Books", "value": 100 }
  ],
  "service": "express",
  "pickup": {
    "date": "2025-05-23",
    "earliest": "09:00",
    "latest": "17:00"
  },
  "transitCover": true,
  "customs": {}
}
```
</details>

---

## trackParcel

| Field          | Type    | Required | Description                |
|----------------|---------|----------|----------------------------|
| trackingNumber | string  | Yes      | Tracking number to query   |

<details>
<summary><strong>Example: trackParcel usage</strong></summary>

```js
const tracking = await trackParcel(apiKey, 'TRACK123');
```
</details>

---

## ✅ Best Practices

- **Never expose your API key in client-side code.**
- Use the SDK in server-side environments (Node.js, Next.js API routes, server actions).
- Handle errors gracefully (all SDK methods throw on error).

---

## 📚 More

- See the [README](../README.md) for more details and API reference. 