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

    /**
     * Selects a random item from the inventory list and adds it to the cart.
     * Waits for the add-to-cart button to be visible before clicking.
     * Returns the added item's `name` and `price` for later verification.
     */
    async addRandomItemToCart() {
        const items = this.inventoryList.locator('.inventory_item');
        const itemCount = await items.count() - 1;
        const randomIndex = Math.floor(Math.random() * itemCount);
        const randomItem = items.nth(randomIndex);
        const addToCartButton = randomItem.locator('button[data-test^="add-to-cart-sauce-labs-"]');
        await addToCartButton.waitFor({ state: 'visible', timeout: 10000 });
        await addToCartButton.click();

        const name = await randomItem.locator('.inventory_item_name').innerText();
        const price = await randomItem.locator('.inventory_item_price').innerText();

        return { name, price };
    }

    /**
     * Verifies that an item matching the provided `name` and `price` is present
     * in the shopping cart. Navigates to the cart and asserts the item and
     * quantity are correct.
     * @param itemData Object with `name` and `price` fields to assert in the cart
     */
    async verifyItemInCart(itemData: { name: string; price: string }) {
        const randomItemName = itemData.name;
        const randomItemPrice = itemData.price;

        await this.shoppingCartButton.click();
        await expect(
            this.cartList.locator('.inventory_item_name')
        ).toContainText(randomItemName);
        await expect(
            this.cartList.locator('.inventory_item_price')
        ).toContainText(randomItemPrice);
        await expect(this.itemQuantity).toContainText('1');
    }

    /**
     * Removes an item from the cart by clicking the remove button and waits
     * for the item to be removed from the DOM.
     */
    async removeItemFromCart() {
        const removeButton = this.page.locator('button[data-test^="remove-sauce-labs-"]');
        await removeButton.click();
        await this.removedCartItem.waitFor({ state: 'hidden' });

    }
}