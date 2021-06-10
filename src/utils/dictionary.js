const { SPECIAL_CHARS_REGEXP, BREAK_LINE_REGEXP } = require("../constants/regex")

function generateDictionaryOfWords(text, existingDico = []) {
    const words = text.replaceAll(BREAK_LINE_REGEXP, "")
        .replaceAll(SPECIAL_CHARS_REGEXP, " ")
        .split(' ')
        .filter(word => word)
        .map(word => word.toLowerCase())

    const dico = existingDico
    words.forEach((word) => {
        const rowIndex = dico.findIndex(row => row.word === word) 
        rowIndex !== -1 ? dico[rowIndex].quantity++ : dico.push({word, quantity: 1})
    })
    return dico.sort((leftWord, rightWord) => rightWord.quantity - leftWord.quantity )

}

module.exports = {
    generateDictionaryOfWords
}