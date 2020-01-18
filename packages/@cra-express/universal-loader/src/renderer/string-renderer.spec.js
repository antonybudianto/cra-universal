import React from 'react';
import stringRenderer from './string-renderer';

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
    send: jest.fn()
  };

  stringRenderer(req, res, element, htmlData, {});
  expect(res.send).toHaveBeenCalledWith(`
  <html>
    <body>
      <div id=\"root\"><div data-reactroot=\"\">Hello</div></div>
    </body>
  </html>
  `);
});

test('should render correctly with onFinish', () => {
  const htmlData = `
  <html>
    <body>
      <div id="root"></div>
      <div id="script"></div>
    </body>
  </html>
  `;

  const el = <div>Hello</div>;

  const req = {};
  const res = {
    send: jest.fn()
  };

  stringRenderer(req, res, el, htmlData, {
    onFinish: (req1, res1, data) => {
      const finalHtml = data.replace(
        '<div id="script"></div>',
        '<script>window.hello=1</script>'
      );
      res1.send(finalHtml);
    }
  });
  expect(res.send).toHaveBeenCalledWith(`
  <html>
    <body>
      <div id=\"root\"><div data-reactroot=\"\">Hello</div></div>
      <script>window.hello=1</script>
    </body>
  </html>
  `);
});

test('should render correctly with onEndReplace', () => {
  const htmlData = `
  <html>
    <body>
      <div id="root"></div>
      <div id="script"></div>
    </body>
  </html>
  `;

  const el = <div>Hello</div>;

  const req = {};
  const res = {
    send: jest.fn()
  };

  stringRenderer(req, res, el, htmlData, {
    onEndReplace: data => {
      return data.replace(
        '<div id="script"></div>',
        '<script>window.hello=1</script>'
      );
    }
  });
  expect(res.send).toHaveBeenCalledWith(`
  <html>
    <body>
      <div id=\"root\"><div data-reactroot=\"\">Hello</div></div>
      <script>window.hello=1</script>
    </body>
  </html>
  `);
});

test('should return 500 when the render is failed', () => {
  const htmlData = `
  <html>
    <body>
      <div id="root"></div>
      <div id="script"></div>
    </body>
  </html>
  `;

  const el = <div>{(new Error('Error thrown'))}</div>;

  const req = {};
  const res = {
    send: jest.fn()
  };

  stringRenderer(req, res, el, htmlData, {});

  expect(res.send).toHaveBeenCalledWith(500);
});


test('should render the client app when the render is failed and the renderClientOnError flag is set', () => {
  const htmlData = `
  <html>
    <body>
      <div id="root"></div>
      <div id="script"></div>
    </body>
  </html>
  `;

  const el = <div>{(new Error('Error thrown'))}</div>;

  const req = {};
  const res = {
    send: jest.fn()
  };

  stringRenderer(req, res, el, htmlData, { renderClientOnError: true });

  expect(res.send).toHaveBeenCalledWith(htmlData);
});
