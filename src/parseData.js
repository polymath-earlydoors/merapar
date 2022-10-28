import { readFile } from 'node:fs/promises'

const parseData = async () => {
    const filePath = new URL('../merapar.csv', import.meta.url);
    const contents = await readFile(filePath, { encoding: 'utf8' });
      // remove the Headers
    const [, ...dataArray] = contents.split(/\r?\n/);
    return dataArray
}

export default parseData