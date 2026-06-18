const {test, expect}=require('@playwright/test');

test('lauch the browser', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
   console.log(await page.title());
 
});

test('lauch broser without using code line', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  const pagetitle= await page.title();
   console.log(pagetitle);
  await expect(page).toHaveTitle("Fast and reliable end-to-end testing for modern web apps | Playwright");


});
