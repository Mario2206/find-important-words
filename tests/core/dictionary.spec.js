const { generateDictionaryOfWords } = require('../../src/core/dictionary');
describe('Dictionary', () => {
  describe('Dictionary generator', () => {
    it('should generate a dictionary of words with their quantities', () => {
      const text = 'It is a text for testing and it is cool';

      const expectedDico = [
        {
          word: 'it',
          quantity: 2,
        },
        {
          word: 'is',
          quantity: 2,
        },
        {
          word: 'a',
          quantity: 1,
        },
        {
          word: 'text',
          quantity: 1,
        },
        {
          word: 'for',
          quantity: 1,
        },
        {
          word: 'testing',
          quantity: 1,
        },
        {
          word: 'and',
          quantity: 1,
        },
        {
          word: 'cool',
          quantity: 1,
        },
      ];

      const dico = generateDictionaryOfWords(text);

      expect(JSON.stringify(dico)).toBe(JSON.stringify(expectedDico));
    });

    it('should generate a dictionary of words without take care of breaking lines', () => {
      const text = 'It \n\n is a text for testing and it is cool';

      const expectedDico = [
        {
          word: 'it',
          quantity: 2,
        },
        {
          word: 'is',
          quantity: 2,
        },
        {
          word: 'a',
          quantity: 1,
        },
        {
          word: 'text',
          quantity: 1,
        },
        {
          word: 'for',
          quantity: 1,
        },
        {
          word: 'testing',
          quantity: 1,
        },
        {
          word: 'and',
          quantity: 1,
        },
        {
          word: 'cool',
          quantity: 1,
        },
      ];

      const dico = generateDictionaryOfWords(text);

      expect(JSON.stringify(dico)).toBe(JSON.stringify(expectedDico));
    });

    it('should generate a dictionary of words without special characters', () => {
      const text = 'It / "is" a text for testing and it is cool';

      const expectedDico = [
        {
          word: 'it',
          quantity: 2,
        },
        {
          word: 'is',
          quantity: 2,
        },
        {
          word: 'a',
          quantity: 1,
        },
        {
          word: 'text',
          quantity: 1,
        },
        {
          word: 'for',
          quantity: 1,
        },
        {
          word: 'testing',
          quantity: 1,
        },
        {
          word: 'and',
          quantity: 1,
        },
        {
          word: 'cool',
          quantity: 1,
        },
      ];

      const dico = generateDictionaryOfWords(text);

      expect(JSON.stringify(dico)).toBe(JSON.stringify(expectedDico));
    });

    it('should complete an existing dictionary if one is provided', () => {
      const text = 'It is a text for testing and it is cool';

      const existingDico = [{ word: 'it', quantity: 1 }];

      const expectedDico = [
        {
          word: 'it',
          quantity: 3,
        },
        {
          word: 'is',
          quantity: 2,
        },
        {
          word: 'a',
          quantity: 1,
        },
        {
          word: 'text',
          quantity: 1,
        },
        {
          word: 'for',
          quantity: 1,
        },
        {
          word: 'testing',
          quantity: 1,
        },
        {
          word: 'and',
          quantity: 1,
        },
        {
          word: 'cool',
          quantity: 1,
        },
      ];

      const dico = generateDictionaryOfWords(text, existingDico);

      expect(JSON.stringify(dico)).toBe(JSON.stringify(expectedDico));
    });
  });
});
