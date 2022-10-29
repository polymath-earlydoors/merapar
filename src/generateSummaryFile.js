import { createWriteStream } from 'node:fs'

const header = 'Department Name, Sales'
const filename = 'merapar-summary.csv'

const generateSummaryFile = async (summarisedArray) => {
    try {
        let summaryFile = createWriteStream(filename)
        summaryFile.on('error', (err) => { console.error(err) })
        summaryFile.write(header)
        summarisedArray.forEach(element => {
          const record = `\n${element.DepartmentName},${element.Sales}`
          summaryFile.write(record)
        })
        summaryFile.end()  
        console.log('File written successfully')
  
    } catch (err) {
        console.error(err)
    }
}

export default generateSummaryFile