const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pageobjectmodel/LoginPage');
const { Dashboard } = require('../pageobjectmodel/Dashboard');
const { Checkoutpage } = require('../pageobjectmodel/Checkoutpage');
const { Paymentpage } = require('../pageobjectmodel/Paymentpage');
const { Thankyoupage } = require('../pageobjectmodel/Thankyoupage');
const {Myorderspage}=require('../pageobjectmodel/Myorderspage');

test('@Web page object model', async ({ browser }) => {
    const userName = 'kosol10416@aspensif.com';
    const password = 'Testing@123';
    const finalproduct = "ZARA COAT 3";


    const br = await browser.newContext();
    const page = await br.newPage();

    const loginPage = new LoginPage(page);
    await loginPage.goUrl();
    await loginPage.validlog(userName, password);

    const dashboardpage = new Dashboard(page);
    await dashboardpage.selectProductAddCart(finalproduct);
    await dashboardpage.moveingToCart();

    const checkoutpage = new Checkoutpage(page);
    await checkoutpage.checkout();

    const paymentpage = new Paymentpage(page);
    await paymentpage.enterpaymentdetails(userName)

    const thankyoupage = new Thankyoupage(page);
    const extractedOrderId = await thankyoupage.orerconfirmed();
    const cleanedOrderId = extractedOrderId.replace(/\|/g, "").trim();

    await expect(thankyoupage.thankstext).toHaveText(" Thankyou for the order. ");
   await  thankyoupage.clicksubmite();

   const myorderspage = new Myorderspage(page);
     myorderspage.orderdetilas(cleanedOrderId);
   

    const getorderhistroryID = await page.locator("div.col-text").textContent();
    await expect(cleanedOrderId.includes(getorderhistroryID)).toBeTruthy();

});