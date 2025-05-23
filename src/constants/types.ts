// Types for Interparcel Filters

export interface InterparcelService {
  readonly name: string;
  readonly code: string;
  readonly type: InterparcelServiceType;
}

export interface InterparcelCountry {
  readonly name: string;
  readonly code: string;
}

export type InterparcelServiceType = 'Pallet' | 'Standard' | 'Express' | 'Same Day' | 'Timed';

export type InterparcelServiceLevel = 'standard' | 'express' | 'timed' | 'sameday' | 'pallet';

export type InterparcelPickupType = 'collection' | 'dropoff';
