import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { addShipment } from '../createShipment';
import { ShipmentRequest, ShipmentResponse } from '../types';

const mock = new MockAdapter(axios);

describe('addShipment', () => {
  const apiKey = 'test-api-key';
  const requestData: ShipmentRequest = {
    validate: true,
    reference: 'ref-123',
    collection: {
      name: 'Sender',
      email: 'sender@example.com',
      phone: '123456789',
      company: 'Sender Co',
      address: {
        street: '123 Sender St',
        city: 'Sydney',
        postcode: '2000',
        country: 'AU',
      },
    },
    delivery: {
      name: 'Receiver',
      email: 'receiver@example.com',
      phone: '987654321',
      company: 'Receiver Co',
      address: {
        street: '456 Receiver Ave',
        city: 'Melbourne',
        postcode: '3000',
        country: 'AU',
      },
    },
    parcels: [{ weight: 1, length: 10, width: 10, height: 10, contents: 'Books', value: 100 }],
    service: 'express',
    pickup: {
      date: '2025-05-23',
      earliest: '09:00',
      latest: '17:00',
    },
    transitCover: true,
    customs: {},
  };

  afterEach(() => {
    mock.reset();
  });

  it('creates shipment successfully', async () => {
    const mockResponse: ShipmentResponse = {
      shipment_id: 'sh123',
      carrier: 'CarrierX',
      service: 'Express',
      tracking_number: 'TRACK123',
      label_url: 'http://label.url',
      status: 'Created',
      estimated_delivery: '2025-06-01',
    };

    mock.onPost('https://api.interparcel.com/shipments/add').reply(200, mockResponse);

    const result = await addShipment(apiKey, requestData);

    expect(result).toEqual(mockResponse);
  });

  it('throws error on API failure', async () => {
    mock.onPost('https://api.interparcel.com/shipments/add').reply(500);

    await expect(addShipment(apiKey, requestData)).rejects.toThrow('Shipment API error');
  });
});
