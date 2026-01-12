import { test, expect } from '@playwright/test';
import { env } from '../../utils/envWrapper';

test.describe('Petstore API - Update Pet in the store with Form Data', () => {
    const id = 2;
    const newName = `BarkaUpdated_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    const newStatus = 'sold';

    // Test: update an existing pet using form data and assert 200 + expected body
    test('should update pet name and status using form data', async ({ request }) => {
        const response = await request.post(`${env.apiBaseUrl}/${id}`, {
            form: {
                name: newName,
                status: newStatus,
            },
            headers: {
                'Accept': 'application/json',
            },
        });
        const body = await response.json();
        expect(response.status()).toBe(200);
        expect(body.message).toBe(`${id}`);

    });

    // Test: attempt to update a non-existent pet id and expect a 404 response
    test('should return 404 when pet id does not exist', async ({ request }) => {
        const NON_EXISTENT_ID = 4444444;

        const response = await request.post(`${env.apiBaseUrl}/${NON_EXISTENT_ID}`, {
            form: {
                name: newName,
                status: newStatus,
            },
        });

        const body = await response.json();

        expect(response.status()).toBe(404);
        expect(body).toMatchObject({
            code: 404,
            type: 'unknown',
            message: expect.stringContaining('not found')
        });
    });

});