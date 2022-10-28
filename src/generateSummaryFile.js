import { writeFile } from 'node:fs/promises'

const header = 'Department Name, Sales'
const filename = 'merapar-summary.csv'

const generateSummaryFile = async (summarisedArray) => {
    let data = header
    summarisedArray.forEach(element => {
      data += `\n${element.DepartmentName},${element.Sales}`
    })
    try {
        await writeFile(
                filename, data)
  
        console.log('File written successfully')
  
    } catch (err) {
        console.error(err)
    }
}

export default generateSummaryFile