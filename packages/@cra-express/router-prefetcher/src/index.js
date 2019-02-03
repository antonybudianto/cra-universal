import { matchPath } from 'react-router-dom';

export function getInitialData(req, res, routes) {
  const matches = routes.map((route, index) => {
    const { path, exact, strict } = route;
    const match = matchPath(req.url, { path, exact, strict });
    if (match) {
      const obj = {
        route,
        match,
        promise: route.component.getInitialData
          ? route.component.getInitialData({
              match,
              req,
              res
            })
          : Promise.resolve(null)
      };
      return obj;
    }
    return null;
  });

  const promises = matches.map(match => (match ? match.promise : null));
  return Promise.all(promises);
}
