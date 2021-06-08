function generateDictionaryOfWords(text) {
    const words = text.split(' ').filter(word => word).map(word => word.toLowerCase())
    const dico = []
    words.forEach((word) => {
        const rowIndex = dico.findIndex(row => row.word === word) 
        rowIndex !== -1 ? dico[rowIndex].quantity++ : dico.push({word, quantity: 1})
    })
    return dico.sort((leftWord, rightWord) => rightWord.quantity - leftWord.quantity )

}

module.exports = generateDictionaryOfWords