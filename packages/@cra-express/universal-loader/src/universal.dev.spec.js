import React from 'react';

import universalMiddleware from './universal';

process.env.NODE_ENV = 'development';

jest.mock('http');
const http = require('http');

test('have correct env', () => {
  expect(process.env.NODE_ENV).toBe('development');
});

test('created correctly', () => {
  const config = {
    clientBuildPath: 'test',
    universalRender: () => {},
  };
  const middleware = universalMiddleware(config);
  expect(middleware).toBeDefined();
});

test('should request html data from CRA with no error', () => {
  const config = {
    clientBuildPath: 'test',
    universalRender: () => {},
  };
  const middleware = universalMiddleware(config);
  const mockResult = {
    setEncoding: jest.fn(),
    on: jest.fn(),
  };
  const spy = jest.spyOn(http, 'get').mockImplementation((url, callback) => {
    callback(mockResult);
    return {
      on: jest.fn(),
    };
  });
  const spyLog = jest.spyOn(console, 'error');
  middleware();
  expect(http.get).toHaveBeenCalled();
  expect(mockResult.setEncoding).toHaveBeenCalled();
  expect(mockResult.on).toHaveBeenCalledTimes(2);
  expect(console.error).toHaveBeenCalledTimes(0);

  spyLog.mockReset();
  spy.mockReset();
});

test('should handle http get error', () => {
  const config = {
    clientBuildPath: 'test',
    universalRender: () => {},
  };
  const middleware = universalMiddleware(config);
  const mockResult = {
    setEncoding: jest.fn(),
    on: jest.fn(),
  };
  const spy = jest.spyOn(http, 'get').mockImplementation((url, callback) => {
    callback(mockResult);
    return {
      on: jest.fn((event, callback) =>
        callback({
          message: 'Error test',
        })
      ),
    };
  });
  const spyLog = jest.spyOn(console, 'error');
  const mockStatus = {
    end: jest.fn(),
  };
  const mockResponse = {
    write: jest.fn(),
    status: jest.fn(() => mockStatus),
  };
  middleware({}, mockResponse);
  expect(http.get).toHaveBeenCalled();
  expect(console.error).toHaveBeenCalled();
  expect(mockResponse.status).toHaveBeenCalledWith(404);
  expect(mockStatus.end).toHaveBeenCalled();

  spyLog.mockReset();
  spy.mockReset();
});

test('send response successfully', () => {
  const config = {
    clientBuildPath: 'test',
    handleRender: jest.fn(),
    universalRender: () => <div>a</div>,
  };
  const middleware = universalMiddleware(config);
  const mockResult = {
    setEncoding: jest.fn(),
    on: jest.fn((event, cb) => {
      const arg = [];
      if (event === 'data') {
        arg.push('<html><div id="root"></div></html>');
      }
      cb(...arg);
    }),
  };
  const spy = jest.spyOn(http, 'get').mockImplementation((url, callback) => {
    callback(mockResult);
    return {
      on: jest.fn(),
    };
  });
  const mockResponse = {
    write: jest.fn(),
    end: jest.fn(),
  };
  middleware({}, mockResponse);
  expect(console.error).toHaveBeenCalledTimes(0);
  expect(config.handleRender).toHaveBeenCalledTimes(1);

  spy.mockReset();
});

test('send response successfully - with default renderer', () => {
  const config = {
    clientBuildPath: 'test',
    universalRender: () => <div>a</div>,
  };
  const middleware = universalMiddleware(config);
  const mockResult = {
    setEncoding: jest.fn(),
    on: jest.fn((event, cb) => {
      const arg = [];
      if (event === 'data') {
        arg.push('<html><div id="root"></div></html>');
      }
      cb(...arg);
    }),
  };
  const spy = jest.spyOn(http, 'get').mockImplementation((url, callback) => {
    callback(mockResult);
    return {
      on: jest.fn(),
    };
  });
  const mockResponse = {
    write: jest.fn(),
    end: jest.fn(),
    send: jest.fn(),
    // setHeader: jest.fn(),
  };
  middleware({}, mockResponse);
  expect(console.error).toHaveBeenCalledTimes(0);
  // expect(mockResponse.write).toHaveBeenCalledTimes(1);
  // expect(mockResponse.end).toHaveBeenCalledTimes(1);

  spy.mockReset();
});
