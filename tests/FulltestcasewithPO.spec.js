const { test, expect } = require('@playwright/test');
 const {customtest} =require('../TestData/fixturedataccase')
const {POManager} =require('../pageobjectmodel/POManager');
 const data = JSON.parse(JSON.stringify(require('../TestData/Testdata.json')));


test(`data use in fixture ${data.finalproduct}`, async ({ browser}) => {


     const br = await browser.newContext();
    const page = await br.newPage();
     const pomanager = new POManager(page);
    
    const loginPage =  pomanager.givelogin();
    await loginPage.goUrl();
    await loginPage.validlog(data.userName, data.password);

    const dashboardpage = pomanager.givedashboardpage();
    await dashboardpage.selectProductAddCart(data.finalproduct);
    await dashboardpage.moveingToCart();

    const checkoutpage = pomanager.givecheckoutpage();
    await checkoutpage.checkout();
  
    const paymentpage = pomanager.givepaymentpage();
    await paymentpage.enterpaymentdetails(data.userName)

    const thankyoupage = pomanager.givethankyoupage();
    const extractedOrderId = await thankyoupage.orerconfirmed();
    const cleanedOrderId = extractedOrderId.replace(/\|/g, "").trim();

    await expect(thankyoupage.thankstext).toHaveText(" Thankyou for the order. ");
    await  thankyoupage.clicksubmite();

   
    const myorderpage = pomanager.givemyorderspage();
    myorderpage.orderdetilas(cleanedOrderId);
    
   const getorderhistroryID = await page.locator("div.col-text").textContent();
    await expect(cleanedOrderId.includes(getorderhistroryID)).toBeTruthy();

});


customtest(`data use in fixture`, async ({ browser,testdatafororder}) => {


     const br = await browser.newContext();
    const page = await br.newPage();
     const pomanager = new POManager(page);
    
    const loginPage =  pomanager.givelogin();
    await loginPage.goUrl();
    await loginPage.validlog(testdatafororder.userName, testdatafororder.password);

    const dashboardpage = pomanager.givedashboardpage();
    await dashboardpage.selectProductAddCart(testdatafororder.finalproduct);
    await dashboardpage.moveingToCart();

    const checkoutpage = pomanager.givecheckoutpage();
    await checkoutpage.checkout();
  
    const paymentpage = pomanager.givepaymentpage();
    await paymentpage.enterpaymentdetails(testdatafororder.userName)

    const thankyoupage = pomanager.givethankyoupage();
    const extractedOrderId = await thankyoupage.orerconfirmed();
    const cleanedOrderId = extractedOrderId.replace(/\|/g, "").trim();

    await expect(thankyoupage.thankstext).toHaveText(" Thankyou for the order. ");
    await  thankyoupage.clicksubmite();

    const myorderpage = pomanager.givemyorderspage();
    myorderpage.orderdetilas(cleanedOrderId);
    
   const getorderhistroryID = await page.locator("div.col-text").textContent();
    await expect(cleanedOrderId.includes(getorderhistroryID)).toBeTruthy();

});