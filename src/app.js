const CliParser = require('./interfaces/cli-parser');
const Logger = require('./utils/logger');
const { parseTextCommand, parseFileCommand } = require('./commands/parser');

const app = async () => {
  const cliParser = new CliParser();
  cliParser.setArgv(process.argv);

  /**
   * Parse a text
   */
  await cliParser.action(
    [
      { name: '--text', withValue: true },
      { name: '--output', withValue: true, optional: true },
    ],
    parseTextCommand,
  );

  /**
   * Parse a file
   */
  await cliParser.action(
    [
      { name: '--file', withValue: true },
      { name: '--output', withValue: true, optional: true },
    ],
    parseFileCommand,
  );

  /**
   * Default redirection
   */
  cliParser.defaultAction(function () {
    Logger.error('A text is necessary to start the parsing with --text flag');
  });
};

module.exports = app;
