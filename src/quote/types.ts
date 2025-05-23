export interface AddressDetails {
  city: string;
  state?: string;
  postcode: string;
  country: string;
}

export interface ParcelDetails {
  weight: number;
  length: number;
  width: number;
  height: number;
}

export interface FilterOptions {
  serviceLevel?: Array<'standard' | 'express' | 'timed' | 'sameday' | 'pallet'>;
  carriers?: string[];
  services?: string[];
  pickupType?: Array<'collection' | 'dropoff'>;
}

export interface QuoteRequest {
  collection: AddressDetails;
  delivery: AddressDetails;
  filter?: FilterOptions;
  parcels: ParcelDetails[];
}

export interface ServicePrice {
  total: number;
  currency: string;
  tax: number;
}

export interface ServiceRestrictions {
  maximumWeight?: number;
  maximumLength?: number;
}

export interface ServiceDelivery {
  daysFrom: number;
  daysTo: number;
}

export interface QuoteResponseItem {
  id: string;
  carrier: string;
  name: string;
  service: string;
  serviceLevel: string;
  price: ServicePrice;
  currency: string;
  taxable: boolean;
  includedCover: number;
  maxCover: number;
  printerNeeded: boolean;
  restrictions: ServiceRestrictions;
  pickupType: 'collection' | 'dropoff';
  delivery: ServiceDelivery;
}

export interface QuoteSuccessResponse {
  status: 0;
  services: QuoteResponseItem[];
}

export interface QuoteErrorResponse {
  status: 1;
  errorMessage: string;
  errorCode: string;
}

export type QuoteResponse = QuoteSuccessResponse | QuoteErrorResponse;
