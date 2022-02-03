// cool.integration.test.js
/* eslint-env jest */
describe('Slow Integration test', () => {
  test('should pass when run', () => {
    expect(1).toBe(1); // Change the later 1 to 2 to ensure test is running (by failing)
  });
});