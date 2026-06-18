const {Checkoutpage}=require('./Checkoutpage');
const {Dashboard}=require('./Dashboard');
const {LoginPage}=require('./LoginPage');
const {Paymentpage}=require('./Paymentpage');
const {Thankyoupage}=require('./Thankyoupage');
const {Myorderspage}=require('./Myorderspage');

class POManager
{
   constructor(page)
   {
    this.page = page;
    this.loginPage = new LoginPage(page)
    this.checkoutpage = new Checkoutpage(page);
    this.dashboard =new  Dashboard(page);
    this.paymentpage = new Paymentpage(page);
    this.thankyoupage = new Thankyoupage(page);
    this.myorderspage = new Myorderspage(page);

   } 

   givelogin()
   {
    return this.loginPage;
   }

   givedashboardpage()
   {
     return this.dashboard;
   }

   givepaymentpage()
   {
    return this.paymentpage;
   }
   givecheckoutpage()
   {
    return this.checkoutpage;
   }
   givethankyoupage()
   {
    return this.thankyoupage;
   }
   givemyorderspage()
   {
    return this.myorderspage;
   }


}

module.exports ={POManager};