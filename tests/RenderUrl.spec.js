const { test,expect} = require('@playwright/test');


test('security testing', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator("#userEmail").fill("kosol10416@aspensif.com");
    await page.locator("#userPassword").fill("Testing@123");
    await page.locator("[type='submit']").click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();

   

    await page.getByText("  ORDERS").click();
     await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        async route => route.continue({ url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6" })
    )
    await page.getByRole("button", { name: 'View' }).first().click();

    await page.pause();





});