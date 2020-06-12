const achat = require('./achat');
const { test } = require('jest');

test('adds 1 + 2 to equal 3', () => {
    expect(achat(1, 2)).toBe(3);
});