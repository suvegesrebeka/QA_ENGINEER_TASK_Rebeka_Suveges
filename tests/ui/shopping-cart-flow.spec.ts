import { test } from '@playwright/test';
import { env } from '../../utils/envWrapper';
import { LoginPage } from '../../pages/swag-labs/LoginPage';
import { ShoppingCartPage } from '../../pages/swag-labs/ShoppingCartPage';
import { CheckoutPage } from '../../pages/swag-labs/CheckoutPage';

test.describe('Shopping Cart Flow', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(env.uiBaseUrl);
        const loginPage = new LoginPage(page);
        await loginPage.successfulLogin();
    });

    // Test: add a random inventory item to the cart, verify it appears, then remove it
    test('Add item to the cart and remove it', async ({ page }) => {
        const shoppingCartPage = new ShoppingCartPage(page)
        let selectedRandomItemData: { name: string; price: string };
        await test.step('Add a random item to cart and verify it', async () => {
            selectedRandomItemData = await shoppingCartPage.addRandomItemToCart();
            await shoppingCartPage.verifyItemInCart(selectedRandomItemData);
        });

        await test.step('Remove item from cart and verify the empty cart', async () => {
            await shoppingCartPage.removeItemFromCart()
        })
    });

    // Test: complete checkout flow — add item, fill details, verify overview and completion
    test("Checkout process", async ({ page }) => {
        const shoppingCartPage = new ShoppingCartPage(page)
        const checkoutPage = new CheckoutPage(page)
        let selectedRandomItemData: { name: string; price: string };

        await test.step("Add an item to the cart", async () => {
            selectedRandomItemData = await shoppingCartPage.addRandomItemToCart();
            await page.goto(env.uiBaseUrl + env.cartPageUrl);

            await checkoutPage.proceedToCheckout();

        })
        await test.step("Fill checkout information", async () => {
            await checkoutPage.fillCheckoutInformation(env.firstName, env.lastName, env.zipCode);
        });
        await test.step("Verify item in checkout overview", async () => {
            await checkoutPage.verifyItemInOverview(selectedRandomItemData);
        });
        await test.step("verify checkout", async () => {
            await checkoutPage.verifyCheckout();
        });
    });
});