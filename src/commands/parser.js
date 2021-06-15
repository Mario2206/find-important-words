const Logger = require('../utils/logger');
const { generateDictionaryOfWords } = require('../core/dictionary');
const { displayDictionary } = require('../utils/display');
const FileReader = require('../core/filereader');
const ExternalFileReader = require('../core/external-filereader');
const { isValidHttpUrl } = require('../utils/url');
const ReportGenerator = require('../core/report-generator');
const path = require('path');
/**
 *
 * @param {{text: string, output?: string}} param0
 */
async function parseTextCommand({ text, output }) {
  const dictionary = generateDictionaryOfWords(text);

  if (output) {
    await new ReportGenerator(displayDictionary(dictionary)).toTextFile(output);
    Logger.log('Report generated in' + path.resolve(output));
    return;
  }

  Logger.log(displayDictionary(dictionary));
}

/**
 *
 * @param {{file: string}} param0
 */
async function parseFileCommand({ file, output }) {
  let dictionary = [];

  if (isValidHttpUrl(file)) {
    await new ExternalFileReader().setUri(file).startStream((chunk) => {
      dictionary = generateDictionaryOfWords(chunk, dictionary);
    });
  } else {
    const fileReader = new FileReader();

    fileReader.setPath(file);
    await fileReader.startStream((chunk) => {
      dictionary = generateDictionaryOfWords(chunk, dictionary);
    });
  }

  if (output) {
    await new ReportGenerator(displayDictionary(dictionary)).toTextFile(output);
    Logger.log('Report generated in' + path.resolve(output));
    return;
  }

  Logger.log(displayDictionary(dictionary));
}

module.exports = {
  parseTextCommand,
  parseFileCommand,
};
