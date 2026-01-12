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

    /**
     * Clicks the checkout button on the shopping cart page to navigate to
     * the checkout information form.
     */
    async proceedToCheckout() {
        await this.checkoutButton.click();
    }

    /**
     * Fills the checkout information form
     * and clicks the continue button to proceed to the overview page.
     */
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

    /**
     * Verifies that the supplied item (name and price) appears in the checkout
     * overview and clicks the finish button to complete the order.
     * @param itemData Object containing `name` and `price` of the expected item
     */
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

    /**
     * Asserts that the checkout complete container is visible, indicating
     * the checkout flow finished successfully.
     */
    async verifyCheckout() {
        await expect(this.checkoutCompleteContainer).toBeVisible();
    }
}