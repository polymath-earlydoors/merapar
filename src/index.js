import parseData from './parseData.js' 
import generateSummaryFile from './generateSummaryFile.js'

try {
  // Read the file
  const dataArray = await parseData()

  // separate the strings into arrays
  const splitStringArray = Array.from(dataArray, element => element.split(','))

  // create objects from the array elements
  const objectArray = splitStringArray.map(element => ({
    DepartmentName: element[0].valueOf(),
    Date: element[1].valueOf(),
    Sales: Number(element[2].valueOf())
  }))

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


