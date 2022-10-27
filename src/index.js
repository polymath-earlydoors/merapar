import { readFile } from 'node:fs/promises';
import { writeFile } from 'node:fs/promises';

try {
  const filePath = new URL('../merapar.csv', import.meta.url);
  const contents = await readFile(filePath, { encoding: 'utf8' });
  // remove the Headers
  const [, ...dataArray] = contents.split(/\r?\n/);

  const splitStringArray = Array.from(dataArray, element => element.split(','))

  const objectArray = splitStringArray.map(element => ({
    DepartmentName: element[0].valueOf(),
    Date: element[1].valueOf(),
    Sales: Number(element[2].valueOf())
  }))

  const summedSalesByDepartmentName = objectArray.map(element => {
    const filteredArray = objectArray.filter(e => e.DepartmentName === element.DepartmentName)
    const sumOfSales = filteredArray.reduce((accumulation, object) => {
        return accumulation + object.Sales
    }, 0)
    
    return { DepartmentName: filteredArray[0].DepartmentName, Sales: sumOfSales }
  })

  const uniqueIds = [];
  const unique = summedSalesByDepartmentName.filter(element => {
    const isDuplicate = uniqueIds.includes(element.DepartmentName);
    if (!isDuplicate) {
        uniqueIds.push(element.DepartmentName);
        return true;
    }
    return false;
  });


  let data = "Department Name, Sales";
  unique.forEach(element => {
    data += `\n${element.DepartmentName},${element.Sales}`
  } );

(async function main() {
    try {
        await writeFile(
                "merapar-summary.csv", data)
  
        console.log("File written successfully");
        console.log("The written file has"
            + " the following contents:");
  
         console.log("" + 
            readFile("./merapar-summary.csv"));
  
    } catch (err) {
        console.error(err);
    }
})()

  

} catch (err) {
  console.error(err.message);
}


