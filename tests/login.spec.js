import {test,expect} from '@playwright/test';

test.describe('Login',()=>{
    test.beforeEach(async({page})=>{
        await page.goto('/');
    });
    test('valid user lands on the products page',async({page})=>{
        await page.getByPlaceholder('Username').fill('standard_user');
        await page.getByPlaceholder('Password').fill('secret_sauce');
        await page.getByRole('button',{name:'Login'}).click();

        await expect(page).toHaveURL(/inventory/);
        await expect(page.getByTestId('title')).toHaveText('Products');
    });
    test('Locked-out user sees an error',async({page})=>{
        await page.getByPlaceholder('Username').fill('locked_out_user');
        await page.getByPlaceholder('Password').fill('secret_sauce');
        await page.getByRole('button',{name:'Login'}).click();

        await expect(page.getByTestId('error')).toContainText('locked out');
        });
});