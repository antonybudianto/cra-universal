import { matchRoutes } from 'react-router-config'

export function getInitialData(ctx, store, routes) {
  const promises = matchRoutes(routes, ctx.req.path)
    .map(({ route, match }) => {
      return {
        component: route.component,
        match
      }
    })
    .filter(result => result.component.loadData)
    .map(result => result.component.loadData({
      ctx,
      store,
      match: result.match
    }))
  return Promise.all(promises)
}
