const { test } = require('@playwright/test');

  test('drop down handling', async ({ page }) =>
{
  await page.goto("https://www.globalsqa.com/demo-site/select-dropdown-menu/");
  const dropdown= page.locator("div.single_tab_div select");
 await dropdown.selectOption("DZA");
  
}); 