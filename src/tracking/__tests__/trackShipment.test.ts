import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { trackParcel } from '../trackShipment';
import { TrackingResponse } from '../types';

const mock = new MockAdapter(axios);

describe('trackParcel', () => {
  const apiKey = 'test-api-key';
  const trackingNumber = 'TRACK123';

  afterEach(() => {
    mock.reset();
  });

  it('fetches tracking info successfully', async () => {
    const mockResponse: TrackingResponse = {
      tracking_number: trackingNumber,
      carrier: 'CarrierX',
      status: 'In Transit',
      events: [
        {
          status: 'Dispatched',
          timestamp: '2025-05-22T10:00:00Z',
          location: 'Sydney',
        },
      ],
    };

    mock.onGet(`https://api.interparcel.com/tracking/${trackingNumber}`).reply(200, mockResponse);

    const result = await trackParcel(apiKey, trackingNumber);

    expect(result).toEqual(mockResponse);
  });

  it('throws error on API failure', async () => {
    mock.onGet(`https://api.interparcel.com/tracking/${trackingNumber}`).reply(500);

    await expect(trackParcel(apiKey, trackingNumber)).rejects.toThrow('Tracking API error');
  });
});
