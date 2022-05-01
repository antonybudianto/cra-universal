import React from 'react';

const pipeStreamRenderer = require('./pipe-stream-renderer').default;

test('should render without options correctly', () => {
  const htmlData = `
  <html>
    <body>
      <div id="root"></div>
    </body>
  </html>
  `;

  const element = <div>Hello</div>;

  const req = {};
  const res = {
    write: jest.fn(),
    /**
     * TODO: need to revisit how to test real stream
     */
    // setHeader: () => {},
  };

  pipeStreamRenderer(req, res, element, htmlData, {});
  expect(res.write).toHaveBeenCalledTimes(0);
});
