import { Page, Locator, expect } from '@playwright/test';
import { loginErrorMessages } from '../../utils/loginErrorMessages';
import { env } from '../../utils/envWrapper';

export class LoginPage {
    private page: Page;
    private usernameInput: Locator;
    private passwordInput: Locator;
    private loginButton: Locator;
    private errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator('[data-test="username"]');
        this.passwordInput = page.locator('[data-test="password"]');
        this.loginButton = page.locator('[data-test="login-button"]');
        this.errorMessage = page.locator('[data-test="error"]');
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async successfulLogin() {
        const landingPageUrl = env.uiBaseUrl + env.homePageUrl;

        await this.usernameInput.fill(env.users.standard.username);
        await this.passwordInput.fill(env.users.standard.password);
        await this.loginButton.click();
        await expect(this.page).toHaveURL(landingPageUrl)

    }

    async expectLoginErrorMessage(errorType: keyof typeof loginErrorMessages) {
        const expectedText = loginErrorMessages[errorType];
        const actualText = await this.errorMessage.textContent();

        await expect(this.errorMessage).toBeVisible();
        expect(actualText).toContain(expectedText);

    }
}
