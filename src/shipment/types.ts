export interface ShipmentAddress {
  name: string;
  company?: string;
  add1: string;
  add2?: string;
  city: string;
  state?: string;
  postcode: string;
  country: string;
  telephone: string;
  email: string;
}

export interface ShipmentParcel {
  weight: number; // Decimal in kg
  length: number; // Integer in cm
  width: number; // Integer in cm
  height: number; // Integer in cm
}

export interface CustomsItem {
  parcel: number;
  description: string;
  hsCode: string;
  quantity: number;
  value: string;
  currency: string;
  country: string;
}

export interface CustomsInfo {
  taxStatus: number;
  reasonForExport: number;
  senderEoriNumber?: string;
  receiverEoriNumber?: string;
  iossNumber?: string;
  items: CustomsItem[];
}

export interface PickupDetails {
  date: string; // YYYY-MM-DD
  earliest: string; // HH:mm
  latest: string; // HH:mm
}

export interface ShipmentRequest {
  validate: boolean;
  reference: string;
  collection: ShipmentAddress;
  delivery: ShipmentAddress;
  parcels: ShipmentParcel[];
  contents?: string;
  value?: number;
  service?: string;
  pickup?: PickupDetails;
  transitCover?: boolean;
  customs?: CustomsInfo;
}

export interface ShipmentSuccessResponse {
  status: 0;
  shipmentId: string;
  trackingNumber: string;
  labelUrl: string;
}

export interface ShipmentErrorResponse {
  status: 1;
  errorMessage: string;
  errorCode: string;
}

export type ShipmentResponse = ShipmentSuccessResponse | ShipmentErrorResponse;
