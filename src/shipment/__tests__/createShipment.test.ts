import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { addShipment } from '../createShipment';
import { ShipmentRequest, ShipmentSuccessResponse } from '../types';

const mock = new MockAdapter(axios);

describe('addShipment', () => {
  const apiKey = 'test-api-key';
  const requestData: ShipmentRequest = {
    validate: true,
    reference: 'ORDER123',
    collection: {
      name: 'John Sender',
      company: 'Sender Co Ltd',
      add1: '123 George Street',
      add2: 'Level 2',
      city: 'Sydney',
      state: 'NSW',
      postcode: '2000',
      country: 'AU',
      telephone: '+61291234567',
      email: 'sender@example.com',
    },
    delivery: {
      name: 'Jane Receiver',
      company: 'Receiver Inc',
      add1: '456 Collins Street',
      city: 'Melbourne',
      state: 'VIC',
      postcode: '3000',
      country: 'AU',
      telephone: '+61391234567',
      email: 'receiver@example.com',
    },
    parcels: [
      {
        weight: 2.5,
        length: 30,
        width: 20,
        height: 15,
      },
    ],
    contents: 'Books and documents',
    value: 150,
    service: 'AusPost Express',
    pickup: {
      date: '2024-03-22',
      earliest: '09:00',
      latest: '17:00',
    },
    transitCover: true,
    customs: {
      taxStatus: 1,
      reasonForExport: 2,
      items: [
        {
          parcel: 1,
          description: 'Books',
          hsCode: '4901.99',
          quantity: 5,
          value: '30',
          currency: 'AUD',
          country: 'AU',
        },
      ],
    },
  };

  afterEach(() => {
    mock.reset();
  });

  it('creates shipment successfully', async () => {
    const mockResponse: ShipmentSuccessResponse = {
      status: 0,
      shipmentId: 'SHIP123',
      trackingNumber: 'TRACK456',
      labelUrl: 'https://api.interparcel.com/labels/SHIP123.pdf',
    };

    mock.onPost('https://api.interparcel.com/shipments/add').reply(200, mockResponse);

    const result = await addShipment(apiKey, requestData);

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
      errorMessage: 'Invalid delivery postcode',
      errorCode: 'INVALID_POSTCODE',
    };

    mock.onPost('https://api.interparcel.com/shipments/add').reply(400, errorResponse);

    await expect(addShipment(apiKey, requestData)).rejects.toThrow(
      `Shipment API error: ${errorResponse.errorMessage} (${errorResponse.errorCode})`,
    );
  });

  it('throws error on network failure', async () => {
    mock.onPost('https://api.interparcel.com/shipments/add').networkError();

    await expect(addShipment(apiKey, requestData)).rejects.toThrow('Shipment API error');
  });
});
