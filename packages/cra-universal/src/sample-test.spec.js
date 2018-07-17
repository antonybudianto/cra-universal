var getCounter = require('./sample-module');

describe('Sample Test', () => {
  test('getCounter test', () => {
    const count = getCounter()
    expect(count).toMatchSnapshot()
  })
})
