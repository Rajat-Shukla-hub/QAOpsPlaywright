const {test,expect} = require('@playwright/test');


test('calander testing', async ({page})=>
{

    const month ="May";
    const date= "30";
    const year = "2003";
    await page.goto("https://practice-automation.com/calendars/");
    await page.locator("[name='g1065-1-selectorenteradate']").click();
    await page.locator(".dp-cal-month").click();
    await page.getByText(month).click();

    await page.locator(".dp-cal-year").click();

    await page.getByRole("button", {name:year}).click();


   await page.locator(".dp-day:not(.dp-edge-day)").filter({hasText:date})
              .click();
}); 