const {test,expect,request} = require('@playwright/test');
 const {ApiLoginOrder}=require('./Utils/ApiLoginOrder');
const userdata ={userEmail: "kosol10416@aspensif.com", userPassword: "Testing@123"};
const orderdata= {orders: [{country: "Montserrat", productOrderedId: "6960ea76c941646b7a8b3dd5"}]};
let response ;

test.beforeAll(async()=>
{
   
    const apicontext = await request.newContext();
    const apiutils =  new ApiLoginOrder(apicontext, userdata);
          response = await apiutils.createorder(orderdata);
  
}    
);


test('API use for login and order', async ({page})=>
{

     await page.addInitScript(value=>
       {
         window.localStorage.setItem('token',value);
        }, 
          response.token);


    await page.goto("https://rahulshettyacademy.com/client");
   
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    console.log(await page.title());
    
    console.log(response.orderid);

    await page.pause();

    await page.getByRole("button",{name:'  ORDERS'}).click();

       await page.locator("table").waitFor();
     const row =await page.locator("table tbody tr").filter({hasText:response.orderid});
     await row.getByRole("button", {name:'View'}).click();
    
    
     await expect(page.getByText(response.orderid)).toBeVisible();
    await expect(response.orderid).toBeTruthy();

});