import { Page, Locator, expect } from '@playwright/test';
import { loginErrorMessages } from '../../utils/ui/loginErrorMessages';
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

    /**
     * Perform a login using the provided credentials.
     * Fills the username and password fields and clicks the login button.
     */
    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    /**
     * Perform a successful login using the configured `standard` user from `env`.
     * After submitting the credentials, asserts that the page navigated to the
     * expected landing (home) URL.
     */
    async successfulLogin() {
        const landingPageUrl = env.uiBaseUrl + env.homePageUrl;

        await this.usernameInput.fill(env.users.standard.username);
        await this.passwordInput.fill(env.users.standard.password);
        await this.loginButton.click();
        await expect(this.page).toHaveURL(landingPageUrl)
    }

    /**
     * Verify that an expected login error message is displayed.
     * Looks up the expected message text from `loginErrorMessages` and asserts
     * the error container is visible and contains the expected text.
     * @param errorType Key of the expected error message in `loginErrorMessages`
     */
    async expectLoginErrorMessage(errorType: keyof typeof loginErrorMessages) {
        const expectedText = loginErrorMessages[errorType];
        const actualText = await this.errorMessage.textContent();

        await expect(this.errorMessage).toBeVisible();
        expect(actualText).toContain(expectedText);
    }
}
