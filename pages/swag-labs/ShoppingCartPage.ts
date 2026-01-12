import { expect, Locator, Page } from "@playwright/test";
import { env } from "../../utils/envWrapper";

export class ShoppingCartPage {
    private page: Page;
    private inventoryList: Locator;
    private shoppingCartButton: Locator;
    private cartList: Locator;
    private itemQuantity: Locator;
    private removedCartItem: Locator;
    private checkoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.inventoryList = page.locator('[data-test="inventory-list"]');
        this.shoppingCartButton = page.locator('[data-test="shopping-cart-link"]');
        this.cartList = page.locator('[data-test="cart-list"]');
        this.itemQuantity = page.locator('[data-test="item-quantity"]');
        this.removedCartItem = page.locator('.removed_cart_item');
        this.checkoutButton = page.locator('[data-test="checkout"]');
    }

    async addRandomItemToCart() {
        const items = this.inventoryList.locator('.inventory_item');
        const itemCount = await items.count();
        const randomIndex = Math.floor(Math.random() * itemCount);
        const randomItem = items.nth(randomIndex);
        const addToCartButton = randomItem.locator('button[data-test^="add-to-cart-sauce-labs-"]');

        await addToCartButton.click();
        return randomItem
    }

    async verifyItemInCart(randomItem: Locator) {
        const randomItemName = await randomItem.locator('.inventory_item_name').textContent() || '';
        const randomItemPrice = await randomItem.locator('.inventory_item_price').textContent() || '';

        await this.shoppingCartButton.click();
        await expect(
            this.cartList.locator('.inventory_item_name')
        ).toContainText(randomItemName);
        await expect(
            this.cartList.locator('.inventory_item_price')
        ).toContainText(randomItemPrice);
        await expect(this.itemQuantity).toContainText('1');
    }

    async removeItemFromCart() {
        const removeButton = this.page.locator('button[data-test^="remove-sauce-labs-"]');
        await removeButton.click();
        await this.removedCartItem.waitFor({ state: 'hidden' });

    }

}