const app = require('../src/app');
const Logger = require('../src/utils/logger');
const fs = require('fs');
const path = require('path');
jest.mock('../src/utils/logger');

describe('App', () => {
  describe('with --text flag for parsing text', () => {
    it('should start if the text argument is provided', async () => {
      process.argv = ['node', 'src/index', '--text', 'a text example'];
      const expectedResult = 'a : 1\ntext : 1\nexample : 1\n';
      await app();
      expect(Logger.log).toHaveBeenCalled();
      expect(Logger.log).toHaveBeenCalledWith(expectedResult);
      expect(Logger.error).not.toHaveBeenCalled();
    });

    it('should display an error message if the text argument value is missing', async () => {
      process.argv = ['node', 'src/index', '--text'];
      await app();
      expect(Logger.error).toHaveBeenCalled();
      expect(Logger.log).not.toHaveBeenCalled();
    });

    describe('With output', () => {
      const output = './tests/tools/generate-file2.txt';

      beforeEach((done) => {
        const outputPath = path.resolve(output);
        fs.access(outputPath, (err) => {
          if (!err) {
            fs.unlink(outputPath, done);
          }
          done();
        });
      });

      it('should create report file if the output argument is provided', async () => {
        const text = 'An example of text';
        const expectedReport = 'an : 1\nexample : 1\nof : 1\ntext : 1\n';
        process.argv = [
          'node',
          'src/index',
          '--text',
          text,
          '--output',
          output,
        ];
        await app();

        const createdFile = fs.readFileSync(path.resolve(output));

        expect(createdFile).not.toBeNull();
        expect(createdFile.toString()).toBe(expectedReport);
      });
    });
  });

  describe('with --file flag for parsing a file', () => {
    it('should start if the file argument is provided', async () => {
      process.argv = ['node', 'src/index', '--file', './tests/tools/text.txt'];
      await app();
      expect(Logger.error).not.toHaveBeenCalled();
      expect(Logger.log).toHaveBeenCalled();
    });

    it('should display an error if the file argument is missing', async () => {
      process.argv = ['node', 'src/index', '--file'];
      await app();
      expect(Logger.error).toHaveBeenCalled();
      expect(Logger.log).not.toHaveBeenCalled();
    });

    it('should parse a web file if the argument value is an url', async () => {
      process.argv = [
        'node',
        'src/index',
        '--file',
        'https://www.wikipedia.org/',
      ];
      await app();

      expect(Logger.error).not.toHaveBeenCalled();
      expect(Logger.log).toHaveBeenCalled();
    });

    describe('With output', () => {
      const output = './tests/tools/generate-file2.txt';

      beforeEach((done) => {
        const outputPath = path.resolve(output);
        fs.access(outputPath, (err) => {
          if (!err) {
            fs.unlink(outputPath, done);
          }
          done();
        });
      });
      it('should create report file if the output argument is provided', async () => {
        const url = 'https://www.wikipedia.org/';

        process.argv = ['node', 'src/index', '--file', url, '--output', output];
        await app();

        const createdFile = fs.readFileSync(path.resolve(output));

        expect(createdFile).not.toBeNull();
      });
    });
  });
});
