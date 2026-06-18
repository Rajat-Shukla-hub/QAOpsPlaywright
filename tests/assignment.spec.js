const {test,expect} = require('@playwright/test');


test('assignment' ,async({page})=>
{


    await page.goto("https://eventhub.rahulshettyacademy.com");
    await page.getByPlaceholder("you@email.com").fill("kosol10416@aspensif.com");
    await page.getByLabel("Password").fill("Testing@321");
    await page.getByRole("button",{name: 'Sign In'}).click();
    await page.getByRole("button",{name:'Admin'}).click();
    await page.locator(".flex[href*='events']").click();

    await page.locator("#event-title-input").fill("${Date.now()}");

    await page.getByPlaceholder("Describe the event…").fill("Assesment");

    await page.locator("#category").selectOption({value: "Concert"});
    await page.getByLabel("City").fill("Noida");
    await page.getByLabel("Venue").fill("NOida city sector 14");

   await page.getByLabel("Event Date & Time").pressSequentially("04/04/2027");
    await page.getByLabel("Price ($)").fill("100");
    await page.getByLabel("Total Seats").fill("200");
    await page.getByRole("button",{name:'+ Add Event'}).click();

    await page.locator("[href='/events']").first().click();
    await page.locator("#event-card").first().waitFor();

    
    //await expect(page.locator("#event-card").getByText("test")).toBeVisible();
   
    await expect(page.locator("#event-card").filter({hasText:'test'})).toBeVisible();
   

   console.log(await page.locator("#event-card").filter({hasText:'test'}).getByText('seat').innerText());
     
   await page.locator("#event-card").filter({hasText:'test'}).getByTestId("book-now-btn").click();

   await page.getByText("Book Tickets").waitFor();

    const ticketno =  await page.getByTestId("ticket-count").innerText();

    await expect("1").toContainText(ticketno);
    await page.getByTestId("customerName").fill("Rajat Kumar");
    await page.getByPlaceholder("you@email.com").fill("test@gmail.com");
    await page.getByLabel("Phone Number").fill("98076890567");
    await page.getByRole("button",{name:'Confirm Booking'}).click();

    await page.getByText("Booking Confirmed! 🎉").waitFor();
}
);