const{test,expect}=require('@playwright/test');
class Checkoutpage
{

 constructor(page)
 {
        this.page =page;
        this.productbanner = page.locator(".cart li");
       this.producttext = page.locator("h3:has-text('ZARA COAT 3')")
       this.checkoutbutton = page.locator("button:has-text('Checkout')");
 }

 async checkout()
 {
    await this.productbanner.waitFor({state: 'visible'});
    const flag = await this.producttext.isVisible(); 
     await  expect(flag).toBeTruthy();
     await this.checkoutbutton.click();

 }

}
module.exports ={Checkoutpage};