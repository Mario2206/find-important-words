const CliParser = require("./interfaces/cli-parser")
const {generateDictionaryOfWords} = require("./utils/dictionary")
const { displayDictionary } = require("./utils/display")
const Logger =  require("./utils/logger")
const FileReader = require('./utils/filereader')
const { isValidHttpUrl } = require("./utils/url")
const ExternalFileReader = require("./utils/external-filereader")


const app = async () => {

    const cliParser = new CliParser()
    cliParser.setArgv(process.argv)

    /**
     * Parse a text
     */
    cliParser.action([{name: '--text', withValue: true}], function ({text}) {
        const dictionary = generateDictionaryOfWords(text)
        Logger.log(displayDictionary(dictionary))
    })

    /**
     * Parse a file
     */
    await cliParser.action([{name: '--file', withValue: true}], async function({file}) {
        let dictionary = []

        if(isValidHttpUrl(file)) {

            await new ExternalFileReader()
            .setUri(file)
            .startStream((chunk) => {
                dictionary = generateDictionaryOfWords(chunk, dictionary)
            })

        } else {


            const fileReader = new FileReader()
            
            fileReader.setPath(file)
            await fileReader.startStream((chunk) => {
                    dictionary = generateDictionaryOfWords(chunk, dictionary)
            })

        }

        
        Logger.log( displayDictionary( dictionary ))
        
    })

    /**
     * Default redirection
     */
    cliParser.defaultAction(function () {
        Logger.error("A text is necessary to start the parsing with --text flag")
    })

}

module.exports = app