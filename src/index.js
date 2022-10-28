import readAndParse from './readAndParse.js' 
import generateSummaryFile from './generateSummaryFile.js'

try {
  const filename = 'merapar.csv'
  // Read the file and returns objects
  const objectArray = await readAndParse(filename)

  // sum the Sales by DepartmentName
  const summedSalesByDepartmentName = objectArray.map(element => {
    const filteredArray = objectArray.filter(e => e.DepartmentName === element.DepartmentName)
    const sumOfSales = filteredArray.reduce((accumulation, object) => {
        return accumulation + object.Sales
    }, 0)
    
    return { DepartmentName: filteredArray[0].DepartmentName, Sales: sumOfSales }
  })

  // Filter the array into unique DepartmentNames
  const uniqueIds = [];
  const unique = summedSalesByDepartmentName.filter(element => {
    const isDuplicate = uniqueIds.includes(element.DepartmentName);
    if (!isDuplicate) {
        uniqueIds.push(element.DepartmentName);
        return true;
    }
    return false;
  });

  // Write the file
  await generateSummaryFile(unique)  

} catch (err) {
  console.error(err.message);
}


