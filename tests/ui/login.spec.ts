import { test, expect } from '@playwright/test';
import { env } from '../../utils/envWrapper';
import { LoginPage } from '../../pages/swag-labs/LoginPage';

test.describe('Login Feature', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(env.uiBaseUrl);
    });

    // Test: standard user can login and is redirected to the landing page
    test('Successful login with standard user', async ({ page }) => {
        const landingPageUrl = env.uiBaseUrl + env.homePageUrl;
        const { username, password } = env.users.standard;
        const loginPage = new LoginPage(page);
        await loginPage.login(username, password);
        await expect(page).toHaveURL(landingPageUrl);
    });

    // Test: invalid credentials show the correct error message and stay on login
    test('Login fails with invalid password', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const { username, password } = env.users.invalid;

        await loginPage.login(username, password);
        await loginPage.expectLoginErrorMessage('INVALID_CREDENTIALS')
        await expect(page).toHaveURL(env.uiBaseUrl);
    });

    // Test: locked out user receives the LOCKED_OUT message and cannot login
    test('Locked out user cannot login', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const { username, password } = env.users.locked;

        await loginPage.login(username, password);
        await loginPage.expectLoginErrorMessage('LOCKED_OUT');
        await expect(page).toHaveURL(env.uiBaseUrl);
    });

});