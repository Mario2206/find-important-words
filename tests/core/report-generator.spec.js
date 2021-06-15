const ReportGenerator = require('../../src/core/report-generator');
const fs = require('fs');
const path = require('path');
describe('Report generator', () => {
  const text = 'That is a text for testing';
  const output = './tests/tools/generate-file.txt';

  beforeEach((done) => {
    const outputPath = path.resolve(output);
    fs.access(outputPath, (err) => {
      if (!err) {
        fs.unlink(outputPath, done);
      }
      done();
    });
  });

  it('should generate a txt file', async () => {
    const reportGenerator = new ReportGenerator(text);

    await reportGenerator.toTextFile(output);

    const createdFile = fs.readFileSync(path.resolve(output));

    expect(createdFile).not.toBeNull();
    expect(createdFile.toString()).toBe(text);
  });
});
