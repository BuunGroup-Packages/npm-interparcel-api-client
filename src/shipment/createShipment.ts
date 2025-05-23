import axios from 'axios';
import { ShipmentRequest, ShipmentResponse } from './types';

const API_URL = 'https://api.interparcel.com/shipments/add';
const API_VERSION = '3';

export async function addShipment(
  apiKey: string,
  data: ShipmentRequest,
): Promise<ShipmentResponse> {
  try {
    const response = await axios.post<ShipmentResponse>(API_URL, data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Interparcel-Auth': apiKey,
        'X-Interparcel-API-Version': API_VERSION,
      },
    });

    if ('errorMessage' in response.data) {
      throw new Error(
        `Shipment API error: ${response.data.errorMessage} (${response.data.errorCode})`,
      );
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data?.errorMessage) {
      throw new Error(
        `Shipment API error: ${error.response.data.errorMessage} (${error.response.data.errorCode})`,
      );
    }
    throw new Error(`Shipment API error: ${error}`);
  }
}
