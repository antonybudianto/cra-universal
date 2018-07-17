import React from 'react';
import loadable from 'loadable-components';
import HomeView from './HomeView';

const LoadableFeatView = loadable(() => import('./FeatureView'), {
  modules: ['./FeatureView'],
  LoadingComponent: props => <div>Loading...</div>
});

export const demoRoutes = [
  {
    path: '/demo',
    exact: true,
    component: HomeView
  },
  {
    path: '/demo/feature',
    component: LoadableFeatView
  }
];
