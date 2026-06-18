

class Paymentpage
{

    constructor(page)
    {
        this.page =page;
       this.creditcardno = page.locator("input[value*='4542']");
       this.cradmonthyear =page.locator("select.input");
      this.cvvName = page.locator("input[class='input txt']")
      this.user =page.locator("label[type='text']")
      this.country = page.locator("[placeholder='Select Country']");
      this.autosuggestion = page.locator("[class*='ta-results']");
      this.submitbutton = page.locator(".action__submit");

    }
   async enterpaymentdetails(userName)
    {
          await this.creditcardno.fill("4542 9931 9292 2293");
             await this.cradmonthyear.first().selectOption({value:'11'});
             await this.cradmonthyear.last().selectOption({value:'29'});
             await this.cvvName.first().fill("123");
             await this.cvvName.last().fill("Rajat Shukla");
           
             
        
            await this.country.pressSequentially("ind");
            
            await this.autosuggestion.waitFor();
            const count = await this.autosuggestion.locator("button").count();
            
            for(let i =0; i<count;i++)
            {
                const selectcountry = await this.autosuggestion.locator("button").nth(i).textContent();
             if(selectcountry.trim()==="India")
             {
                await this.autosuggestion.locator("button").nth(i).click();
                break;
             }
            }
        
            await this.submitbutton.click();
    }


}
module.exports ={Paymentpage};