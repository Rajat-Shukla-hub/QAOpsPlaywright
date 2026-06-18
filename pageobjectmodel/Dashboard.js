class Dashboard {

    constructor(page) {
        this.page = page;
        this.textloggedin = page.locator("div[class*='left mt-1'] p");
        this.products = page.locator(".card-body");
        this.cart = page.locator("[routerlink*=cart]")
        this.firstproduct = page.locator(".card-body b");
    }

   async selectProductAddCart(finalproduct) {
     
    
         await this.firstproduct.first().waitFor();

       //await expect (this.textloggedin).toContainText("Automation Practice"); need to check this line.

        const totalproductsize = await this.products.count();

        for (let i = 0; i < totalproductsize; i++) {
            const selectproduct = await this.products.nth(i).locator("b").textContent();
            if (selectproduct == finalproduct) {
                await this.products.nth(i).locator("i.fa.fa-shopping-cart").click();
                break;
            }
        }


    }
    async moveingToCart() {
        await this.cart.click();
    }

}
module.exports = { Dashboard };