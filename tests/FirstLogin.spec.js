const {test, expect, selectOption}=require('@playwright/test');
const { it } = require('@playwright/test');

test('Login the page', async({page})=>
{
  // await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  // console.log(await page.title());
  // await  expect(page).toHaveTitle("Let's Shop");
  //  await page.locator(".text-reset").click(); 
  //  await page.locator("[type='firstName']").fill("Test");
  //  await page.locator("[type='lastName']").fill("Practice");
  //  await page.locator("input#userEmail").fill("kosol10416@aspensif.com");
  //  await page.locator("input#userMobile").fill("9803489078");
  //  //await page.locator("select.custom-select").selectOption("3: Student");
  //  await page.locator("[value='Male']").click();
  //  await page.locator("#userPassword").fill("Testing@123");
  //  await page.locator("#confirmPassword").fill("Testing@123");
  //  await page.locator("[type='checkbox']").check();
  //  await page.locator("#login").click();
   await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
   await page.locator("#userEmail").fill("kosol10416@aspensif.com");
   await page.locator("#userPassword").fill("Testing@123");
   await page.locator("#login").click();
   await page.waitForLoadState('networkidle');

  
  // expect (page.locator("#toast-container")).toHaveText("Incorrect email or password. "); wrong input message check
  const items = await page.locator(".card-body b").allTextContents();
   console.log(items);

});