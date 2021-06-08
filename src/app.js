const generateDictionaryOfWords = require("./utils/dictionary")
const Logger =  require("./utils/logger")

const app = () => {
    
    const paramIndex =  process.argv.findIndex(arg => arg === '--text')
    const text = process.argv[paramIndex + 1]

    if(paramIndex === -1 || !text) {
        Logger.error("A text is necessary to start the parsing with --text flag")
    }

    const dictionary = generateDictionaryOfWords(text)
    
    Logger.log(dictionary)

}

module.exports = app