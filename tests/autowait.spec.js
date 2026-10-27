import { test, expect } from '@playwright/test';
 
test('waits for text that appears late', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/dynamic_loading/2');
  await page.getByRole('button', { name: 'Start' }).click();
  await expect(page.locator('#finish')).toHaveText('Hello World!', { timeout: 10000 });
});
 
test('waits for an element to become enabled', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/dynamic_controls');
  await page.getByRole('button', { name: 'Enable' }).click();
  await expect(page.locator('#input-example input')).toBeEnabled();
  await page.locator('#input-example input').fill('auto-waiting works');
});
 
// Run once to see why one-shot checks are flaky, then delete the BAD test.
test('BAD: one-shot check fails', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/dynamic_loading/1');
  await page.getByRole('button', { name: 'Start' }).click();
  const visible = await page.locator('#finish').isVisible();
  expect(visible).toBe(true);
});
 
// GOOD version of the same check
test('GOOD: web-first assertion retries', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/dynamic_loading/1');
  await page.getByRole('button', { name: 'Start' }).click();
  await expect(page.locator('#finish')).toBeVisible({ timeout: 10000 });
});
