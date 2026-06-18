const {test, expect}=require('@playwright/test');


test('Login the page', async({page})=>
{


   


   await page.goto("https://google.com");
   expect(await page.screenshot()).toMatchSnapshot('firstscreen.png');

   

});