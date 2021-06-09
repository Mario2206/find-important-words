const generateDictionaryOfWords = require('../../src/utils/dictionary')
describe('Dictionary Generator', () => {

    it('should generate a dictionary of words with their quantities', () => {

        const text = 'It is a text for testing and it is cool'

        const expectedDico = [
            {
                word: "it",
                quantity: 2
            },
            {
                word: "is",
                quantity: 2
            },
            {
                word: "a",
                quantity: 1
            },
            {
                word: "text",
                quantity: 1
            },
            {
                word: "for",
                quantity: 1
            },
            {
                word: "testing",
                quantity: 1
            },
            {
                word: "and",
                quantity: 1
            },
            {
                word: "cool",
                quantity: 1
            },
        ]

        const dico = generateDictionaryOfWords(text)

        expect(JSON.stringify(dico)).toBe(JSON.stringify(expectedDico))

    })

})