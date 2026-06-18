const {test, expect, selectOption}=require('@playwright/test');
const { it } = require('@playwright/test');

test('Login the page', async({page})=>
{

     // to take full page screenshots
    await page.screenshot({path: 'testing.png'});

   


   await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
   await page.locator("#userEmail").fill("kosol10416@aspensif.com");

    // to take perticular screenshot
     await page.locator("#userEmail").screenshot({path :'test.png'});
   await page.locator("#userPassword").fill("Testing@123");
 
   await page.locator("#login").click();
   await page.waitForLoadState('networkidle');
   const items = await page.locator(".card-body b").allTextContents();
   console.log(items);

});