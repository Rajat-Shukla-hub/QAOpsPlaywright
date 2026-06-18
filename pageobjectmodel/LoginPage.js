class LoginPage
{

 constructor(page)
 {
    this.page =page;
    this.userName = page.locator("#userEmail");
    this.password =  page.locator("#userPassword");
    this.submit = page.locator("[type='submit']");
 }

 async validlog(userEmail, pass)
 {

    await this.userName.fill(userEmail);
    await this.password.fill(pass);
    await this.submit.click();
    await this.page.waitForLoadState('networkidle');
   
 }

 async goUrl()
 {
    await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
 }

}
module.exports= {LoginPage};
