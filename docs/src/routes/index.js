import React from 'react'
import loadable from 'loadable-components'

import HomeView from "./HomeView";

const LoadableFeatView = loadable(() => import('./FeatureView'), {
  modules: ['./FeatureView'],
  LoadingComponent: props => <div>Loading...</div>
});

const routes = [
  {
    path: '/',
    exact: true,
    component: HomeView
  },
  {
    path: '/feature',
    component: LoadableFeatView
  }
]

export default routes
