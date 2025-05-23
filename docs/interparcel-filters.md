# Interparcel Filter Constants and Types

This document outlines the constants and TypeScript types available for Interparcel API filtering.

## Types

### `InterparcelService`
Represents an Interparcel shipping service.
```typescript
export interface InterparcelService {
  readonly name: string;     // Service name (e.g., 'Allied Pallet B2B')
  readonly code: string;     // Service code (e.g., 'ALLPAL')
  readonly type: InterparcelServiceType; // Type of service (e.g., 'Pallet')
}
```

### `InterparcelCountry`
Represents a country with its ISO Alpha-2 code.
```typescript
export interface InterparcelCountry {
  readonly name: string; // Country name (e.g., 'Australia')
  readonly code: string; // ISO Alpha-2 code (e.g., 'AU')
}
```

### `InterparcelServiceType`
Defines the possible types for a shipping service.
```typescript
export type InterparcelServiceType =
  | 'Pallet'
  | 'Standard'
  | 'Express'
  | 'Same Day'
  | 'Timed';
```

### `InterparcelServiceLevel`
Defines the possible service levels for filtering quotes.
```typescript
export type InterparcelServiceLevel =
  | 'standard'
  | 'express'
  | 'timed'
  | 'sameday'
  | 'pallet';
```

### `InterparcelPickupType`
Defines the possible pickup types for filtering quotes.
```typescript
export type InterparcelPickupType = 'collection' | 'dropoff';
```

## Constants

All constants are `ReadonlyArray` to ensure immutability.

### `DOMESTIC_SERVICE_TYPES: ReadonlyArray<InterparcelServiceType>`
An array of all possible domestic service types.

### `INTERNATIONAL_SERVICE_TYPES: ReadonlyArray<InterparcelServiceType>`
An array of all possible international service types.

### `SERVICE_LEVELS: ReadonlyArray<InterparcelServiceLevel>`
An array of all possible service levels used in filters.

### `PICKUP_TYPES: ReadonlyArray<InterparcelPickupType>`
An array of all possible pickup types used in filters.

### `AUSTRALIA_DOMESTIC_SERVICES: ReadonlyArray<InterparcelService>`
An array of objects, each representing a domestic shipping service available in Australia. Each object conforms to the `InterparcelService` interface.

### `INTERNATIONAL_SERVICES: ReadonlyArray<InterparcelService>`
An array of objects, each representing an international shipping service. Each object conforms to the `InterparcelService` interface.

### `COUNTRIES: ReadonlyArray<InterparcelCountry>`
An array of objects, each representing a country and its ISO Alpha-2 code. Each object conforms to the `InterparcelCountry` interface.

## Usage Example

To use these constants and types in your project:

### General TypeScript/JavaScript Usage

```typescript
import {
  AUSTRALIA_DOMESTIC_SERVICES,
  COUNTRIES,
  SERVICE_LEVELS,
  InterparcelService,
  InterparcelCountry,
  InterparcelServiceLevel,
} from '@buun_group/interparcel-api-sdk';

// Example: Find a specific domestic service
const alliedPalletB2B = AUSTRALIA_DOMESTIC_SERVICES.find(service => service.code === 'ALLPAL');
if (alliedPalletB2B) {
  console.log(alliedPalletB2B.name);
}

// Example: Get all express service levels
const expressLevels = SERVICE_LEVELS.filter(level => level === 'express');
console.log(expressLevels); // Output: ['express']

// Example: Get the country code for Australia
const australia = COUNTRIES.find(country => country.name === 'Australia');
if (australia) {
  console.log(australia.code); // Output: AU
}

interface QuoteFilter {
  serviceLevel?: InterparcelServiceLevel[];
}

const myFilter: QuoteFilter = {
  serviceLevel: ['express', 'standard']
};
```

### Node.js Usage

```javascript
import {
  AUSTRALIA_DOMESTIC_SERVICES,
  COUNTRIES,
  SERVICE_LEVELS,
  PICKUP_TYPES,
  // Import types if needed for type checking (primarily for TypeScript projects)
  // InterparcelService,
  // InterparcelCountry,
  // InterparcelServiceLevel,
  // InterparcelPickupType
} from '@buun_group/interparcel-api-sdk';

// Example: Find a specific domestic service
const alliedRoadExpress = AUSTRALIA_DOMESTIC_SERVICES.find(service => service.code === 'ALLROEXP');
if (alliedRoadExpress) {
  console.log(`Found Service: ${alliedRoadExpress.name}, Type: ${alliedRoadExpress.type}`);
}

// Example: List all available pickup types
console.log('Available pickup types:', PICKUP_TYPES);

// Example: Get country code for New Zealand
const newZealand = COUNTRIES.find(country => country.name === 'New Zealand');
if (newZealand) {
  console.log(`Country code for New Zealand: ${newZealand.code}`);
}
```

### Next.js (App Router) Usage

You can import and use these constants directly in your Next.js App Router components (Server Components by default) or API Route Handlers.

**Example in a Server Component (`app/some-page/page.tsx`):**

```typescript jsx
import {
  AUSTRALIA_DOMESTIC_SERVICES,
  INTERNATIONAL_SERVICES,
  COUNTRIES,
  InterparcelService,
  InterparcelCountry,
} from '@buun_group/interparcel-api-sdk';

export default function ShippingInfoPage() {
  const expressDomesticServices = AUSTRALIA_DOMESTIC_SERVICES.filter(
    service => service.type === 'Express'
  );

  const usa = COUNTRIES.find(country => country.code === 'US');

  return (
    <div>
      <h1>Shipping Information</h1>
      <h2>Available Express Domestic Services:</h2>
      <ul>
        {expressDomesticServices.map(service => (
          <li key={service.code}>{service.name} ({service.code})</li>
        ))}
      </ul>
      {usa && (
        <p>
          Shipping to: {usa.name} ({usa.code})
        </p>
      )}
      <h2>International Pallet Services:</h2>
      <ul>
        {INTERNATIONAL_SERVICES.filter(s => s.type === 'Pallet').map(service => (
          <li key={service.code}>{service.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

**Example in an API Route Handler (`app/api/shipping-options/route.ts`):**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import {
  SERVICE_LEVELS,
  PICKUP_TYPES,
  InterparcelServiceLevel,
  InterparcelPickupType,
} from '@buun_group/interparcel-api-sdk';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const preferredLevel = searchParams.get('level') as InterparcelServiceLevel | null;

  let availableLevels = SERVICE_LEVELS;
  if (preferredLevel && SERVICE_LEVELS.includes(preferredLevel)) {
    availableLevels = [preferredLevel];
  }

  return NextResponse.json({
    availableServiceLevels: availableLevels,
    availablePickupTypes: PICKUP_TYPES,
  });
}
```