const {test} = require('@playwright/test');
const { TIMEOUT } = require('node:dns');

test ('loactors new type' ,async ({page})=>

{
 await page.goto("https://rahulshettyacademy.com/angularpractice/");
 await page.getByLabel("Check me out if you Love IceCreams!").check();
 await page.getByLabel("Gender").selectOption("Male");
 await page.getByLabel("Employed").check();
 await page.locator("[name='bday']").fill("1990-01-01");

 

 await page.locator("input[value='Submit']").click();




}
);