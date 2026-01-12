import { expect, Locator, Page } from "@playwright/test";

export class CheckoutPage {
    private page: Page;
    private checkoutButton: Locator;
    private checkoutSummaryContainer: Locator;
    private checkoutCompleteContainer: Locator;

    constructor(page: Page) {
        this.page = page;
        this.checkoutButton = page.locator('[data-test="checkout"]');
        this.checkoutSummaryContainer = page.locator('[data-test="checkout-summary-container"]');
        this.checkoutCompleteContainer = page.locator('[data-test="checkout-complete-container"]');
    }

    async proceedToCheckout() {
        await this.checkoutButton.click();
    }

    async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
        const firstNameInput = this.page.locator('[data-test="firstName"]');
        const lastNameInput = this.page.locator('[data-test="lastName"]');
        const postalCodeInput = this.page.locator('[data-test="postalCode"]');
        const continueButton = this.page.locator('[data-test="continue"]');
        await firstNameInput.fill(firstName);
        await lastNameInput.fill(lastName);
        await postalCodeInput.fill(postalCode);
        await continueButton.click();
    }

    async verifyItemInOverview(itemData: { name: string; price: string }) {
        const randomItemName = itemData.name;
        const randomItemPrice = itemData.price;
        const checkoutItemName = this.checkoutSummaryContainer.locator('[data-test="inventory-item-name"]').first();
        const checkoutItemPrice = this.checkoutSummaryContainer.locator('[data-test="inventory-item-price"]').first();

        await expect(checkoutItemName).toContainText(randomItemName);
        await expect(checkoutItemPrice).toContainText(randomItemPrice);
        const finishButton = this.page.locator('button[data-test="finish"]');
        await finishButton.click();
    }

    async verifyCheckout() {
        await expect(this.checkoutCompleteContainer).toBeVisible();
    }
}