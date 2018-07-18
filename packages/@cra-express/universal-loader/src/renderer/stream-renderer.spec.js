import React from 'react';

const mockStream = {
  pipe: jest.fn(),
  on: jest.fn((type, cb) => cb())
};
const mockRenderToNodeStream = () => mockStream;

jest.setMock('react-dom/server', {
  renderToNodeStream: mockRenderToNodeStream
});

const streamRenderer = require('./stream-renderer').default;

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
    send: jest.fn(),
    end: jest.fn()
  };

  streamRenderer(req, res, element, htmlData, {});
  expect(res.write).toHaveBeenCalledTimes(2);
});

test('should render with onEndReplace option', () => {
  const htmlData = `
  <html>
    <body>
      <div id="root"></div>{{ssr}}
    </body>
  </html>
`;

  const element = <div>Hello</div>;

  const req = {};
  const res = {
    write: jest.fn(),
    send: jest.fn(),
    end: jest.fn()
  };

  streamRenderer(req, res, element, htmlData, {
    onEndReplace: data => data.replace('{{ssr}}', '<div>ssr</div>')
  });
  expect(res.write).toHaveBeenCalledTimes(2);
  expect(res.write).toHaveBeenLastCalledWith(`</div><div>ssr</div>
    </body>
  </html>
`);
});
