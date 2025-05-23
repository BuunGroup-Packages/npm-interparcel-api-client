import axios from 'axios';
import { QuoteRequest, QuoteResponse } from './types';

const API_URL = 'https://api.interparcel.com/quote';
const API_VERSION = '3';

export async function getQuote(apiKey: string, data: QuoteRequest): Promise<QuoteResponse> {
  try {
    const response = await axios.post<QuoteResponse>(API_URL, data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Interparcel-Auth': apiKey,
        'X-Interparcel-API-Version': API_VERSION,
      },
    });

    if ('errorMessage' in response.data) {
      throw new Error(
        `Quote API error: ${response.data.errorMessage} (${response.data.errorCode})`,
      );
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data?.errorMessage) {
      throw new Error(
        `Quote API error: ${error.response.data.errorMessage} (${error.response.data.errorCode})`,
      );
    }
    throw new Error(`Quote API error: ${error}`);
  }
}
