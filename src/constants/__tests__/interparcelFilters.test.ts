import {
  DOMESTIC_SERVICE_TYPES,
  INTERNATIONAL_SERVICE_TYPES,
  SERVICE_LEVELS,
  PICKUP_TYPES,
  AUSTRALIA_DOMESTIC_SERVICES,
  INTERNATIONAL_SERVICES,
  COUNTRIES,
} from '../interparcelFilters';
import type {
  InterparcelServiceType,
  InterparcelServiceLevel,
  InterparcelPickupType,
  InterparcelService,
  InterparcelCountry,
} from '../types';

describe('Interparcel Filter Constants', () => {
  describe('Service Type Constants', () => {
    test('DOMESTIC_SERVICE_TYPES should be a non-empty array of strings', () => {
      expect(Array.isArray(DOMESTIC_SERVICE_TYPES)).toBe(true);
      expect(DOMESTIC_SERVICE_TYPES.length).toBeGreaterThan(0);
      DOMESTIC_SERVICE_TYPES.forEach((type) => {
        expect(typeof type).toBe('string');
      });
      expect(DOMESTIC_SERVICE_TYPES).toContain<InterparcelServiceType>('Standard');
      expect(DOMESTIC_SERVICE_TYPES).toContain<InterparcelServiceType>('Express');
    });

    test('INTERNATIONAL_SERVICE_TYPES should be a non-empty array of strings', () => {
      expect(Array.isArray(INTERNATIONAL_SERVICE_TYPES)).toBe(true);
      expect(INTERNATIONAL_SERVICE_TYPES.length).toBeGreaterThan(0);
      INTERNATIONAL_SERVICE_TYPES.forEach((type) => {
        expect(typeof type).toBe('string');
      });
      expect(INTERNATIONAL_SERVICE_TYPES).toContain<InterparcelServiceType>('Standard');
      expect(INTERNATIONAL_SERVICE_TYPES).toContain<InterparcelServiceType>('Pallet');
    });
  });

  describe('Service Level and Pickup Type Constants', () => {
    test('SERVICE_LEVELS should be a non-empty array of strings', () => {
      expect(Array.isArray(SERVICE_LEVELS)).toBe(true);
      expect(SERVICE_LEVELS.length).toBeGreaterThan(0);
      SERVICE_LEVELS.forEach((level) => {
        expect(typeof level).toBe('string');
      });
      expect(SERVICE_LEVELS).toContain<InterparcelServiceLevel>('standard');
      expect(SERVICE_LEVELS).toContain<InterparcelServiceLevel>('express');
    });

    test('PICKUP_TYPES should be a non-empty array of strings', () => {
      expect(Array.isArray(PICKUP_TYPES)).toBe(true);
      expect(PICKUP_TYPES.length).toBeGreaterThan(0);
      PICKUP_TYPES.forEach((type) => {
        expect(typeof type).toBe('string');
      });
      expect(PICKUP_TYPES).toContain<InterparcelPickupType>('collection');
      expect(PICKUP_TYPES).toContain<InterparcelPickupType>('dropoff');
    });
  });

  describe('Service List Constants', () => {
    test('AUSTRALIA_DOMESTIC_SERVICES should be a non-empty array of InterparcelService objects', () => {
      expect(Array.isArray(AUSTRALIA_DOMESTIC_SERVICES)).toBe(true);
      expect(AUSTRALIA_DOMESTIC_SERVICES.length).toBeGreaterThan(0);
      AUSTRALIA_DOMESTIC_SERVICES.forEach((service: InterparcelService) => {
        expect(service).toHaveProperty('name');
        expect(typeof service.name).toBe('string');
        expect(service).toHaveProperty('code');
        expect(typeof service.code).toBe('string');
        expect(service).toHaveProperty('type');
        expect(typeof service.type).toBe('string');
        expect(DOMESTIC_SERVICE_TYPES).toContain(service.type);
      });
      const alliedPallet = AUSTRALIA_DOMESTIC_SERVICES.find((s) => s.code === 'ALLPAL');
      expect(alliedPallet).toBeDefined();
      expect(alliedPallet?.name).toBe('Allied Pallet B2B');
    });

    test('INTERNATIONAL_SERVICES should be a non-empty array of InterparcelService objects', () => {
      expect(Array.isArray(INTERNATIONAL_SERVICES)).toBe(true);
      expect(INTERNATIONAL_SERVICES.length).toBeGreaterThan(0);
      INTERNATIONAL_SERVICES.forEach((service: InterparcelService) => {
        expect(service).toHaveProperty('name');
        expect(typeof service.name).toBe('string');
        expect(service).toHaveProperty('code');
        expect(typeof service.code).toBe('string');
        expect(service).toHaveProperty('type');
        expect(typeof service.type).toBe('string');
        expect(INTERNATIONAL_SERVICE_TYPES).toContain(service.type);
      });
      const dhlExpress = INTERNATIONAL_SERVICES.find((s) => s.code === 'DHLEXP');
      expect(dhlExpress).toBeDefined();
      expect(dhlExpress?.name).toBe('Interparcel Express');
    });
  });

  describe('Country Constants', () => {
    test('COUNTRIES should be a non-empty array of InterparcelCountry objects', () => {
      expect(Array.isArray(COUNTRIES)).toBe(true);
      expect(COUNTRIES.length).toBeGreaterThan(0);
      COUNTRIES.forEach((country: InterparcelCountry) => {
        expect(country).toHaveProperty('name');
        expect(typeof country.name).toBe('string');
        expect(country).toHaveProperty('code');
        expect(typeof country.code).toBe('string');
      });
      const australia = COUNTRIES.find((c) => c.code === 'AU');
      expect(australia).toBeDefined();
      expect(australia?.name).toBe('Australia');

      const usa = COUNTRIES.find((c) => c.code === 'US');
      expect(usa).toBeDefined();
      expect(usa?.name).toBe('USA');
    });
  });
});
