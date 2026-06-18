const {Thankyoupage}=require('./Thankyoupage');

class Myorderspage {

    constructor(page) {
        this.page = page;
        this.table = page.locator("table");
        this.rows = page.locator("table tbody tr");

    }

    async orderdetilas(OrderId) {

        await this.table.waitFor(); 
        
        const rowscount = await this.rows.count();
        for (let i = 0; i < rowscount; i++) {
            const selectorderid = await this.rows.nth(i).locator("th").textContent();
            if (OrderId.includes(selectorderid)) {
                console.log(`oderid in history page: ${selectorderid}`);
                await this.rows.nth(i).locator("button").first().click();
                break;
            }
        }

    }
}
module.exports = { Myorderspage };