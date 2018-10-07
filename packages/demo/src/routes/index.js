import LandingView from './LandingView/LandingView';
import { demoRoutes } from './DemoPage/routes';

const routes = [
  {
    path: '/',
    exact: true,
    component: LandingView
  },
  ...demoRoutes
];

export default routes;
