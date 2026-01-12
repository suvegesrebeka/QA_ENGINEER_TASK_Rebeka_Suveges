import { test, expect } from '@playwright/test';
import { env } from '../../utils/envWrapper';
import { LoginPage } from '../../pages/swag-labs/LoginPage';

test.describe('Login Feature', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(env.uiBaseUrl);
    });

    test('Successful login with standard user', async ({ page }) => {
        const landingPageUrl = env.uiBaseUrl + env.homePageUrl;
        const { username, password } = env.users.standard;
        const loginPage = new LoginPage(page);
        await loginPage.login(username, password);
        await expect(page).toHaveURL(landingPageUrl);
    });

    test('Login fails with invalid password', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const { username, password } = env.users.invalid;

        await loginPage.login(username, password);
        await loginPage.expectLoginErrorMessage('INVALID_CREDENTIALS')
        await expect(page).toHaveURL(env.uiBaseUrl);
    });

    test('Locked out user cannot login', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const { username, password } = env.users.locked;

        await loginPage.login(username, password);
        await loginPage.expectLoginErrorMessage('LOCKED_OUT');
        await expect(page).toHaveURL(env.uiBaseUrl);
    });

});