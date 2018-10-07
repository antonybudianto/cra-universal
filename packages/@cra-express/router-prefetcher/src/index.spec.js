import { getInitialData } from './index';

jest.mock('react-router-dom');

const rrd = require('react-router-dom');

describe('getInitialData', () => {
  it('should handle not match path', done => {
    rrd.matchPath.mockReturnValue(false);
    getInitialData({}, {}, [{}]).then(res => {
      expect(res[0]).toBeNull();
      done();
    });
  });

  it('should handle matched path', done => {
    rrd.matchPath.mockReturnValue(true);
    getInitialData({}, {}, [
      {
        component: {
          getInitialData() {
            return Promise.resolve(1);
          }
        }
      }
    ]).then(res => {
      expect(res[0]).toBe(1);
      done();
    });
  });

  it('should handle matched path with no getInitialData', done => {
    rrd.matchPath.mockReturnValue(true);
    getInitialData({}, {}, [
      {
        component: {}
      }
    ]).then(res => {
      expect(res[0]).toBeNull();
      done();
    });
  });
});
