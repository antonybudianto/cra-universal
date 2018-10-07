import React from 'react';
import loadable from 'loadable-components';
import HomeView from './HomeView';
import withDemoLayout from './withDemoLayout';

const AboutView = loadable(() => import('./AboutView'), {
  modules: ['./AboutView'],
  LoadingComponent: props => <div>Loading...</div>
});

export const demoRoutes = [
  {
    path: '/demo',
    exact: true,
    component: withDemoLayout(HomeView)
  },
  {
    path: '/demo/about',
    component: AboutView
  }
];
