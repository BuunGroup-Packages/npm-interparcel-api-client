import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getQuote } from '../getQuote';
import { QuoteRequest, QuoteResponse } from '../types';

const mock = new MockAdapter(axios);

describe('getQuote', () => {
  const apiKey = 'test-api-key';
  const requestData: QuoteRequest = {
    collection: { city: 'Sydney', postcode: '2000', country: 'AU' },
    delivery: { city: 'Melbourne', postcode: '3000', country: 'AU' },
    parcels: [{ weight: 1, length: 10, width: 10, height: 10 }],
  };

  afterEach(() => {
    mock.reset();
  });

  it('fetches quotes successfully', async () => {
    const mockResponse: QuoteResponse = [
      {
        id: '1',
        carrier: 'CarrierX',
        service: 'Express',
        description: 'Fast delivery',
        estimated_delivery: '2025-06-01',
        price: { total: 25, currency: 'AUD', tax: 2.5 },
        tracking_available: true,
      },
    ];

    mock.onPost('https://api.interparcel.com/quote').reply(200, mockResponse);

    const result = await getQuote(apiKey, requestData);

    expect(result).toEqual(mockResponse);
  });

  it('throws error on API failure', async () => {
    mock.onPost('https://api.interparcel.com/quote').reply(500);

    await expect(getQuote(apiKey, requestData)).rejects.toThrow('Quote API error');
  });
});
