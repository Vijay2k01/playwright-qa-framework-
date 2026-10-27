import {test,expect} from '@playwright/test';

test.beforeEach(async({page})=>{
    await page.goto('https://www.saucedemo.com');
    await page.getByTestId('username').fill('standard_user');
    await page.getByTestId('password').fill('secret_sauce');
    await page.getByTestId('login-button').click();
});

test('products page load correctly',{ tag: '@smoke' }, async({page})=>{
    await expect(page).toHaveURL('/inventory/');
    await expect(page).toHaveTitle('Swag Labs');
    await expect(page.getByTestId('title')).toHaveText('Products');
    await expect(page.locator('.inventory_item')).toHaveCount(6);
});

test('add and remove an item updates the cart badge', async({page})=>{
    const backpack = page.locator('.inventory_item').filter({ hasText: 'Sauce Labs Backpack' });
  const badge = page.locator('.shopping_cart_badge');
    await backpack.getByRole('button', { name: 'Add to cart' }).click();
  await expect(badge).toHaveText('1');
  await expect(backpack.getByRole('button', { name: 'Remove' })).toBeVisible();
 
  await backpack.getByRole('button', { name: 'Remove' }).click();
  await expect(badge).toBeHidden();
});
 
test('each product shows a price (soft assertions)', async ({ page }) => {
  const prices = page.locator('.inventory_item_price');
  for (let i = 0; i < 6; i++) {
    await expect.soft(prices.nth(i)).toContainText('$');
  }
});
