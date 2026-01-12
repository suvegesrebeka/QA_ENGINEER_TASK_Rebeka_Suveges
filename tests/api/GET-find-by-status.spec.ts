import { test, expect } from '@playwright/test';
import { Pet } from '../../utils/api/types/pet';
import { PetStatus } from '../../utils/api/petStatusNames';
import { env } from '../../utils/envWrapper';


test.describe('PetStore API - Find Pets by Status', () => {

  // Test: request pets with status 'sold' and assert all returned pets are sold
  // and contain required fields 
  test('should return only sold pets', async ({ request }) => {
    const response = await request.get(`${env.apiBaseUrl}${env.findByStatusEndpoint}`, {
      params: { status: PetStatus.SOLD }
    });
    console.log(`VEGPONT: ${env.apiBaseUrl}${env.findByStatusEndpoint}`);
    const pets = await response.json();

    expect(response.status()).toBe(200);
    expect(pets.length).toBeGreaterThan(0);

    pets.forEach((pet: Pet) => {
      expect(pet.status).toBe(PetStatus.SOLD);
      expect(pet.id).toBeDefined();
      expect(pet.tags).toBeDefined();
      expect(pet.photoUrls).toBeInstanceOf(Array);
    });
  });

  // Test: request pets with an invalid status value and expect an empty array
  test('should return empty array for invalid status', async ({ request }) => {
    const response = await request.get(`${env.apiBaseUrl}${env.findByStatusEndpoint}`, {
      params: { status: 'invalidStatus' }
    });

    expect(response.status()).toBe(200);// ERROR - According to the documentation, it should return a 400 response.
    const pets = await response.json();

    expect(pets).toEqual([]);
  });

});