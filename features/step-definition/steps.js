const { When, Then, Given } = require('@cucumber/cucumber');
const { POManager } = require('../../pageobjectmodel/POManager');
const {expect} = require('@playwright/test');
const {chromium } = require('@playwright/test');


Given('login application with {string} and {string}', async function (userName, password) {
    // Write code here that turns the phrase above into concrete actions


     this.loginPage =this.pomanager.givelogin();
      this.userName =userName;
    await this.loginPage.goUrl();
    await this.loginPage.validlog(userName, password);
});

When('Add {string} to the card', async function (productName) {
    // Write code here that turns the phrase above into concrete actions
     this.dashboardpage = this.pomanager.givedashboardpage();
    await this.dashboardpage.selectProductAddCart(productName);
    await this.dashboardpage.moveingToCart();
});

Then('verify {string} is displayed in cart.', async function (string) {
    // Write code here that turns the phrase above into concrete actions
    const checkoutpage = this.pomanager.givecheckoutpage();
    await checkoutpage.checkout();
});

When('Complete the order after making payment',async function () {

    const paymentpage = this.pomanager.givepaymentpage();
    await paymentpage.enterpaymentdetails(this.userName)
});

Then('verify that product is present in Order details page', async function () {
    // Write code here that turns the phrase above into concrete actions

     this.thankyoupage = this.pomanager.givethankyoupage();
    const extractedOrderId = await this.thankyoupage.orerconfirmed();
     this.cleanedOrderId = extractedOrderId.replace(/\|/g, "").trim();

    await expect(this.thankyoupage.thankstext).toHaveText(" Thankyou for the order. ");
    await this.thankyoupage.clicksubmite();
    const myorderpage = this.pomanager.givemyorderspage();
    myorderpage.orderdetilas(this.cleanedOrderId);

    const getorderhistroryID = await this.page.locator("div.col-text").textContent();
    await expect(this.cleanedOrderId.includes(getorderhistroryID)).toBeTruthy();
    await expect(getorderhistroryID).toContain(this.cleanedOrderId);
});


Given('login in website with {string} and {string}', async function (username, password) {
  // Write code here that turns the phrase above into concrete actions
   await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");

   await this.page.locator("#userEmail").fill(username);
   await this.page.locator("#userPassword").fill(password);
   await this.page.locator("#login").click();
   await this.page.waitForLoadState('networkidle');
});

Then('verify login is not successfull.', async function () {
  expect (this.page.locator("#toast-container")).toHaveText("Incorrect email or password. ");
});