import axios from 'axios';
import { TrackingResponse } from './types';

const API_VERSION = '1';

export async function trackParcel(
  apiKey: string,
  trackingNumber: string,
): Promise<TrackingResponse> {
  try {
    const response = await axios.get<TrackingResponse>(
      `https://api.interparcel.com/tracking/${trackingNumber}`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-Interparcel-Auth': apiKey,
          'X-Interparcel-API-Version': API_VERSION,
        },
      },
    );
    return response.data;
  } catch (error) {
    throw new Error(`Tracking API error: ${error}`);
  }
}
