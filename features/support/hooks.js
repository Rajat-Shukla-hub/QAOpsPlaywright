const { Before, After} = require('@cucumber/cucumber');
const { POManager } = require('../../pageobjectmodel/POManager');
const {AfterStep, BeforeStep, Status} = require('@cucumber/cucumber');
const {chromium } = require('@playwright/test');


Before(async function () {
 
    const browser = await chromium.launch(
         {
             headless :false
         }
     );
     const br = await browser.newContext();
      this.page = await br.newPage();
   
     this.pomanager = new POManager(this.page);

});

After(function () {
  // Assuming this.driver is a selenium webdriver
  console.log("this is last to execuite");
});


BeforeStep( function () {
  console.log("each step before check")
});

AfterStep( async function ({result}) {
  // This hook will be executed after all steps, and take a screenshot on step failure
  if (result.status === Status.FAILED) {
    await this.page.screenshot({path: 'hooksfailed.png'});
  }
});