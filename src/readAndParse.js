import csvParser from 'csv-parser'
import { createReadStream } from 'node:fs'

function processFile(filename){
  let dataArray = [];
  return new Promise(resolve => {
    createReadStream(filename)
    .pipe(csvParser())
    .on('error', (error) => console.log(error.message))
    .on('data', (row) => {
      dataArray.push(
      {
        DepartmentName: row['Department Name'],
        Date: row['Date'],
        Sales: Number(row['Number of sales'])
      })
    })
    .on('end', () => {
      resolve(dataArray)
      console.log('Data parsing completed')
    })
  })
}

const readAndParse = async (filename) => {
  return await processFile(filename)
}

export default readAndParse