const { test, expect, request } = require('@playwright/test');
const userdata = { userEmail: "kosol10416@aspensif.com", userPassword: "Testing@123" };
const orderdata = { orders: [{ country: "Montserrat", productOrderedId: "6960ea76c941646b7a8b3dd5" }] };
const fakerespose = { data: [], message: "No Orders" };
let token;
let orderid;
test.beforeAll(async () => {

  const apicontext = await request.newContext(); // here we are creating new browser (like) for api
  const loginresponse = await apicontext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
    {
      data: userdata
    });
  // need to catch response
  const jsonresponse = await loginresponse.json();
  token = await jsonresponse.token;
  // make a order with api

  const orderresponse = await apicontext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",

    {
      data: orderdata,

      headers:
      {
        'Authorization': token,
        'Content-type': 'application/json'
      }
    }
  )
  // now catch the data from json

  const orderidrespone = await orderresponse.json();

  console.log(orderidrespone);
  orderid = await orderidrespone.orders[0];


}
);
test('Render the API response', async ({ page }) => {
  

  // injecting the token here so login is not needed
  await page.addInitScript(value => {
    window.localStorage.setItem('token', value);
  },
    token);


  await page.goto("https://rahulshettyacademy.com/client");

  await page.waitForLoadState('networkidle');
  await page.locator(".card-body b").first().waitFor();
  console.log(await page.title());

  console.log(orderid);

  // before clicking on orders button we need to give face response

  await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async route => {
      //intercpeting the response
      //catch the resplose then change it before going to browser 

      const realresp = await page.request.fetch(route.request());

      //now do modication and send to browser
      let body = await JSON.stringify(fakerespose);  //make fakeresponse in json

      route.fulfill(
        {
          realresp,
          body,

        }
      )

    }

  )



  await page.getByRole("button", { name: '  ORDERS' }).click();

  await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")

  console.log(await page.locator(".mt-4").textContent());

});