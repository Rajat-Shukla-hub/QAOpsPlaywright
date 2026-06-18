const { test, expect } = require('@playwright/test');
const { request } = require('node:http');

test('abort api ', async ({ browser }) => {

    const br = await browser.newContext();
    const page = await br.newPage();

     //abort the to load css or any api resposne
    await page.route('**/*.css', route => route.abort());





    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator("#userEmail").fill("kosol10416@aspensif.com");
    await page.locator("#userPassword").fill("Testing@123");

   

    await page.locator("[type='submit']").click();
    await page.waitForLoadState('networkidle');


    await page.locator(".card-body b").first().waitFor();
    console.log(await page.title());
    // await page.pause();
    const textloggedin = page.locator("div[class*='left mt-1'] p");
    await expect(textloggedin).toContainText("Automation Practice");
    const products = await page.locator(".card-body");
    const finalprduct = "ZARA COAT 3";
    const totalproductsize = await products.count();

    for (let i = 0; i < totalproductsize; i++) {
        const selectproduct = await products.nth(i).locator("b").textContent();
        if (selectproduct == finalprduct) {
            await products.nth(i).locator("i.fa.fa-shopping-cart").click();
            break;
        }
    }

    await page.locator("[routerlink*=cart]").click();

    await page.locator(".cart li").waitFor({ state: 'visible' });

    const flag = await page.locator("h3:has-text('ZARA COAT 3')").isVisible(); //check item is added it return boolean

    await expect(flag).toBeTruthy();
    await page.locator("button:has-text('Checkout')").click();
    await page.locator("input[value*='4542']").fill("4542 9931 9292 2293");
    await page.locator("select.input").first().selectOption({ value: '11' });
    await page.locator("select.input").last().selectOption({ value: '29' });
    await page.locator("input[class='input txt']").first().fill("123");
    await page.locator("input[class='input txt']").last().fill("Rajat Shukla");

    await expect(page.locator("label[type='text']")).toHaveText("kosol10416@aspensif.com");

    await page.locator("[placeholder='Select Country']").pressSequentially("ind");
    const autosuggestionbox = page.locator("[class*='ta-results']");
    await autosuggestionbox.waitFor();
    const count = await autosuggestionbox.locator("button").count();

    for (let i = 0; i < count; i++) {
        const selectcountry = await autosuggestionbox.locator("button").nth(i).textContent();
        if (selectcountry.trim() === "India") {
            await autosuggestionbox.locator("button").nth(i).click();
            break;
        }
    }

    await page.locator(".action__submit").click();

    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

    const orderid = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();

    console.log(orderid);

    await page.locator("label:has-text('Orders History Page')").click();

    await page.locator("table").waitFor();
    const rows = await page.locator("table tbody tr");

    const rowscount = await rows.count();
    for (let i = 0; i < rowscount; i++) {
        const selectorderid = await rows.nth(i).locator("th").textContent();
        if (orderid.includes(selectorderid)) {
            console.log(`oderid in history page: ${selectorderid}`);
            await rows.nth(i).locator("button").first().click();

            break;
        }
    }


    const getorderhistroryID = await page.locator("div.col-text").textContent();
    await expect(orderid.includes(getorderhistroryID)).toBeTruthy();

});