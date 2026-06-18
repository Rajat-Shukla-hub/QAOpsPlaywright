const base =require('@playwright/test');


exports.customtest =base.test.extend(

{
testdatafororder :{
 userName :"kosol10416@aspensif.com",
     password : "Testing@123",
     finalproduct : "ZARA COAT 3"

}
}
);