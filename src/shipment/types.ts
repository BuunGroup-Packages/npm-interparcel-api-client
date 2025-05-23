export interface ShipmentContact {
  name: string;
  email: string;
  phone: string;
  company?: string;
  address: {
    street: string;
    city: string;
    state?: string;
    postcode: string;
    country: string;
  };
}

export interface ShipmentParcel {
  weight: number;
  length: number;
  width: number;
  height: number;
  contents: string;
  value?: number;
}

export interface CreateShipmentRequest {
  serviceId: string;
  collection: ShipmentContact;
  delivery: ShipmentContact;
  parcels: ShipmentParcel[];
  reference?: string;
  insurance_required?: boolean;
}

export interface ShipmentRequest {
  validate: boolean;
  reference: string;
  collection: ShipmentContact;
  delivery: ShipmentContact;
  parcels: ShipmentParcel[];
  contents?: string;
  value?: number;
  service?: string;
  pickup?: {
    date: string;
    earliest: string;
    latest: string;
  };
  transitCover?: boolean;
  customs?: any;
}

export interface ShipmentResponse {
  shipment_id: string;
  carrier: string;
  service: string;
  tracking_number: string;
  tracking_url?: string;
  label_url: string;
  status: string;
  estimated_delivery?: string;
}
