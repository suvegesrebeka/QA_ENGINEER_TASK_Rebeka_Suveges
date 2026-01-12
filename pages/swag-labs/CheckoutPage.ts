import { expect, Locator, Page } from "@playwright/test";

export class CheckoutPage {
    private page: Page;
    private checkoutButton: Locator;
    private checkoutSummaryContainer: Locator;
    constructor(page: Page) {
        this.page = page;
        this.checkoutButton = page.locator('[data-test="checkout"]');
        this.checkoutSummaryContainer = page.locator('[data-test="checkout-summary-container"]');
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

    async verifyItemInOverview(randomItem: Locator) {
        console.log("RANDOM ITEM", randomItem.innerHTML());

        const randomItemName = await randomItem.locator('[data-test="inventory_item_name"]').textContent() || '';
        const randomItemPrice = await randomItem.locator('[data-test="inventory_item_price"]').textContent() || '';
        const checkoutItemName = this.checkoutSummaryContainer.locator('[data-test="inventory_item_name"]');
        const checkoutItemPrice = this.checkoutSummaryContainer.locator('[data-test="inventory_item_price"]');

        expect(checkoutItemName).toContainText(randomItemName);
        expect(checkoutItemPrice).toContainText(randomItemPrice);
    }
}