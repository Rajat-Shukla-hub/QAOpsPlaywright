// @ts-check
import { defineConfig, devices } from '@playwright/test';


export default defineConfig({
  testDir: './tests',
  retries : 2, // use to rerun failed test cases twice
 timeout : 40*1000,
 expect  :
 {
  timeout : 50*1000,
 },

 
  reporter: 'html',

  projects :
  [
    {
      name: 'chrome',
       use: {
   browserName : "chromium",
   headless : false,
   screenshot :'on',
   trace:'retain-on-failure',
    ...devices['Microsoft Lumia 950 landscape'], //used for mobile devices emulator
    }
  },
  {
  name : 'firefox' ,

   use: {
   browserName : "firefox",
   headless : false,
   screenshot :'on',
   trace:'retain-on-failure',
  
  }
},

    
  ]
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
 


});

