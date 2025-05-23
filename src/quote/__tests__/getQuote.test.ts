import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getQuote } from '../getQuote';
import { QuoteRequest, QuoteSuccessResponse } from '../types';

const mock = new MockAdapter(axios);

describe('getQuote', () => {
  const apiKey = 'test-api-key';
  const requestData: QuoteRequest = {
    collection: {
      city: 'Sydney',
      state: 'NSW',
      postcode: '2000',
      country: 'AU',
    },
    delivery: {
      city: 'Melbourne',
      state: 'VIC',
      postcode: '3000',
      country: 'AU',
    },
    parcels: [
      {
        weight: 2,
        length: 5,
        width: 10,
        height: 12,
      },
    ],
  };

  afterEach(() => {
    mock.reset();
  });

  it('fetches quotes successfully', async () => {
    const mockResponse: QuoteSuccessResponse = {
      status: 0,
      services: [
        {
          id: 'service1',
          carrier: 'Australia Post',
          name: 'Express Post',
          service: 'AusPost Express',
          serviceLevel: 'express',
          price: {
            total: 25.5,
            currency: 'AUD',
            tax: 2.55,
          },
          currency: 'AUD',
          taxable: true,
          includedCover: 100,
          maxCover: 5000,
          printerNeeded: false,
          restrictions: {
            maximumWeight: 30,
            maximumLength: 100,
          },
          pickupType: 'collection',
          delivery: {
            daysFrom: 1,
            daysTo: 2,
          },
        },
      ],
    };

    mock.onPost('https://api.interparcel.com/quote').reply(200, mockResponse);

    const result = await getQuote(apiKey, requestData);

    expect(result).toEqual(mockResponse);
    expect(mock.history.post[0].headers).toMatchObject({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Interparcel-Auth': apiKey,
      'X-Interparcel-API-Version': '3',
    });
  });

  it('handles error response correctly', async () => {
    const errorResponse = {
      status: 1,
      errorMessage: 'Invalid postcode',
      errorCode: 'INVALID_POSTCODE',
    };

    mock.onPost('https://api.interparcel.com/quote').reply(400, errorResponse);

    await expect(getQuote(apiKey, requestData)).rejects.toThrow(
      `Quote API error: ${errorResponse.errorMessage} (${errorResponse.errorCode})`,
    );
  });

  it('throws error on network failure', async () => {
    mock.onPost('https://api.interparcel.com/quote').networkError();

    await expect(getQuote(apiKey, requestData)).rejects.toThrow('Quote API error');
  });
});
