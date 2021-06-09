const CliParser = require("./interfaces/cli-parser")
const generateDictionaryOfWords = require("./utils/dictionary")
const Logger =  require("./utils/logger")

const app = () => {

    const cliParser = new CliParser()
    cliParser.setArgv(process.argv)

    cliParser.action([{name: '--text', withValue: true}], function ({text}) {
        const dictionary = generateDictionaryOfWords(text)
        Logger.log(dictionary)
    })

    cliParser.defaultAction(function () {
        Logger.error("A text is necessary to start the parsing with --text flag")
    })

}

module.exports = app