class ApiLoginOrder
{

    constructor(apicontext, userdata)
    {
      this.apicontext = apicontext;
      this.userdata = userdata;
    }

 async gettoken()
 {

    const loginresponse= await this.apicontext.post("https://rahulshettyacademy.com/api/ecom/auth/login", 
       {
            data:this.userdata
        });
       // need to catch response
     const jsonresponse = await loginresponse.json();
       const  token =await jsonresponse.token;
         return token;
   }




    async createorder(orderdata)
    {

         let response ={};
             response.token = await this.gettoken();// adding property to response variable


         const orderapi = await this.apicontext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",

        {
            data: orderdata,

            headers:
            {
                 'Authorization': response.token,
                 'Content-type' :'application/json'   
            }
        }
       )

        // now catch the data from json

        const orderidrespone = await orderapi.json();

         console.log(orderidrespone);
         const orderid = await orderidrespone.orders[0];
         response.orderid = orderid;
         return response;
       };
        
        
 };

 module.exports ={ApiLoginOrder};



