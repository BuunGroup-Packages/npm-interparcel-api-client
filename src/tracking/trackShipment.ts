import axios from 'axios';
import { TrackingResult } from './types';

const API_VERSION = '1';

export async function trackParcel(apiKey: string, trackingNumber: string): Promise<TrackingResult> {
  try {
    const response = await axios.get<TrackingResult>(
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

    if ('errorMessage' in response.data) {
      throw new Error(
        `Tracking API error: ${response.data.errorMessage} (${response.data.errorCode})`,
      );
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data?.errorMessage) {
      throw new Error(
        `Tracking API error: ${error.response.data.errorMessage} (${error.response.data.errorCode})`,
      );
    }
    throw new Error(`Tracking API error: ${error}`);
  }
}
