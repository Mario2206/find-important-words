const {displayDictionary} = require('../../src/utils/display')

describe("Display", () => {

    it("should format the dictionary to an user can easily read it", () => {

        const dictionary = [
            {
                word: "text",
                quantity : 3
            },
            {
                word: "super",
                quantity: 2
            },
            {
                word: "famous",
                quantity: 1
            }
        ]

        const expectedOutput = "text : 3\nsuper : 2\nfamous : 1\n"

        const result = displayDictionary(dictionary)

        expect(result).toBe(expectedOutput)

    })

})