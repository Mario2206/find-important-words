const fs = require('fs');
const path = require('path');

class ReportGenerator {
  _text;

  /**
   *
   * @param {string} text
   */
  constructor(text) {
    this._text = text;
  }

  /**
   *
   * @param {string} output
   */
  toTextFile(output) {
    return new Promise((resolve, reject) => {
      const outputPath = path.resolve(output);

      fs.writeFile(outputPath, '', (err) => {
        if (err) {
          reject(err);
        }

        const writeStream = fs.createWriteStream(outputPath);

        writeStream.write(this._text);

        writeStream.on('finish', resolve);

        writeStream.on('error', reject);

        writeStream.end();
      });
    });
  }
}

module.exports = ReportGenerator;
