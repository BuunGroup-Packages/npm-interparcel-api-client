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
      status: 0,
      service: 'AusPost Express',
      currentStatus: 'T',
      dateSent: '2024-03-20',
      dateDelivered: '2024-03-21',
      timeDelivered: '14:30',
      signedForName: 'John Smith',
      events: [
        {
          date: '2024-03-21',
          time: '14:30',
          event: 'Delivered',
          location: 'Melbourne VIC',
          status: 'D',
        },
        {
          date: '2024-03-21',
          time: '09:00',
          event: 'Out for delivery',
          location: 'Melbourne VIC',
          status: 'O',
        },
        {
          date: '2024-03-20',
          time: '18:00',
          event: 'In transit',
          location: 'Sydney NSW',
          status: 'T',
        },
        {
          date: '2024-03-20',
          time: '10:00',
          event: 'Collected',
          location: 'Brisbane QLD',
          status: 'B',
        },
      ],
    };

    mock.onGet(`https://api.interparcel.com/tracking/${trackingNumber}`).reply(200, mockResponse);

    const result = await trackParcel(apiKey, trackingNumber);

    expect(result).toEqual(mockResponse);
    expect(mock.history.get[0].headers).toMatchObject({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Interparcel-Auth': apiKey,
      'X-Interparcel-API-Version': '1',
    });
  });

  it('handles error response correctly', async () => {
    const errorResponse = {
      status: 1,
      errorMessage: 'Invalid tracking number',
      errorCode: 'INVALID_TRACKING',
    };

    mock.onGet(`https://api.interparcel.com/tracking/${trackingNumber}`).reply(400, errorResponse);

    await expect(trackParcel(apiKey, trackingNumber)).rejects.toThrow(
      `Tracking API error: ${errorResponse.errorMessage} (${errorResponse.errorCode})`,
    );
  });

  it('throws error on network failure', async () => {
    mock.onGet(`https://api.interparcel.com/tracking/${trackingNumber}`).networkError();

    await expect(trackParcel(apiKey, trackingNumber)).rejects.toThrow('Tracking API error');
  });
});
