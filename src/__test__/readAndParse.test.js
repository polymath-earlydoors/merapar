import { default as readAndParse } from "../readAndParse"

describe('File input test suite', () => {
    beforeEach( () => {
        jest.resetModules()
        jest.resetAllMocks()
    })
    test('the file is found', async () => {
        const validFileName = 'merapar.csv'
        const expectedArray = [
            {
                DepartmentName: 'New York',
                Date: '2020-01-01',
                Sales: 100
            },
            {
                DepartmentName: 'Boston',
                Date: '2020-01-01',
                Sales: 50
            },
            {
                DepartmentName: 'New York',
                Date: '2020-01-02',
                Sales: 30
            }
        ]

        const responseArray = await readAndParse(validFileName)

        expect(responseArray).toEqual(expectedArray)
    })
})