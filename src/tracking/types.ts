export interface TrackShipmentRequest {
  tracking_number: string;
}

export interface TrackingEvent {
  date: string;
  time: string;
  event: string;
  location: string;
  status: 'B' | 'T' | 'O' | 'D'; // B=Booked, T=Transit, O=Out for delivery, D=Delivered
}

export interface TrackingResponse {
  status: number;
  service: string;
  currentStatus: 'B' | 'T' | 'O' | 'D';
  dateSent: string;
  dateDelivered?: string;
  timeDelivered?: string;
  signedForName?: string;
  events: TrackingEvent[];
}

export interface TrackingErrorResponse {
  status: 1;
  errorMessage: string;
  errorCode: string;
}

export type TrackingResult = TrackingResponse | TrackingErrorResponse;
