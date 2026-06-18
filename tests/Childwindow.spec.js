const {test, except} =require('@playwright/test');


 test('@Web Child window', async ({ browser}) =>
{

 const br = await browser.newContext();
 const page =  await br.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
 const linklocator = page.locator(".blinkingText[href='https://rahulshettyacademy.com/documents-request']");
 
 const [newpage] =await Promise.all
 ([
  br.waitForEvent('page'),  // maiking promise as new page will open after clicking the link in next step 
  linklocator.click(),
  ]);

 const text = await newpage.locator(".red").textContent();

 const secondpart = text.split("@")[1];
 console.log(secondpart);
 const maindata=  secondpart.split(" ")[0];
 console.log(maindata); 
 await page.locator("input#username").fill(maindata);

 console.log(await page.locator("input#username").textContent()); //textcontent will not print
  console.log(await page.locator("input#username").inputValue());
});     
