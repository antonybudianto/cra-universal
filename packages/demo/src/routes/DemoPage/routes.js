import HomeView from './HomeView';
import withDemoLayout from './withDemoLayout';

import AboutView from './AboutView';

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
