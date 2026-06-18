

class Thankyoupage
{

    constructor(page)
    {
        this.page =page;
       this.thankstext = page.locator(".hero-primary");
      this.orderid = page.locator(".em-spacer-1 .ng-star-inserted")
      this.orderhistorypage =page.locator("label:has-text('Orders History Page')")
    }

  async  orerconfirmed()
    {
         
        
            const orderidtext =await this.orderid.textContent();
            
            console.log(orderidtext);
         
           const trimOrderId = await orderidtext.replace(/\|/g, "").trim();
            return trimOrderId;

    }

    async  clicksubmite()
    {
     await this.orderhistorypage.click();
    }
    

}
module.exports ={Thankyoupage};