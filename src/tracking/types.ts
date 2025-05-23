export interface TrackShipmentRequest {
  tracking_number: string;
}

export interface TrackingEvent {
  status: string;
  timestamp: string;
  location?: string;
  description?: string;
}

export interface TrackingResponse {
  tracking_number: string;
  carrier: string;
  status: string;
  estimated_delivery?: string;
  events: TrackingEvent[];
}
