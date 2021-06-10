/**
 * 
 * @param {{word: string, quantity: number}[]} dictionary 
 */
function displayDictionary(dictionary) {
    return dictionary.reduce(
        (output, item) => (typeof output === "string" ? output : `${output.word} : ${output.quantity}\n`) + `${item.word} : ${item.quantity}\n`
    )
}

module.exports = {
    displayDictionary
}