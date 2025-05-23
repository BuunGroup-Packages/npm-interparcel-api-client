export interface AddressDetails {
  city: string;
  postcode: string;
  country: string;
}

export interface ParcelDetails {
  weight: number;
  length: number;
  width: number;
  height: number;
  contents?: string;
  value?: number;
}

export interface QuoteRequest {
  collection: AddressDetails;
  delivery: AddressDetails;
  parcels: ParcelDetails[];
}

export interface QuoteResponseItem {
  id: string;
  carrier: string;
  service: string;
  description: string;
  estimated_delivery: string;
  price: {
    total: number;
    currency: string;
    tax: number;
  };
  tracking_available: boolean;
}

export type QuoteResponse = QuoteResponseItem[];
