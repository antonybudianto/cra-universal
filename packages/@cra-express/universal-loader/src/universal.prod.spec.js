import React from 'react';

import universalMiddleware from './universal';

process.env.NODE_ENV = 'production';

jest.mock('fs');
const fs = require('fs');
const path = require('path');

test('have correct env', () => {
  expect(process.env.NODE_ENV).toBe('production');
});

test('created correctly', () => {
  const config = {
    handleRender: jest.fn(),
    clientBuildPath: 'test',
    universalRender: () => <div>a</div>
  };
  const middleware = universalMiddleware(config);
  expect(middleware).toBeDefined();
});

test('read index.html file correctly', () => {
  const config = {
    handleRender: jest.fn(),
    clientBuildPath: 'test',
    universalRender: () => <div>a</div>
  };
  const middleware = universalMiddleware(config);
  middleware();
  expect(fs.readFile).toHaveBeenCalledTimes(1);
});

test('read multiple html files correctly', () => {
  // Define dummie request
  const dummieReqRoot = { url: '/' };
  const dummieReqApp  = { url: '/app' };
  const dummieReqBlog = { url: '/blog' };
  const config = {
    handleRender: jest.fn(),
    resolveHtmlFilenameByRequest: (req) => {
      // Example of return by url but can be by device and other things
      if(req.url.startsWith('/app')) {
        return 'app.html'
      } else if(req.url.startsWith('/blog')) {
        return 'blog.html'
      }

      return 'index.html'
    },
    clientBuildPath: 'test',
    universalRender: () => <div>a</div>
  };
  const currentPath = path.join(__dirname, '..', config.clientBuildPath);

  const middleware = universalMiddleware(config);

  middleware(dummieReqRoot);

  expect(fs.readFile)
  .toHaveBeenCalledWith(
    path.join(currentPath, 'index.html'),
    expect.any(String), expect.any(Function)
  );

  middleware(dummieReqApp);

  expect(fs.readFile)
  .toHaveBeenCalledWith(
    path.join(currentPath, 'app.html'),
    expect.any(String), expect.any(Function)
  );

  middleware(dummieReqBlog);

  expect(fs.readFile)
  .toHaveBeenCalledWith(
    path.join(currentPath, 'blog.html'),
    expect.any(String), expect.any(Function)
  );
});

test('handle read error correctly', () => {
  const config = {
    handleRender: jest.fn(),
    clientBuildPath: 'test',
    universalRender: () => <div>a</div>
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
    handleRender: jest.fn(),
    universalRender: () => <div>a</div>
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
  expect(config.handleRender).toHaveBeenCalledTimes(1);

  spy.mockReset();
  spy.mockRestore();
});

test('send response successfully with onEndReplace callback', () => {
  const config = {
    clientBuildPath: 'test',
    handleRender: (req, res, reactEl, htmlData, options) => {
      options.onEndReplace('replace');
    },
    onEndReplace: jest.fn(html => html),
    universalRender: () => <div>a</div>
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
  expect(config.onEndReplace).toHaveBeenCalledWith('replace');

  spy.mockReset();
  spy.mockRestore();
});

test('send response successfully and close tag correctly', () => {
  const config = {
    clientBuildPath: 'test',
    handleRender: jest.fn(),
    universalRender: () => <div>a</div>
  };
  const middleware = universalMiddleware(config);
  jest.spyOn(fs, 'readFile').mockImplementation((filepath, enc, callback) => {
    const htmlData =
      '<html><div id="root"></div><div id="test">should be included</div></html>';
    callback(null, htmlData);
  });
  const spy = jest.spyOn(console, 'error');
  const mockResponse = {
    write: jest.fn(),
    end: jest.fn()
  };
  middleware({}, mockResponse);
  expect(console.error).toHaveBeenCalledTimes(0);
  expect(config.handleRender).toHaveBeenCalledTimes(1);
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
        expect(mockResponse.write.mock.calls[0]).toEqual([
          '<html><div id="root">'
        ]);
        expect(mockResponse.write.mock.calls[1]).toEqual(['</div></html>']);
      }
    }),
    pipe: jest.fn()
  };
  const config = {
    clientBuildPath: 'test',
    handleRender: jest.fn(),
    universalRender: () => Promise.resolve(<div>a</div>)
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
    handleRender: jest.fn(),
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
    handleRender: jest.fn(),
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
