const {test, expect} =require('@playwright/test');

 test('E2E test case', async ({browser})=>
{

    const br = await browser.newContext();
    const page = await br.newPage();

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
     await page.getByPlaceholder("email@example.com").fill("kosol10416@aspensif.com");
    await page.getByPlaceholder("enter your passsword").fill("Testing@123");
    await page.getByRole("button",{name: "login"}).click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    console.log(await page.title());
    // await page.pause();
    await page.locator(".col-lg-4").filter({hasText:"iphone 13 pro"}).getByRole("button", {name:' Add To Cart'}).click();
     await page.getByRole("listitem").getByRole("button",{name: "  Cart "}).click();
     await page.locator("li.items").waitFor();

     await expect(page.getByText("iphone 13 pro")).toBeVisible();

     await page.getByRole("button",{name: "Checkout"}).click();

     await page.locator("input[value*='4542']").fill("4542 9931 9292 2293");
      await page.getByRole("combobox").first().selectOption({value:'10'});
     await page.locator("select.input").last().selectOption({value:'29'});
     await page.locator("input[class='input txt']").first().fill("123");
     await page.locator("input[class='input txt']").last().fill("Rajat Shukla");
   
      await expect(page.locator("label[type='text']")).toHaveText("kosol10416@aspensif.com");
    await page.getByPlaceholder("Select Country").pressSequentially("ind");
    await page.getByRole("button",{name:'India'}).nth(1).click();
    await page.getByText("Place Order ").click();
    
    await expect(page.getByText(" Thankyou for the order. ")).toBeVisible();

    const orderidtext =await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    const orderid = orderidtext.replace(/\|/g, "").trim()
    
    console.log(orderid);

    await page.getByText(" Orders History Page ").click();

     await page.locator("table").waitFor();
     const row =await page.locator("table tbody tr").filter({hasText:orderid});
     await row.getByRole("button", {name:'View'}).click();
    
    
     await expect(page.getByText(orderid)).toBeVisible();
    await expect(orderid).toBeTruthy();

});