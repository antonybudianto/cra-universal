import universalMiddleware from './universal';

process.env.NODE_ENV = 'production';

jest.mock('fs');
const fs = require('fs');

test('have correct env', () => {
  expect(process.env.NODE_ENV).toBe('production');
});

test('created correctly', () => {
  const config = {
    clientBuildPath: 'test',
    universalRender: () => {}
  };
  const middleware = universalMiddleware(config);
  expect(middleware).toBeDefined();
});

test('read index.html file correctly', () => {
  const config = {
    clientBuildPath: 'test',
    universalRender: () => {}
  };
  const middleware = universalMiddleware(config);
  middleware();
  expect(fs.readFile).toHaveBeenCalledTimes(1);
});

test('handle read error correctly', () => {
  const config = {
    clientBuildPath: 'test',
    universalRender: () => {}
  };
  const middleware = universalMiddleware(config);
  jest.spyOn(fs, 'readFile').mockImplementation((filepath, enc, callback) => {
    const err = { message: 'mock readFile error' };
    const htmlData = null;
    callback(err, htmlData);
  });
  const spy = jest.spyOn(console, 'error');
  const mockStatus = {
    end: jest.fn()
  };
  const mockResponse = {
    status: jest.fn(() => mockStatus)
  };
  middleware({}, mockResponse);
  expect(mockResponse.status).toHaveBeenCalledWith(404);
  expect(console.error).toHaveBeenCalledTimes(1);

  spy.mockReset();
  spy.mockRestore();
});

test('send response successfully', () => {
  const config = {
    clientBuildPath: 'test',
    universalRender: () => ({
      on: jest.fn((type, callback) => {
        if (type === 'end') {
          callback();
        }
      }),
      pipe: jest.fn()
    })
  };
  const middleware = universalMiddleware(config);
  jest.spyOn(fs, 'readFile').mockImplementation((filepath, enc, callback) => {
    const htmlData = '<html><div id="root"></div></html>';
    callback(null, htmlData);
  });
  const spy = jest.spyOn(console, 'error');
  const mockResponse = {
    write: jest.fn(),
    end: jest.fn()
  };
  middleware({}, mockResponse);
  expect(console.error).toHaveBeenCalledTimes(0);
  expect(mockResponse.end).toHaveBeenCalledTimes(1);
  expect(mockResponse.write).toHaveBeenCalledTimes(2);
  expect(mockResponse.write.mock.calls[0]).toEqual(["<html><div id=\"root\">"]);
  expect(mockResponse.write.mock.calls[1]).toEqual(["</div></html>"]);

  spy.mockReset();
  spy.mockRestore();
});

test('send response successfully with onEndReplace callback', () => {
  const config = {
    clientBuildPath: 'test',
    onEndReplace: jest.fn(html => html),
    universalRender: () => ({
      on: jest.fn((type, callback) => {
        if (type === 'end') {
          callback();
        }
      }),
      pipe: jest.fn()
    })
  };
  const middleware = universalMiddleware(config);
  jest.spyOn(fs, 'readFile').mockImplementation((filepath, enc, callback) => {
    const htmlData = '<html><div id="root"></div></html>';
    callback(null, htmlData);
  });
  const spy = jest.spyOn(console, 'error');
  const mockResponse = {
    write: jest.fn(),
    end: jest.fn()
  };
  middleware({}, mockResponse);
  expect(console.error).toHaveBeenCalledTimes(0);
  expect(mockResponse.end).toHaveBeenCalledTimes(1);
  expect(mockResponse.write).toHaveBeenCalledTimes(2);
  expect(mockResponse.write.mock.calls[0]).toEqual(["<html><div id=\"root\">"]);
  expect(mockResponse.write.mock.calls[1]).toEqual(["</div></html>"]);
  expect(config.onEndReplace).toHaveBeenCalledWith("</div></html>");

  spy.mockReset();
  spy.mockRestore();
});

test('send response successfully and close tag correctly', () => {
  const config = {
    clientBuildPath: 'test',
    universalRender: () => ({
      on: jest.fn((type, callback) => {
        if (type === 'end') {
          callback();
        }
      }),
      pipe: jest.fn()
    })
  };
  const middleware = universalMiddleware(config);
  jest.spyOn(fs, 'readFile').mockImplementation((filepath, enc, callback) => {
    const htmlData = '<html><div id="root"></div><div id="test">should be included</div></html>';
    callback(null, htmlData);
  });
  const spy = jest.spyOn(console, 'error');
  const mockResponse = {
    write: jest.fn(),
    end: jest.fn()
  };
  middleware({}, mockResponse);
  expect(console.error).toHaveBeenCalledTimes(0);
  expect(mockResponse.end).toHaveBeenCalledTimes(1);
  expect(mockResponse.write).toHaveBeenCalledTimes(2);
  expect(mockResponse.write.mock.calls[0]).toEqual(["<html><div id=\"root\">"]);
  expect(mockResponse.write.mock.calls[1]).toEqual(["</div><div id=\"test\">should be included</div></html>"]);

  spy.mockReset();
  spy.mockRestore();
});

test('support async universal render callback', () => {
  const mockResponse = {
    write: jest.fn(),
    end: jest.fn()
  };
  const mockStream = {
    on: jest.fn((type, callback) => {
      if (type == 'end') {
        callback();
        expect(mockResponse.write).toHaveBeenCalledTimes(2);
        expect(mockResponse.end).toHaveBeenCalledTimes(1);
        expect(mockResponse.write.mock.calls[0]).toEqual(["<html><div id=\"root\">"]);
        expect(mockResponse.write.mock.calls[1]).toEqual(["</div></html>"]);
      }
    }),
    pipe: jest.fn()
  };
  const config = {
    clientBuildPath: 'test',
    universalRender: () => Promise.resolve(mockStream)
  };
  const middleware = universalMiddleware(config);
  jest.spyOn(fs, 'readFile').mockImplementation((filepath, enc, callback) => {
    const htmlData = '<html><div id="root"></div></html>';
    callback(null, htmlData);
  });
  const spy = jest.spyOn(console, 'error');
  middleware({}, mockResponse);
  expect(console.error).toHaveBeenCalledTimes(0);

  spy.mockReset();
  spy.mockRestore();
});

test('handle undefined and not sending response', () => {
  const config = {
    clientBuildPath: 'test',
    universalRender: () => undefined
  };
  const middleware = universalMiddleware(config);
  jest.spyOn(fs, 'readFile').mockImplementation((filepath, enc, callback) => {
    const htmlData = '<html><div id="root"></div></html>';
    callback(null, htmlData);
  });
  const spy = jest.spyOn(console, 'error');
  const mockResponse = {
    write: jest.fn(),
    end: jest.fn()
  };
  middleware({}, mockResponse);
  expect(mockResponse.write).not.toHaveBeenCalled();
  expect(mockResponse.end).not.toHaveBeenCalled();
  expect(console.error).toHaveBeenCalledTimes(0);

  spy.mockReset();
  spy.mockRestore();
});

test('handle undefined and not sending response for async', () => {
  const config = {
    clientBuildPath: 'test',
    universalRender: () => Promise.resolve(undefined)
  };
  const middleware = universalMiddleware(config);
  jest.spyOn(fs, 'readFile').mockImplementation((filepath, enc, callback) => {
    const htmlData = '<html><div id="root"></div></html>';
    callback(null, htmlData);
  });
  const spy = jest.spyOn(console, 'error');
  const mockResponse = {
    write: jest.fn(),
    end: jest.fn()
  };
  middleware({}, mockResponse);
  expect(mockResponse.write).not.toHaveBeenCalled();
  expect(mockResponse.end).not.toHaveBeenCalled();
  expect(console.error).toHaveBeenCalledTimes(0);

  spy.mockReset();
  spy.mockRestore();
});
