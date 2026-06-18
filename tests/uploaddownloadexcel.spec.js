const ExcelJS = require('exceljs');
const {test}=require('@playwright/test');




async function writeexcel(filepath, realtext, replacetext) {


    const wk = new ExcelJS.Workbook();
    await wk.xlsx.readFile(filepath); //filepath is variable

    const ws = wk.getWorksheet('Sheet1');

    const output = await readexcel(ws, realtext)




    const excelcelldata = ws.getCell(output.row, output.column);
    excelcelldata.value = replacetext; //
    await wk.xlsx.writeFile(filepath)

};

async function readexcel(ws, realtext) {
    let output = { row: -1, column: -1 };
    ws.eachRow((row, rownumber) => {
        row.eachCell((cell, columnno) => {
            if (cell.value === realtext) {
                console.log(cell.value);
                output.row = rownumber;
                output.column = columnno;

            }

        }
        )

    }

    )
    return output;
}



// download the file and upload the file then validate changes are correct.

test('upload and downlaod validate excel' , async({page})=>
{
  await page.goto("https://rahulshettyacademy.com/upload-download-test/");

  const event =  page.waitForEvent('download');

  await page.getByRole('button',{name:'Download'}).click();

   const download = await event;
   const  path ="C:/Users/Lenovo/Downloads/download.xlsx" ;

   await download.saveAs (path);
 await writeexcel(path , 'Red', 'ABS');
 
 await page.locator("#fileinput").click();
  await page.locator("#fileinput").setInputFiles(path);

})


