import { Page, Locator, expect } from '@playwright/test';
import { loginErrorMessages } from '../../utils/loginErrorMessages';

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

    async expectLoginErrorMessage(errorType: keyof typeof loginErrorMessages) {
        await expect(this.errorMessage).toBeVisible();
        const expectedText = loginErrorMessages[errorType];
        const actualText = await this.errorMessage.textContent();
        expect(actualText).toContain(expectedText);

    }
}
